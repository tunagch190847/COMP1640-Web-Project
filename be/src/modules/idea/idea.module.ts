import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { Idea } from 'src/database/entity/ideas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService],
  imports: [TypeOrmModule.forFeature([Idea])],
})
export class IdeaModule {}
