import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Idea } from './idea.entity';

@Entity('category_idea')
export class CategoryIdea {
    @PrimaryGeneratedColumn({ name: 'category_idea_id', type: 'int', unsigned: true })
    category_idea_id: number;

    @ManyToOne(() => Idea, idea => idea.ideaCategories, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'idea_id', referencedColumnName: 'idea_id' })
    idea: Idea;

    @ManyToOne(() => Category, category => category.categoryIdeas, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'category_id', referencedColumnName: 'category_id' })
    category: Category;
}  