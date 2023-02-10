import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id', type: 'int', unsigned: true })
  role_id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
