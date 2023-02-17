import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from 'src/core/database/mysql/entity/idea.entity';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService],
  imports: [TypeOrmModule.forFeature([Idea])],
})
export class IdeaModule {}
