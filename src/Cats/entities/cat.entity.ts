import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats', { synchronize: false })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;
}
