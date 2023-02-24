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
import { DepartmentDto } from 'global/dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Public()
  @Get()
  async getAllDepartments() {
    return await this.departmentService.getAllDepartments();
  }

  @Get(':id')
  getDepartmentById(@Param('id') id: string) {
    return this.departmentService.getDepartmentById(Number(id));
  }

  @Get(':department_id/ideas')
  getIdeasByDepartment(@Param('department_id') department_id: number) {
    return this.departmentService.getIdeasByDepartment(department_id);
  }

  @Get(':department_id/categories/:category_id/ideas')
  getIdeasByDepartmentAndCategory(
    @Param('department_id') department_id: number, 
    @Param('category_id') category_id: number,
  ) {
    return this.departmentService
        .getIdeasByDepartmentAndCategory(department_id, category_id);
  }

  @Post()
  createDepartment(@Body() department: DepartmentDto) {
    return this.departmentService.createDepartment(department);
  }

  @Put(':id')
  updateDepartment(@Param('id') id: string, @Body() department: DepartmentDto) {
    return this.departmentService.updateDepartment(Number(id), department);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(Number(id));
  }
}
