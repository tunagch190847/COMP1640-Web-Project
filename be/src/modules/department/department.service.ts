import { Department } from '@core/database/mysql/entity/department.entity';
import { CategoryIdeaService } from '@modules/category-idea/category-idea.service';
import { IdeaService } from '@modules/idea/idea.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDto } from 'global/dto/department.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly categoryIdeaService: CategoryIdeaService,
    private readonly ideaService: IdeaService,
  ) {}

  async getAllDepartments() {
    return await this.departmentRepository.find();
  }

  async getDepartmentById(department_id: number) {
    return await this.departmentRepository.findOne(department_id);
  }

  getIdeasByDepartmentAndCategory(department_id: number, category_id: number) {
    return this.categoryIdeaService
        .getIdeasByCategory(category_id, null, department_id);
  }

  getIdeasByDepartment(department_id: number) {
    return this.ideaService.getAllIdeas(null, department_id);
  }

  async createDepartment(department: DepartmentDto) {
    return await this.departmentRepository.save(department);
  }

  async updateDepartment(department_id: number, department: DepartmentDto) {
    return await this.departmentRepository.update(
      { department_id },
      department,
    );
  }

  async deleteDepartment(department_id: number) {
    return await this.departmentRepository.delete({ department_id });
  }
}
