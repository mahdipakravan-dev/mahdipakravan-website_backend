import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordTransformer } from './password.transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  2;

  @Column({ length: 45, nullable: false })
  username: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }
}

export class UserFillableFields {
  password: string;
  phoneNumber: string;
  username: string;
}
