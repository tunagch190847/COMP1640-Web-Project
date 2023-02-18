import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { User } from './user.entity';

@Entity('user_detail')
export class UserDetail {
  @PrimaryColumn({ name: 'user_id' })
  user_id: number

  @OneToOne(() => User, (user) => user.userDetail, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({
    name: 'gender',
    type: 'int',
    default: -1,
    comment:
      '-1: Not selected(Default), 0: Prefer not to say, 1: male, 2: Female',
  })
  gender: number;

  @Column({ name: 'dob', type: 'date', default: null })
  dob: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToOne(() => Department, (department) => department.userDetail, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'department_id' })
  department: Department;
}
