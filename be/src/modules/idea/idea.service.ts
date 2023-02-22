import { SemesterService } from '@modules/semester/semester.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ok } from 'assert';
import { ErrorMessage } from 'enum/error';
import { Idea } from 'src/core/database/mysql/entity/idea.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private readonly ideaRepository: Repository<Idea>,
    private readonly semesterService: SemesterService,
  ) {}

  async getIdeaDetail(
    idea_id: number,
    user_id?: string,
    entityManager?: EntityManager,
  ) {
    let data = [];

    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;
    const idea = await this.ideaRepository.findOne({
      where: { idea_id: idea_id },
    });

    if (!idea) {
      throw new HttpException(
        ErrorMessage.IDEA_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryBuilder = ideaRepository
      .createQueryBuilder('idea')
      .leftJoinAndSelect('idea.files', 'files');

    const [listFiles] = await queryBuilder.getMany();
    data = listFiles.files.map((file) => file.file);

    return {
      user_id: user_id,
      tilte: idea.title,
      content: idea.content,
      date: idea.created_at,
      like: idea.likes,
      dislike: idea.dislikes,
      file: data,
    };
  }

  async getAllIdeasByCurrentSemester(entityManager?: EntityManager) {
    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;
    
    const currentSemester = await this.semesterService.getCurrentSemester();
    const semesterId = currentSemester.semester_id;

    const ideas = await ideaRepository
      .createQueryBuilder('idea')
      .where('idea.semester_id = :semesterId', {semesterId})
      .innerJoinAndSelect('idea.user', 'user')
      .innerJoinAndSelect('user.userDetail', 'userDetail')
      .innerJoinAndSelect('userDetail.department', 'department')
      .leftJoinAndSelect('idea.comments', 'comments')
      .getMany();

    const temp = ideas.map((idea) => {
      return {
        idea_id: idea.idea_id,
        title: idea.title,
        content: idea.content,
        views: idea.views,
        likes: idea.likes,
        dislikes: idea.dislikes,
        comments: idea.comments.length,
        is_anonymous: idea.is_anonymous,
        user: {
          user_id: idea.user.user_id,
          first_name: idea.user.userDetail.first_name,
          last_name: idea.user.userDetail.last_name,
          gender: idea.user.userDetail.gender,
          birthday: idea.user.userDetail.birthday,
          department: {
            department_id: idea.user.userDetail.department_id,
            name: idea.user.userDetail.department.name,
            description: idea.user.userDetail.department.description,
          },
        },
      };
    });

    const data = {
      semester: {
        semester_id: currentSemester.semester_id,
        name: currentSemester.name,
        description: currentSemester.description,
        created_at: currentSemester.created_at,
        first_closure_date: currentSemester.first_closure_date,
        final_closure_date: currentSemester.final_closure_date,
      },
      ideas: temp,
    };

    return data;
  }
}
