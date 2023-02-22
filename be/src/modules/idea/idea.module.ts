import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from 'src/core/database/mysql/entity/idea.entity';
import { SemesterModule } from '@modules/semester/semester.module';
import { CategoryIdeaModule } from '@modules/category-idea/category-idea.module';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService],
  imports: [TypeOrmModule.forFeature([Idea]), SemesterModule, CategoryIdeaModule],
})
export class IdeaModule {}
