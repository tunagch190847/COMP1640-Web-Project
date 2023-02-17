import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './idea.entity';

@Entity('idea_files')
export class IdeaFile {
  @PrimaryGeneratedColumn({ name: 'file_id', type: 'int', unsigned: true })
  file_id: number;

  @Column({ name: 'link', type: 'varchar', length: 300 })
  link: string;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => Idea, (idea) => idea.files, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;
}