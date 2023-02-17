import { IdeaCategory } from '@core/database/mysql/entity/ideaCategory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([IdeaCategory])],
})
export class CategoryModule {}
