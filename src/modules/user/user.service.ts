import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserFillableFields } from './user.entity';
import { VerificationService } from './verification.service';
import { CheckUserPayload } from '../auth/checkUser.payload';
import { EditProfilePayload } from '../auth/edit.payload';
import { VerificationAction } from './verification.entity';
import { ChangePasswordPayload } from '../auth/change-password.payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly verificationService: VerificationService,
  ) {}

  async get(id: number) {
    return this.userRepository.findOne({ id });
  }

  async getBy(payload: Partial<User>) {
    return await this.userRepository.findOne(payload);
  }

  async editProfile({ user, ...payload }: EditProfilePayload & { user: User }) {
    const dbUser = await this.userRepository.findOneOrFail(user.id);
    if (!dbUser)
      throw new NotFoundException(
        `User ${JSON.stringify(user)} Not Founded in DB`,
      );
    Object.entries(payload).forEach(([key, val]) => {
      dbUser[key] = val;
    });
    return this.userRepository.save(dbUser);
  }

  async createUserAndGetOtp(payload: Partial<UserFillableFields>) {
    let user = await this.getBy({ phoneNumber: payload.phoneNumber });
    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
    user = await this.userRepository.save(this.userRepository.create(payload));
    return this.getOtp(user);
  }

  async getOtp(user: User, action?: VerificationAction) {
    const { otp } = await this.verificationService.create(user, action);
    return { code: otp };
  }

  async checkUserAndGetOtp({ phoneNumber }: CheckUserPayload) {
    let user = await this.getBy({ phoneNumber });
    if (!user)
      user = await this.userRepository.save(
        this.userRepository.create({
          phoneNumber,
          username: phoneNumber,
          password: phoneNumber,
        }),
      );

    return this.getOtp(user);
  }

  async changePasswordGetOtp({ phoneNumber }: CheckUserPayload) {
    let user = await this.getBy({ phoneNumber });

    return this.getOtp(user, VerificationAction.ChangePassword);
  }

  async changePassword(user: User, { password }: ChangePasswordPayload) {
    let userInDb = await this.getBy({ id: user.id });
    if (!userInDb) throw new NotFoundException('user not founded!');

    user.password = password;
    return await this.userRepository.save(user);
  }
}
