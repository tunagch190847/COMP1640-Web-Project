import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id', type: 'int', unsigned: true })
  roleId: number;

  @Column({ name: 'name', type: 'varchar', length: '20' })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: '200' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
