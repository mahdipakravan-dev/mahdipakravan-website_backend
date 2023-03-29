import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'project',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title : string

  @Column()
  link : string

  @Column()
  stacks : string

  @Column()
  sourceCodeUrl : string

  @Column()
  demoUrl : string

  @Column()
  thumbnail : string
}
