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

@Entity('comment')
export class IdeaComment {
  @PrimaryGeneratedColumn({ name: 'comment_id', type: 'int', unsigned: true })
  comment_id: number;

  @Column({ name: 'idea_id', type: 'int', unsigned: true })
  idea_id: number;

  @Column('uuid', { name: 'user_id' })
  user_id: string;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => Idea, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;

  @ManyToOne(() => User, (user) => user.ideas, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;
}
