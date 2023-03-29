import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'contact',
})
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  email: string;
}
