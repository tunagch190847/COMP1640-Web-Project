import { Module } from '@nestjs/common';
import { IdeaFileService } from './idea-file.service';
import { IdeaFileController } from './idea-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaFile } from '@core/database/mysql/entity/file.entity';

@Module({
  controllers: [IdeaFileController],
  providers: [IdeaFileService],
  imports: [TypeOrmModule.forFeature([IdeaFile])],
  exports: [TypeOrmModule, IdeaFileService],
})
export class IdeaFileModule {}
