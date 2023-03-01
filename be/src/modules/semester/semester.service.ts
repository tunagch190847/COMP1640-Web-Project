import { Semester } from '@core/database/mysql/entity/semester.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessage } from 'enum/error';
import { VUpdateSemesterDto } from 'global/dto/semester.dto';
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
    return await this.semesterRepository.findOne({
      semester_id: semester_id,
    });
  }

  async updateSemester(semester_id: number, body: VUpdateSemesterDto) {
    const semester = await this.getSemesterById(semester_id);

    if (!semester) {
      throw new HttpException(
        ErrorMessage.SEMESTER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const semesterParam = new Semester();
    semesterParam.name = body.name;
    semesterParam.final_closure_date = new Date(body?.final_closure_date);
    semesterParam.first_closure_date = new Date(body?.first_closure_date);

    await this.semesterRepository.update(
      { semester_id: semester_id },
      semesterParam,
    );
    return;
  }

  async deleteSemester(semester_id: number) {
    return await this.semesterRepository.delete({ semester_id });
  }
}
