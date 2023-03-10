import {
  Column,
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

  @Column({ name: 'file', type: 'varchar', length: 300 })
  file: string;

  @Column({ name: 'size', type: 'double', unsigned: true })
  size: number;

  @ManyToOne(() => Idea, (idea) => idea.files, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;
}
