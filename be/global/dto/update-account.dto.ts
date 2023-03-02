import { IsEnum } from 'class-validator';
import { EIsDelete } from 'enum';
import { EDepartment, EUserRole } from 'enum/default.enum';

export class VUpdateAccount {
  @IsEnum(EUserRole)
  role_id: EUserRole;

  @IsEnum(EDepartment)
  department_id: EDepartment;

  @IsEnum(EIsDelete)
  is_deleted: EIsDelete;
}
