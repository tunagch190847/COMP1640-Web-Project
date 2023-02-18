import { Public } from '@core/decorator/public.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentDto } from 'global/dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
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
