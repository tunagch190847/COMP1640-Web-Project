import { IsNotEmpty, IsString } from 'class-validator';

// const path = new RegExp(regex);

export class VUploadBody {
  @IsString()
  @IsNotEmpty()
  //   @Matches(path, {
  //     message: ErrorMessage.INVALID_QUERY,
  //   })
  type: string;
}
