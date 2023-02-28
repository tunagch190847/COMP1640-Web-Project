import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryIdea } from './categoryIdea.entity';
import { IdeaComment } from './comment.entity';
import { IdeaFile } from './file.entity';
import { Reaction } from './reaction.entity';
import { Semester } from './semester.entity';
import { User } from './user.entity';

@Entity('idea')
export class Idea {
  @PrimaryGeneratedColumn({ name: 'idea_id', type: 'int', unsigned: true })
  idea_id: number;

  @Column('uuid', { name: 'user_id' })
  user_id: string;

  @Column({ name: 'semester_id', type: 'int', unsigned: true })
  semester_id: number;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @Column({ name: 'views', type: 'int', unsigned: true, default: 0 })
  views: number;

  @Column({
    name: 'is_anonymous',
    type: 'tinyint',
    unsigned: true,
    default: 0,
    comment: '0: not anonymous, 1: anonymous',
  })
  is_anonymous: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ideas, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @ManyToOne(() => Semester, (semester) => semester.ideas, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'semester_id', referencedColumnName: 'semester_id' })
  semester: Semester;

  @OneToMany(() => IdeaComment, (comment) => comment.idea)
  comments: IdeaComment[];

  @OneToMany(() => IdeaFile, (file) => file.idea)
  files: IdeaFile[];

  @OneToMany(() => CategoryIdea, (categoryIdea) => categoryIdea.idea)
  ideaCategories: CategoryIdea[];

  @OneToMany(() => Reaction, (reaction) => reaction.idea)
  reactions: CategoryIdea[];
}
