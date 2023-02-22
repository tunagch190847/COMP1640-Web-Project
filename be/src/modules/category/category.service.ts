import { Category } from '@core/database/mysql/entity/category.entity';
import { CategoryIdeaService } from '@modules/category-idea/category-idea.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'global/dto/category.dto';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryIdeaService: CategoryIdeaService,
  ) {}

  async getAllCategories(entityManager?: EntityManager) {
    const categoryRepository = entityManager
      ? entityManager.getRepository<Category>('category')
      : this.categoryRepository;
    return await categoryRepository.find();
  }

  getIdeasByCategory(category_id: number) {
    return this.categoryIdeaService.getIdeasByCategory(category_id);
  }

  async createCategory(category: CategoryDto) {
    return await this.categoryRepository.save(category);
  }

  async updateCategory(category_id: number, category: CategoryDto) {
    return await this.categoryRepository.update({ category_id }, category);
  }

  async deleteCategory(category_id: number) {
    return await this.categoryRepository.delete({ category_id });
  }
}
