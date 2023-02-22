import { Public } from '@core/decorator/public.decorator';
import { UserData } from '@core/decorator/user.decorator';
import { IUserData } from '@core/interface/default.interface';
import { Controller, Get, Param } from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get('/:idea_id')
  async getIdeaDetail(
    @UserData() userData: IUserData,
    @Param('idea_id')
    idea_id: number,
  ) {
    return await this.ideaService.getIdeaDetail(idea_id, userData.user_id);
  }

  @Public()
  @Get()
  getAllIdeasByCurrentSemester() {
    return this.ideaService.getAllIdeasByCurrentSemester();
  }
}
