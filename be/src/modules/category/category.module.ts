import { Category } from '@core/database/mysql/entity/category.entity';
import { CategoryIdeaModule } from '@modules/category-idea/category-idea.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category]), CategoryIdeaModule],
  exports: [CategoryService],
})
export class CategoryModule {}
