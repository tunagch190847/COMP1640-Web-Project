import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ErrorMessage } from 'enum/error';

export class VFile {
  @IsString()
  @MinLength(1, { message: ErrorMessage.MIN_LENGTH_1 })
  @MaxLength(512)
  file: string;

  @IsNumber()
  size: number;
}
