import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gallery } from './gallery.entity';

@Entity({
  name: 'page',
})
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  md: string;

  @Column({ default: false })
  isDir: boolean;

  @OneToMany(() => Gallery, (gallery) => gallery.page)
  @JoinColumn()
  galleries: Gallery[];
}
