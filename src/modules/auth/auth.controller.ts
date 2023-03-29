import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, RegisterPayload } from './';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { User, UsersService } from './../user';
import { VerifyPayload } from './verify.payload';
import { CheckUserPayload } from './checkUser.payload';
import { EditProfilePayload } from './edit.payload';
import { LoginUsernamePayload } from './login-username.payload';
import { ChangePasswordPayload } from './change-password.payload';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    return await this.userService.createUserAndGetOtp(payload);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginUsernamePayload): Promise<any> {
    return await this.authService.login(payload);
  }

  @Post('changePasswordGetOtp')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePasswordGetOtp(@Body() payload: CheckUserPayload): Promise<any> {
    return await this.userService.changePasswordGetOtp(payload);
  }

  @Post('changePasswordVerifyOtp')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePasswordVerifyOtp(@Body() payload: VerifyPayload): Promise<any> {
    return await this.authService.changePasswordVerify(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('changePassword')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(
    @CurrentUser() user: User,
    @Body() payload: ChangePasswordPayload,
  ): Promise<any> {
    return await this.userService.changePassword(user, payload);
  }

  @Post('verify')
  @ApiResponse({ status: 201, description: 'OTP Sent' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async verify(@Body() payload: VerifyPayload): Promise<any> {
    return await this.authService.verify(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('editProfile')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async editProfile(
    @CurrentUser() user: User,
    @Body() payload: EditProfilePayload,
  ): Promise<User> {
    if (!user) throw new NotFoundException('UnAuthorized User');
    return this.userService.editProfile({ user, ...payload });
  }
}
