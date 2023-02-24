import { CategoryIdea } from '@core/database/mysql/entity/categoryIdea.entity';
import { SemesterService } from '@modules/semester/semester.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, DeepPartial } from 'typeorm';

@Injectable()
export class CategoryIdeaService {
  constructor(
    @InjectRepository(CategoryIdea)
    private readonly categoryIdeaRepository: Repository<CategoryIdea>,
    private readonly semesterService: SemesterService,
  ) {}

  async getCategoriesByIdea(idea_id: number, entityManager?: EntityManager) {
    const cate = [];
    const categoryIdeaRepository = entityManager
      ? entityManager.getRepository<CategoryIdea>('category_idea')
      : this.categoryIdeaRepository;

    const categories = await categoryIdeaRepository
      .createQueryBuilder('category_idea')
      .where('category_idea.idea_id = :idea_id', { idea_id })
      .innerJoinAndSelect('category_idea.category', 'category')
      .getMany();

    return categories;
  }

  async getIdeasByCategory(
    category_id: number, 
    semester_id?: number, 
    department_id?: number, 
    entityManager?: EntityManager
  ) {
    const categoryIdeaRepository = entityManager
      ? entityManager.getRepository<CategoryIdea>('category_idea')
      : this.categoryIdeaRepository;

    if(semester_id == null) {
      const currentSemester = await this.semesterService.getCurrentSemester();
      semester_id = currentSemester.semester_id;
    }
    
    const selectQueryBuilder = categoryIdeaRepository
      .createQueryBuilder('category_idea')
      .innerJoinAndSelect('category_idea.idea', 'idea')
      .innerJoinAndSelect('idea.user', 'user')
      .innerJoinAndSelect('user.userDetail', 'user_detail')
      .innerJoinAndSelect('user_detail.department', 'department')
      .leftJoinAndSelect('idea.comments', 'comments')
      .where('idea.semester_id = :semester_id', { semester_id })
      .andWhere('category_idea.category_id = :category_id', { category_id });

    if(department_id != null) {
      selectQueryBuilder.andWhere('user_detail.department_id = :department_id', { department_id });
    }

    const categoryIdeas = await selectQueryBuilder.getMany();
    const data = [];

    for (const categoryIdea of categoryIdeas) {
      const idea = categoryIdea.idea;
      const categoryIdeas = await this.getCategoriesByIdea(idea.idea_id);
      const categories = categoryIdeas.map((categoryIdea) => {
        return {
          category_id: categoryIdea.category.category_id,
          name: categoryIdea.category.name,
          description: categoryIdea.category.description,
        };
      });

      data.push({
        idea_id: idea.idea_id,
        title: idea.title,
        content: idea.content,
        views: idea.views,
        likes: idea.likes,
        dislikes: idea.dislikes,
        comments: idea.comments.length,
        is_anonymous: idea.is_anonymous,
        categories,
        user: {
          user_id: idea.user.user_id,
          first_name: idea.user.userDetail.first_name,
          last_name: idea.user.userDetail.last_name,
          gender: idea.user.userDetail.gender,
          birthday: idea.user.userDetail.birthday,
          department: {
            department_id: idea.user.userDetail.department_id,
            name: idea.user.userDetail.department.name,
          },
        },
      });
    }

    return data;
  }

  async createIdeaCategory(
    body: Array<DeepPartial<CategoryIdea>>,
    entityManager?: EntityManager,
  ) {
    const categoryIdeaRepository = entityManager
      ? entityManager.getRepository<CategoryIdea>('category_idea')
      : this.categoryIdeaRepository;

    return await categoryIdeaRepository
      .createQueryBuilder()
      .insert()
      .into(CategoryIdea)
      .values(body)
      .execute();
  }
}
