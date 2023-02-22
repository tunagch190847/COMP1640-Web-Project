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
    private ideaRepository: Repository<Idea>,
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

  async getAllIdeas(entityManager?: EntityManager) {
    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;
    
    const ideas = await ideaRepository
      .createQueryBuilder('idea')
      .innerJoinAndSelect('idea.user', 'user')
      .leftJoinAndSelect('user.userDetail', 'userDetail')
      .leftJoinAndSelect('idea.comments', 'comments')
      .leftJoinAndSelect('idea.semester', 'semester')
      .getMany();

    const data = ideas.map((idea) => {
      return {
        idea_id: idea.idea_id,
        title: idea.title,
        content: idea.content,
        views: idea.views,
        likes: idea.likes,
        dislikes: idea.dislikes,
        comments: idea.comments.length,
        is_anonymous: idea.is_anonymous,
        semester: {
          semester_id: idea.semester.semester_id,
          name: idea.semester.name,
          description: idea.semester.description,
        },
        user: {
          user_id: idea.user.user_id,
          department_id: idea.user.userDetail.department_id,
          first_name: idea.user.userDetail.first_name,
          last_name: idea.user.userDetail.last_name,
          gender: idea.user.userDetail.gender,
          birthday: idea.user.userDetail.birthday,
        },
      };
    });

    return ideas;
  }
}
