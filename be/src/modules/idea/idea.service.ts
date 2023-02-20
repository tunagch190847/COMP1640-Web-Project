import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from 'src/core/database/mysql/entity/idea.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private ideaRepository: Repository<Idea>,
  ) {}

  async getIdeaDetail(
    idea_id: number,
    user_id?: string,
    entityManager?: EntityManager,
  ) {
    console.log(idea_id, '|idea_id');

    const ideaRepository = entityManager
      ? entityManager.getRepository<Idea>('idea')
      : this.ideaRepository;
    const idea = await this.ideaRepository.findOne({
      where: { idea_id: idea_id },
    });
    const queryBuilder = ideaRepository
      .createQueryBuilder('idea')
      .select()
      .leftJoinAndSelect('idea.files', 'files');
    const [listFiles] = await queryBuilder.getMany();

    console.log(listFiles, 11111);

    return {
      user_id: user_id,
      tilte: idea.title,
      content: idea.content,
      date: idea.created_at,
      like: idea.likes,
      dislike: idea.dislikes,
    };
  }
}
