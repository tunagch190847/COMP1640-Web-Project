import { CategoryIdea } from '@core/database/mysql/entity/categoryIdea.entity';
import { IdeaFile } from '@core/database/mysql/entity/file.entity';
import { IUserData } from '@core/interface/default.interface';
import { CategoryIdeaService } from '@modules/category-idea/category-idea.service';
import { IdeaFileService } from '@modules/idea-file/idea-file.service';
import { SemesterService } from '@modules/semester/semester.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole } from 'enum/default.enum';
import { ErrorMessage } from 'enum/error';
import { VCreateIdeaDto } from 'global/dto/create-idea.dto';
import { Idea } from 'src/core/database/mysql/entity/idea.entity';
import { Repository, EntityManager, DeepPartial, Connection } from 'typeorm';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private readonly ideaRepository: Repository<Idea>,
    private readonly semesterService: SemesterService,
    private readonly categoryIdeaService: CategoryIdeaService,
    private ideaFileService: IdeaFileService,
    private connection: Connection,
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
      title: idea.title,
      content: idea.content,
      date: idea.created_at,
      like: idea.likes,
      dislike: idea.dislikes,
      file: data,
    };
  }

  async getAllIdeas(
    semester_id: number, 
    entityManager?: EntityManager
  ) {
    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;

    const semester = await this.semesterService.getSemesterById(semester_id);
    const semesterId = semester.semester_id;

    const ideas = await ideaRepository
      .createQueryBuilder('idea')
      .where('idea.semester_id = :semesterId', { semesterId })
      .innerJoinAndSelect('idea.user', 'user')
      .innerJoinAndSelect('user.userDetail', 'userDetail')
      .innerJoinAndSelect('userDetail.department', 'department')
      .leftJoinAndSelect('idea.comments', 'comments')
      .getMany();

    const temp = [];

    for (const idea of ideas) {
      const categoryIdeas = await this.categoryIdeaService.getCategoriesByIdea(
        idea.idea_id,
      );
      const categories = categoryIdeas.map((categoryIdea) => {
        return {
          category_id: categoryIdea.category.category_id,
          name: categoryIdea.category.name,
          description: categoryIdea.category.description,
        };
      });

      temp.push({
        idea_id: idea.idea_id,
        title: idea.title,
        content: idea.content,
        views: idea.views,
        likes: idea.likes,
        dislikes: idea.dislikes,
        comments: idea.comments.length,
        is_anonymous: idea.is_anonymous,
        categories,
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
      });
    }

    const data = {
      semester: {
        semester_id: semester.semester_id,
        name: semester.name,
        description: semester.description,
        created_at: semester.created_at,
        first_closure_date: semester.first_closure_date,
        final_closure_date: semester.final_closure_date,
      },
      ideas: temp,
    };

    return data;
  }

  async getIdeasByCurrentSemester() {
    const currentSemester = await this.semesterService.getCurrentSemester();
    const semesterId = currentSemester.semester_id;

    return this.getAllIdeas(semesterId);
  }

  async createIdea(userData: IUserData, body: VCreateIdeaDto) {
    // let countPDF = 0;
    let data: DeepPartial<Idea>;
    if (userData.role_id != EUserRole.STAFF) {
      throw new HttpException(
        ErrorMessage.YOU_DO_NOT_HAVE_PERMISSION_TO_POST_IDEA,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      data = await this.connection.transaction(async (manager) => {
        const currentSemester = await this.semesterService.getCurrentSemester();
        const ideaParams = new Idea();
        ideaParams.user_id = userData.user_id;
        ideaParams.title = body.title;
        ideaParams.content = body.content;
        ideaParams.is_anonymous = body.is_anonymous;
        ideaParams.semester_id = currentSemester.semester_id;

        const idea = await this.saveIdea(ideaParams, manager);

        console.log(idea);

        const postFileParams = [];
        if (body?.files && body?.files.length) {
          body.files.forEach((files) => {
            const ideaFileParam = new IdeaFile();
            ideaFileParam.idea_id = idea.idea_id;
            ideaFileParam.file = files.file;
            postFileParams.push(ideaFileParam);
          });
        }
        const categoryIdeaParams = [];

        if (body?.category_ids && body?.category_ids?.length) {
          body.category_ids.forEach((category_id) => {
            const categoryIdeaParam = new CategoryIdea();
            categoryIdeaParam.idea_id = idea.idea_id;
            categoryIdeaParam.category_id = category_id;

            console.log('categoryIdeaParam: ', categoryIdeaParam);

            categoryIdeaParams.push(categoryIdeaParam);
          });
        }
        const result = await Promise.allSettled([
          this.ideaFileService.createIdeaFile(postFileParams, manager),
          this.categoryIdeaService.createIdeaCategory(
            categoryIdeaParams,
            manager,
          ),
        ]);

        if (result.some((r) => r.status === 'rejected'))
          throw new HttpException(
            'ErrorMessage.POSTING_IDEA_FAILED',
            HttpStatus.BAD_REQUEST,
          );

        return idea;
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return {
      idea_id: data.idea_id,
      files: body.files || [],
    };
  }

  async saveIdea(value: DeepPartial<Idea>, entityManager?: EntityManager) {
    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;

    console.log(value);

    return await ideaRepository.save(value);
  }
}
