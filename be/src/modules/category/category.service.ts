import { Category } from '@core/database/mysql/entity/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'global/dto/category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories() {
    return await this.categoryRepo.find();
  }

  async getCategoryById(category_id: number) {
    return await this.categoryRepo.findOne(category_id);
  }

  async createCategory(category: CategoryDto) {
    return await this.categoryRepo.save(category);
  }

  async updateCategory(category_id: number, category: CategoryDto) {
    return await this.categoryRepo.update({ category_id }, category);
  }

  async deleteCategory(category_id: number) {
    return await this.categoryRepo.delete({ category_id });
  }
}
