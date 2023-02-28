import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Idea } from './idea.entity';
import { User } from './user.entity';

@Entity('reaction')
export class Reaction {
  @PrimaryColumn({ name: 'idea_id', type: 'int', unsigned: true })
  idea_id: number;

  @PrimaryColumn('uuid', { name: 'user_id' })
  user_id: string;

  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    comment: '0: liked, 1: disliked',
  })
  type: number;

  @ManyToOne(() => Idea, (idea) => idea.reactions, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
  idea: Idea;

  @ManyToOne(() => User, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;
}
