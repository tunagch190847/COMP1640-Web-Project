import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IdeaCategory } from './category.entity';
import { Comment } from './ideaComment.entity';
import { IdeaFile } from './ideaFile.entity';
import { User } from './user.entity';

@Entity('idea')
export class Idea {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @Column({ name: 'view', type: 'int', unsigned: true, default: 0 })
  view: number;

  @Column({ name: 'like', type: 'int', unsigned: true, default: 0 })
  like: number;

  @Column({ name: 'dislike', type: 'int', unsigned: true, default: 0 })
  dislike: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.idea)
  comments: Comment[];

  @OneToOne(() => IdeaCategory, (ideaCategory) => ideaCategory.idea)
  @JoinColumn({ name: 'category_id' })
  ideaCategories: IdeaCategory[];

  @OneToMany(() => IdeaFile, (ideaFiles) => ideaFiles.idea)
  ideaFiles: IdeaFile[];
}
