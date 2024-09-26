// src/jwt/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/common/group/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
