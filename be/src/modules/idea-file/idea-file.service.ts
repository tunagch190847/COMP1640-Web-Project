import { IdeaFile } from '@core/database/mysql/entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class IdeaFileService {
  constructor(
    @InjectRepository(IdeaFile)
    private ideaFileRepository: Repository<IdeaFile>,
  ) {}
  async createIdeaFile(
    body: Array<DeepPartial<IdeaFile>>,
    entityManager?: EntityManager,
  ) {
    const postMediaRepository = entityManager
      ? entityManager.getRepository('file')
      : this.ideaFileRepository;

    await postMediaRepository
      .createQueryBuilder()
      .insert()
      .into(IdeaFile)
      .values(body)
      .execute();

    return null;
  }
}
