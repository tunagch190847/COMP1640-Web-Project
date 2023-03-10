import { EIsDelete } from 'enum';
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

  @Column('uuid', { name: 'author_id' })
  author_id: string;

  @Column('uuid', { name: 'reply_for_id', nullable: true })
  reply_for_id: string;

  @Column({ name: 'level', type: 'tinyint', unsigned: true, default: 1 })
  level: number;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @Column({
    name: 'is_deleted',
    type: 'tinyint',
    width: 1,
    comment: '0: not deleted, 1: deleted',
    default: EIsDelete.NOT_DELETE,
  })
  is_deleted: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => Idea, (idea) => idea.comments, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'author_id', referencedColumnName: 'user_id' })
  author: User;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'reply_for_id', referencedColumnName: 'user_id' })
  reply_for: User;
}
