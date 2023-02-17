import { Department } from '@core/database/mysql/entity/department.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDto } from 'global/dto/department.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly deptRepo: Repository<Department>,
    ) {}

    async getAllDepartments() {
        return await this.deptRepo.find();
    }

    async getDepartmentById(department_id: number) {
        return await this.deptRepo.findOne(department_id);
    }

    async createDepartment(dept: DepartmentDto) {
        return await this.deptRepo.save(dept);
    }

    async updateDepartment(department_id: number, dept: DepartmentDto) {
        return await this.deptRepo.update({department_id}, dept);
    }

    async deleteDepartment(department_id: number) {
        return await this.deptRepo.delete({department_id});
    }
}
