import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@core/database/mysql/entity/department.entity';

@Module({
  providers: [DepartmentService],
  controllers: [DepartmentController],
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentModule {}
