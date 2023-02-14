import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IdeaCategory } from './ideasCategory.entity';
import { IdeaComment } from './ideasComment.entity';
import { IdeaFile } from './ideasFile.entity';
import { User } from './user.entity';

@Entity('idea')
export class Idea {
  @PrimaryGeneratedColumn({
    name: 'ideas_id',
    type: 'int',
    unsigned: true,
  })
  post_id: number;

  @Column({ name: 'user_id', type: 'char', length: 36 })
  user_id: string;

  @Column({ name: 'title', type: 'varchar', length: 70 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 800, default: null })
  content: string;

  @Column({
    name: 'view',
    type: 'tinyint',
    default: 0,
  })
  view: number;

  @Column({
    name: 'like',
    type: 'tinyint',
    default: 0,
  })
  like: number;

  @Column({
    name: 'dislike',
    type: 'tinyint',
    default: 0,
  })
  dislike: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  created_at: Date;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => IdeaComment, (comment) => comment.idea)
  comment: IdeaComment[];

  @OneToOne(() => IdeaCategory, (ideaCategory) => ideaCategory.idea)
  @JoinColumn({ name: 'category_id' })
  ideaCategory: IdeaCategory[];

  @OneToMany(() => IdeaFile, (ideaFiles) => ideaFiles.idea)
  ideaFiles: IdeaFile[];
}
