import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './idea.entity';

@Entity('ideas_categories')
export class IdeaCategory {
  @PrimaryGeneratedColumn({ name: 'category_id', type: 'int', unsigned: true })
  category_id: number;

  @Column({ name: 'content', type: 'varchar' })
  description: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Idea, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id' })
  idea: Idea;
}
