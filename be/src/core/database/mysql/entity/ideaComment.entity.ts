import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Idea } from './idea.entity';
import { User } from './user.entity';

@Entity('idea_comments')
export class IdeaComment {
  @PrimaryGeneratedColumn({ name: 'comment_id', type: 'int', unsigned: true })
  commentId: number;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Idea, (idea) => idea.comments, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'ideaId' })
  idea: Idea;

  @ManyToOne(() => User, (user) => user.ideas, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}
