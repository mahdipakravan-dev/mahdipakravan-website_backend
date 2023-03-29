import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum VerificationAction {
  Authentication = 'AUTHENTICATION',
  ChangePassword = 'CHANGE_PASSWORD',
}
@Entity({
  name: 'verification',
})
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  otp: string;

  @Column({ default: VerificationAction.Authentication })
  action: string;

  @BeforeInsert()
  createCode() {
    this.otp = Math.floor(Math.random() * 9999).toString();
  }
}
