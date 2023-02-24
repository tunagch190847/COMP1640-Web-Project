import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'enum/default.enum';

export const ROLE_KEYS = 'roles';
export const Roles = (...roles: EUserRole[]) => SetMetadata(ROLE_KEYS, roles);
