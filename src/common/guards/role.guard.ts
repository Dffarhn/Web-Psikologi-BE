// src/jwt/guards/roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES } from 'src/common/group/role.enum';
import { ROLES_KEY } from 'src/jwt/decorators/role.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Get the required roles from the route metadata
      const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // If no roles are defined, allow access
      if (!requiredRoles) {
        return true;
      }
  
      // Get the user from the request
      const { user } = context.switchToHttp().getRequest();
  
      // Check if the user's role is one of the required roles
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied: insufficient permissions');
      }
  
      return true;
    }
  }
  