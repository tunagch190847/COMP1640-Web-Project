import { Semester } from '@core/database/mysql/entity/semester.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SemesterDto } from 'global/dto/semester.dto';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
  ) {}

  async getAllSemesters() {
    return await this.semesterRepository.find();
  }

  async getCurrentSemester() {
    return await this.semesterRepository.findOne({
      where: {
        created_date: LessThanOrEqual(new Date()),
        final_closure_date: MoreThanOrEqual(new Date()),
      },
    });
  }

  async getSemesterById(semester_id: number) {
    return await this.semesterRepository.findOne(semester_id);
  }

  async createSemester(dept: SemesterDto) {
    return await this.semesterRepository.save(dept);
  }

  async updateSemester(semester_id: number, dept: SemesterDto) {
    return await this.semesterRepository.update({ semester_id }, dept);
  }

  async deleteSemester(semester_id: number) {
    return await this.semesterRepository.delete({ semester_id });
  }
}
