import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetail } from './userDetail.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn({
    name: 'departments_id',
    type: 'int',
    unsigned: true,
  })
  departments_id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => UserDetail, (userDetail) => userDetail.department_id)
  userDetail: UserDetail[];
}
