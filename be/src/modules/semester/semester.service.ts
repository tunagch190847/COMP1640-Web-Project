import { Semester } from '@core/database/mysql/entity/semester.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SemesterDto } from 'global/dto/semester.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepo: Repository<Semester>,
  ) {}

  async getAllSemesters() {
    return await this.semesterRepo.find();
  }

  async getSemesterById(semester_id: number) {
    return await this.semesterRepo.findOne(semester_id);
  }

  async createSemester(dept: SemesterDto) {
    return await this.semesterRepo.save(dept);
  }

  async updateSemester(semester_id: number, dept: SemesterDto) {
    return await this.semesterRepo.update({ semester_id }, dept);
  }

  async deleteSemester(semester_id: number) {
    return await this.semesterRepo.delete({ semester_id });
  }
}
