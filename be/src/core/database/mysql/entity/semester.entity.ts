import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Idea } from './idea.entity';
  
  @Entity('semesters')
  export class Semester {
    @PrimaryGeneratedColumn({ name: 'semester_id', type: 'int', unsigned: true })
    semester_id: number;
  
    @Column({ name: 'name', type: 'varchar', length: 20 })
    name: string;
  
    @Column({ name: 'description', type: 'varchar', length: 100 })
    description: string;
  
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
  
    @OneToMany(() => Idea, (idea) => idea.semester)
    ideas: Idea[];
  }