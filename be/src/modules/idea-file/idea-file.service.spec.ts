import { Test, TestingModule } from '@nestjs/testing';
import { IdeaFileService } from './idea-file.service';

describe('IdeaFileService', () => {
  let service: IdeaFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeaFileService],
    }).compile();

    service = module.get<IdeaFileService>(IdeaFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
