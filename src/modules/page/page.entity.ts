import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery.entity';

@Entity({
  name: 'page',
})
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parentId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  md: string;

  @OneToMany(() => Gallery, (gallery) => gallery.page)
  @JoinColumn()
  galleries: Gallery[];
}
