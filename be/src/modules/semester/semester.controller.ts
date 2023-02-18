import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SemesterDto } from 'global/dto/semester.dto';
import { SemesterService } from './semester.service';

@Controller('semester')
export class SemesterController {
    constructor(private readonly semesterService: SemesterService) {}

    @Get()
    async getAllSemesters() {
        return await this.semesterService.getAllSemesters();
    }

    @Get(':id')
    getSemesterById(@Param('id') id: string) {
        return this.semesterService.getSemesterById(Number(id));
    }

    @Post()
    createSemester(@Body() dept: SemesterDto) {
        return this.semesterService.createSemester(dept);
    }

    @Put(':id')
    updateSemester(@Param('id') id: string, @Body() dept: SemesterDto) {
        return this.semesterService.updateSemester(Number(id), dept);
    }

    @Delete(':id')
    deleteSemester(@Param('id') id: string) {
        return this.semesterService.deleteSemester(Number(id));
    }
}
