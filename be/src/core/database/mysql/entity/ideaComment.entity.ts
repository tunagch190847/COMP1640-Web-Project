import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './idea.entity';
import { User } from './user.entity';

@Entity('ideas_comment')
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id', type: 'int', unsigned: true })
  comment_id: number;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Idea, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id' })
  idea: Idea;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
