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
import { IdeaComment } from './ideaComment.entity';
import { IdeaFile } from './ideaFile.entity';
import { Semester } from './semester.entity';
import { User } from './user.entity';

@Entity('ideas')
export class Idea {
  @PrimaryGeneratedColumn({ name: 'idea_id', type: 'int', unsigned: true })
  idea_id: number;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 800 })
  content: string;

  @Column({ name: 'views', type: 'int', unsigned: true, default: 0 })
  views: number;

  @Column({ name: 'likes', type: 'int', unsigned: true, default: 0 })
  likes: number;

  @Column({ name: 'dislikes', type: 'int', unsigned: true, default: 0 })
  dislikes: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ideas, { onUpdate: 'CASCADE' } )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @OneToMany(() => IdeaComment, (comment) => comment.idea)
  comments: IdeaComment[];

  @OneToMany(() => IdeaFile, (file) => file.idea)
  files: IdeaFile[];

  @ManyToOne(() => Semester, (semester) => semester.ideas, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'semester_id', referencedColumnName: 'semester_id' })
  semester: Semester;

  // @OneToMany(() => CategoriesIdeas, (categoriesIdeas) => categoriesIdeas.idea)
  // categories: IdeaCategory[];
}
