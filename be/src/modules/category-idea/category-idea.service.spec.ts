import { Test, TestingModule } from '@nestjs/testing';
import { CategoryIdeaService } from './category-idea.service';

describe('CategoryIdeaService', () => {
  let service: CategoryIdeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryIdeaService],
    }).compile();

    service = module.get<CategoryIdeaService>(CategoryIdeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
