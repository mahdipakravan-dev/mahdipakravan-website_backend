import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { Verification } from './verification.entity';
import { VerificationService } from './verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  exports: [VerificationService, UsersService],
  providers: [VerificationService, UsersService],
})
export class UserModule {}
