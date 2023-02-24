import { Public } from '@core/decorator/public.decorator';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadS3V2(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.uploadService.uploadFireBase(files);
  }
}
