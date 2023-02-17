// import {
//     Column,
//     CreateDateColumn,
//     Entity,
//     JoinColumn,
//     ManyToOne,
//     PrimaryColumn,
//   } from 'typeorm';
//   import { Idea } from './idea.entity';
// import { IdeaCategory } from './ideaCategory.entity';
  
// @Entity('categories_ideas')
// export class CategoriesIdeas {
//   @PrimaryColumn({ name: 'idea_id' })
//   ideaId: number;

//   @PrimaryColumn({ name: 'category_id' })
//   categoryId: number;

//   @ManyToOne(() => Idea, idea => idea { onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'idea_id' })
//   idea: Idea;

//   @ManyToOne(() => IdeaCategory, categories => categories. { onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'category_id' })
//   category: IdeaCategory;
// }  