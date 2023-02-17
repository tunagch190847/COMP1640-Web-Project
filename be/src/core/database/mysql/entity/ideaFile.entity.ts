import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './idea.entity';

@Entity('ideas_files')
export class IdeaFile {
  @PrimaryGeneratedColumn({ name: 'files_id', type: 'int', unsigned: true })
  files_id: number;

  @Column({ name: 'link', type: 'varchar' })
  link: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Idea, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id' })
  idea: Idea;
}
