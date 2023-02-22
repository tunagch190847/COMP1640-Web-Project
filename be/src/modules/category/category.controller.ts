import { Public } from '@core/decorator/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDto } from 'global/dto/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllDepartments() {
    return await this.categoryService.getAllCategories();
  }

  @Public()
  @Get(':category_id')
  getIdeasByCategory(@Param('category_id') category_id: number) {
    return this.categoryService.getIdeasByCategory(category_id);
  }

  @Post()
  createCategory(@Body() dept: CategoryDto) {
    return this.categoryService.createCategory(dept);
  }

  @Put(':id')
  updateCategory(@Param('id') category_id: number, @Body() dept: CategoryDto) {
    return this.categoryService.updateCategory(category_id, dept);
  }

  @Delete(':id')
  deleteCategory(@Param('id') category_id: number) {
    return this.categoryService.deleteCategory(category_id);
  }
}
