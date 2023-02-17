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
  fileId: number;

  @Column({ name: 'link', type: 'varchar', length: 300 })
  link: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Idea, (idea) => idea.files, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'ideaId' })
  idea: Idea;
}