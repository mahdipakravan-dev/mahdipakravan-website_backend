import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from './page.entity';

@Entity({
  name: 'gallery',
})
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page)
  @JoinColumn()
  page: Page;

  @Column({ nullable: false })
  title: string;

  @Column()
  desc: string;

  @Column()
  src: string;
}
