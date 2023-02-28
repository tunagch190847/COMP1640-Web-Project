import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './idea.entity';

@Entity('file')
export class IdeaFile {
  @PrimaryGeneratedColumn({ name: 'file_id', type: 'int', unsigned: true })
  file_id: number;

  @Column({ name: 'idea_id', type: 'int', unsigned: true })
  idea_id: number;

  @Column({ name: 'path', type: 'varchar', length: 300 })
  path: string;

  @Column({ name: 'size', type: 'double', unsigned: true })
  size: number;

  @ManyToOne(() => Idea, (idea) => idea.files, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;
}
