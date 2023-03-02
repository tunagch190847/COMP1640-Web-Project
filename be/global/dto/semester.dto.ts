import { IsDateString, IsString } from 'class-validator';

export class VUpdateSemesterDto {
  @IsString()
  name: string;

  @IsDateString()
  first_closure_date: Date;

  @IsDateString()
  final_closure_date: Date;
}
