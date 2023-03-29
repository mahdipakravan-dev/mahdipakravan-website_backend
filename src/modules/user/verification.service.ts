import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Verification, VerificationAction } from './verification.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async getBy(payload: Partial<Verification>) {
    return await this.verificationRepository.findOne(payload);
  }

  async create(user: User, action?: VerificationAction) {
    return await this.verificationRepository.save(
      this.verificationRepository.create({
        action: action || VerificationAction.Authentication,
        user,
      }),
    );
  }
}
