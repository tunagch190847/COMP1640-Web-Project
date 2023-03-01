import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { VUpdateSemesterDto } from 'global/dto/semester.dto';
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

  @Put(':semester_id')
  updateSemester(
    @Param('semester_id') semester_id: number,
    @Body() body: VUpdateSemesterDto,
  ) {
    return this.semesterService.updateSemester(semester_id, body);
  }

  @Delete(':id')
  deleteSemester(@Param('id') id: string) {
    return this.semesterService.deleteSemester(Number(id));
  }
}
