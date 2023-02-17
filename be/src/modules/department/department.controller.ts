import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentDto } from 'global/dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(private readonly deptService: DepartmentService) {}

    @Get()
    async getAllDepartments() {
        return await this.deptService.getAllDepartments();
    }

    @Get(':id')
    getDepartmentById(@Param('id') id: string) {
        return this.deptService.getDepartmentById(Number(id));
    }

    @Post()
    createDepartment(@Body() dept: DepartmentDto) {
        return this.deptService.createDepartment(dept);
    }

    @Put(':id')
    updateDepartment(@Param('id') id: string, @Body() dept: DepartmentDto) {
        return this.deptService.updateDepartment(Number(id), dept);
    }

    @Delete(':id')
    deleteDepartment(@Param('id') id: string) {
        return this.deptService.deleteDepartment(Number(id));
    }
}
