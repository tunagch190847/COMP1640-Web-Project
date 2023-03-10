import { Category } from '@core/database/mysql/entity/category.entity';
import { IUserData } from '@core/interface/default.interface';
import { IdeaService } from '@modules/idea/idea.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole } from 'enum/default.enum';
import { ErrorMessage } from 'enum/error';
import { VCreateCategoryDto } from 'global/dto/category.dto';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly ideaService: IdeaService,
  ) {}

  async getAllCategories(entityManager?: EntityManager) {
    const categoryRepository = entityManager
      ? entityManager.getRepository<Category>('category')
      : this.categoryRepository;
    return await categoryRepository.find();
  }

  getIdeasByCategory(category_id: number) {
    return this.ideaService.getAllIdeas(null, null, category_id);
  }

  async createCategory(userData: IUserData, body: VCreateCategoryDto) {
    if (userData.role_id != EUserRole.ADMIN) {
      throw new HttpException(
        ErrorMessage.YOU_DO_NOT_HAVE_PERMISSION_TO_POST_IDEA,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryParam = new Category();

    categoryParam.name = body.name;

    return await this.categoryRepository.save(categoryParam);
  }

  async updateCategory(
    category_id: number,
    body: VCreateCategoryDto,
    userData: IUserData,
  ) {
    if (userData.role_id != EUserRole.ADMIN) {
      throw new HttpException(
        ErrorMessage.YOU_DO_NOT_HAVE_PERMISSION_TO_UPDATE_CATEGORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryParams = new Category();
    if (!body) {
      throw new HttpException(
        ErrorMessage.EMPTY_UPDATE_BODY,
        HttpStatus.BAD_REQUEST,
      );
    }
    categoryParams.name = body.name;
    await this.categoryRepository.update({ category_id }, categoryParams);
    return;
  }

  async deleteCategory(category_id: number, userData: IUserData) {
    if (userData.role_id != EUserRole.ADMIN) {
      throw new HttpException(
        ErrorMessage.YOU_DO_NOT_HAVE_PERMISSION_TO_DELETE_CATEGORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const ideaData = await this.getIdeasByCategory(category_id);
    if (ideaData.length != 0) {
      throw new HttpException(
        ErrorMessage.CATEGORY_STILL_CONTAINS_IDEAS,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.delete({ category_id });
    return;
  }
}
