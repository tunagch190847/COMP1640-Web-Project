import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './userDetail.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn({ name: 'department_id', type: 'int', unsigned: true })
  department_id: number;

  @Column({ name: 'name', type: 'varchar', length: 20 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 100 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => UserDetail, (userDetail) => userDetail.department)
  userDetail: UserDetail[];
}