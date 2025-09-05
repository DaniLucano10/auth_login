import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: false, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @CreateDateColumn()
  createdAA: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
