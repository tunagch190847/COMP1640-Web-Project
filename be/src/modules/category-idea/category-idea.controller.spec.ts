import { Test, TestingModule } from '@nestjs/testing';
import { CategoryIdeaController } from './category-idea.controller';

describe('CategoryIdeaController', () => {
  let controller: CategoryIdeaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryIdeaController],
    }).compile();

    controller = module.get<CategoryIdeaController>(CategoryIdeaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
