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

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Post()
  createCategory(@Body() dept: CategoryDto) {
    return this.categoryService.createCategory(dept);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() dept: CategoryDto) {
    return this.categoryService.updateCategory(Number(id), dept);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(Number(id));
  }
}
