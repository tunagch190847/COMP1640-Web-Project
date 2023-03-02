import { CategoryIdea } from '@core/database/mysql/entity/categoryIdea.entity';
import { SemesterService } from '@modules/semester/semester.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGender } from 'enum/default.enum';
import { EIdeaFilter } from 'enum/idea.enum';
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
    sorting_setting?: EIdeaFilter,
    entityManager?: EntityManager,
  ) {
    const categoryIdeaRepository = entityManager
      ? entityManager.getRepository<CategoryIdea>('category_idea')
      : this.categoryIdeaRepository;

    if (semester_id == null) {
      const currentSemester = await this.semesterService.getCurrentSemester();
      semester_id = currentSemester.semester_id;
    }

    const selectQueryBuilder = categoryIdeaRepository
      .createQueryBuilder('category_idea')
      .innerJoinAndSelect('category_idea.idea', 'idea')
      .innerJoinAndSelect('idea.user', 'user')
      .innerJoinAndSelect('user.userDetail', 'user_detail')
      .innerJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('idea.comments', 'comments')
      .where('idea.semester_id = :semester_id', { semester_id })
      .andWhere('category_idea.category_id = :category_id', { category_id });

    if (department_id != null) {
      selectQueryBuilder.andWhere('user.department_id = :department_id', {
        department_id,
      });
    }

    if (sorting_setting == EIdeaFilter.MOST_VIEWED_IDEAS) {
      selectQueryBuilder.orderBy('idea.views', 'DESC');
    } else if (sorting_setting == EIdeaFilter.RECENT_IDEAS) {
      selectQueryBuilder.orderBy('idea.created_at', 'DESC');
    } else if (sorting_setting == EIdeaFilter.MOST_POPULAR_IDEAS) {
      // selectQueryBuilder.orderBy('idea.likes', 'DESC');
    }

    const categoryIdeas = await selectQueryBuilder.getMany();
    const data = [];

    for (const categoryIdea of categoryIdeas) {
      const idea = categoryIdea.idea;
      const categoryIdeas = await this.getCategoriesByIdea(idea.idea_id);
      const categories = categoryIdeas.map(
        (categoryIdea) => categoryIdea.category,
      );

      let txtGender = '';

      switch (idea.user.userDetail.gender) {
        case EGender.PREFER_NOT_TO_SAY:
          txtGender = 'Prefer not to say';
          break;
        case EGender.MALE:
          txtGender = 'Male';
          break;
        case EGender.FEMALE:
          txtGender = 'Female';
          break;
        default:
          break;
      }

      data.push({
        idea_id: idea.idea_id,
        title: idea.title,
        content: idea.content,
        views: idea.views,
        comments: idea.comments.length,
        is_anonymous: idea.is_anonymous,
        created_at: idea.created_at,
        categories,
        user: {
          user_id: idea.user.user_id,
          full_name: idea.user.userDetail.full_name,
          nick_name: idea.user.userDetail.nick_name,
          gender: txtGender,
          birthday: idea.user.userDetail.birthday,
          avatar_url: idea.user.userDetail.avatar_url,
          department: idea.user.department,
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

  async deleteIdeaCategory(idea_id: number, entityManager?: EntityManager) {
    const categoryIdeaRepository = entityManager
      ? entityManager.getRepository<CategoryIdea>('category_idea')
      : this.categoryIdeaRepository;

    return await categoryIdeaRepository.delete({ idea_id });
  }
}
