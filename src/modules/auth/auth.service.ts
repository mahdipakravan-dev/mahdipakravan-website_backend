import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { User, UsersService } from './../user';
import { VerifyPayload } from './verify.payload';
import { VerificationService } from '../user/verification.service';
import { LoginUsernamePayload } from './login-username.payload';
import { VerificationAction } from '../user/verification.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly verificationService: VerificationService,
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: '7d',
      accessToken: this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }),
      user,
    };
  }

  async verify(payload: VerifyPayload): Promise<unknown> {
    const user = await this.userService.getBy({
      phoneNumber: payload.phoneNumber,
    });
    if (!user) throw new NotFoundException('otp or phone number is wrong');
    const verificationTable = await this.verificationService.getBy({
      otp: payload.otp,
      user,
    });
    if (!verificationTable)
      throw new NotFoundException('otp or phone number is wrong');
    return this.createToken(user);
  }

  async changePasswordVerify(payload: VerifyPayload): Promise<unknown> {
    const user = await this.userService.getBy({
      phoneNumber: payload.phoneNumber,
    });
    if (!user) throw new NotFoundException('otp or phone number is wrong');
    const verificationTable = await this.verificationService.getBy({
      otp: payload.otp,
      user,
    });
    if (!verificationTable)
      throw new NotFoundException('otp or phone number is wrong');
    if (verificationTable.action !== VerificationAction.ChangePassword)
      throw new NotAcceptableException(
        'your otp code is not generated for change password , try again',
      );
    return this.createToken(user);
  }

  async verifyCheckedUser(payload: VerifyPayload): Promise<unknown> {
    const user = await this.userService.getBy({
      phoneNumber: payload.phoneNumber,
    });
    if (!user) throw new NotFoundException('otp or phone number is wrong');
    const verificationTable = await this.verificationService.getBy({
      otp: payload.otp,
      user,
    });
    if (!verificationTable)
      throw new NotFoundException('otp or phone number is wrong');
    return { user };
  }

  async login(payload: LoginUsernamePayload) {
    const password = payload.password;
    delete payload.password;
    let user = await this.userService.getBy(payload);
    if (!user) {
      throw new NotFoundException('User not founded');
    }

    if (password) {
      if (!Hash.compare(password, user.password))
        throw new NotAcceptableException('username or password is wrong');
      return this.createToken(user);
    }
    return this.userService.getOtp(user, VerificationAction.Authentication);
  }
}
