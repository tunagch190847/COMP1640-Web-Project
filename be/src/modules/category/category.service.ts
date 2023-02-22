import { Category } from '@core/database/mysql/entity/category.entity';
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
  ) {}

  async getAllCategories(entityManager?: EntityManager) {
    const categoryRepository = entityManager
      ? entityManager.getRepository<Category>('category')
      : this.categoryRepository;
    return await categoryRepository.find();
  }

  async getAllIdeasByCategory(category_id: number, entityManager?: EntityManager) {
    const categoryRepository = entityManager
      ? entityManager.getRepository<Category>('category')
      : this.categoryRepository;

    
    return "abc";
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
