import { Test, TestingModule } from '@nestjs/testing';
import { IdeaFileController } from './idea-file.controller';
import { IdeaFileService } from './idea-file.service';

describe('IdeaFileController', () => {
  let controller: IdeaFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaFileController],
      providers: [IdeaFileService],
    }).compile();

    controller = module.get<IdeaFileController>(IdeaFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
