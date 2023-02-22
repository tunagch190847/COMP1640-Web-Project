import { Semester } from '@core/database/mysql/entity/semester.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';

@Module({
  controllers: [SemesterController],
  providers: [SemesterService],
  imports: [TypeOrmModule.forFeature([Semester])],
  exports: [SemesterService],
})
export class SemesterModule {}
