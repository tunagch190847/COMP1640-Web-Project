import { EIsDelete } from 'enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Idea } from './ideas.entity';
import { IdeaComment } from './ideasComment.entity';
import { Role } from './role.entity';
import { UserDetail } from './userDetail.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  user_id: string;

  @Column({ name: 'email', type: 'varchar', length: 255, default: null })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, default: null })
  password: string;

  @Column({ name: 'token', type: 'mediumtext', nullable: true })
  token: string | null;

  // @Column({
  //   name: 'role_id',
  //   type: 'int',
  //   default: 0,
  // })
  // role_id: number;

  @Column({
    name: 'is_deleted',
    type: 'tinyint',
    width: 1,
    comment: '0: not deleted, 1: deteled',
    default: EIsDelete.NOT_DELETE,
  })
  is_deleted: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'current_timestamp',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: null,
  })
  updated_at: Date | null;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user)
  userDetail: UserDetail;

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Idea, (ideas) => ideas.user)
  ideas: Idea[];

  @OneToMany(() => IdeaComment, (ideaComment) => ideaComment.user)
  postComments: IdeaComment[];
}
