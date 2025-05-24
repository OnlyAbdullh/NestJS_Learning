import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;

}
