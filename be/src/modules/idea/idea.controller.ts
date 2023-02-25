import { UserData } from '@core/decorator/user.decorator';
import { IUserData } from '@core/interface/default.interface';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EIdeaFilter } from 'enum/idea.enum';
import { VCreateIdeaDto } from 'global/dto/create-idea.dto';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get(':idea_id')
  async getIdeaDetail(
    @UserData() userData: IUserData,
    @Param('idea_id')
    idea_id: number,
  ) {
    return await this.ideaService.getIdeaDetail(idea_id, userData.user_id);
  }

  @Get('?')
  getIdeasByCurrentSemester(
    @Query('sorting_setting') sorting_setting: EIdeaFilter,
  ) {
    return this.ideaService.getAllIdeas(null, null, sorting_setting);
  }

  @Post()
  async createPost(
    @UserData() userData: IUserData,
    @Body() body: VCreateIdeaDto,
  ) {
    return await this.ideaService.createIdea(userData, body);
  }
}
