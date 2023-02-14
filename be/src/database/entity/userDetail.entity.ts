import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './departments.entity';
import { User } from './user.entity';

@Entity('user_detail')
export class UserDetail {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  user_id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, default: null })
  name: string;

  @Column({
    name: 'gender',
    type: 'int',
    default: -1,
    comment:
      '-1: Not selected(Default), 0: Prefer not to say, 1: male, 2: Female',
  })
  gender: number;

  @Column({
    name: 'department_id',
    type: 'int',
  })
  department_id: number;

  @Column({ name: 'birthdate', type: 'date', default: null })
  birthdate: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
    onUpdate: 'current_timestamp',
  })
  updated_at: Date | null;

  @OneToOne(() => User, (user) => user.userDetail)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Department, (department) => department.userDetail)
  @JoinColumn({ name: 'departments_id' })
  department: Department;
}
