import { EIsDelete } from 'enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Idea } from './idea.entity';
import { IdeaComment } from './comment.entity';
import { Role } from './role.entity';
import { UserDetail } from './userDetail.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  user_id: string;

  @Column({ name: 'role_id', type: 'int', unsigned: true })
  role_id: number;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'token', type: 'mediumtext', nullable: true })
  token: string | null;

  @Column({
    name: 'is_deleted',
    type: 'tinyint',
    width: 1,
    comment: '0: not deleted, 1: deteled',
    default: EIsDelete.NOT_DELETE,
  })
  is_deleted: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user)
  userDetail: UserDetail;

  @ManyToOne(() => Role, (role) => role.users, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: Role;

  @OneToMany(() => Idea, (idea) => idea.user)
  ideas: Idea[];

  @OneToMany(() => IdeaComment, (ideaComment) => ideaComment.user)
  ideasComments: IdeaComment[];
}
