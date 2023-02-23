import { Controller } from '@nestjs/common';
import { IdeaFileService } from './idea-file.service';

@Controller('idea-file')
export class IdeaFileController {
  constructor(private readonly ideaFileService: IdeaFileService) {}
}
