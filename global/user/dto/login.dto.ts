import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VLogin {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string | null;

  @IsOptional()
  @IsString()
  access_token: string | null;
}
