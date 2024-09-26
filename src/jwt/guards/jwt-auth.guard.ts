// src/jwt/guards/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from 'src/common/group/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLES[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return super.canActivate(context) as boolean; // If no roles are specified, just check JWT
    }

    const request = context.switchToHttp().getRequest();
    // console.log(request)
    const user = request.user; // Assuming user is attached to request by JWT strategy

    console.log(user)

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Check if the user's role is in the allowed roles
    const hasRole = () => roles.includes(user.role as ROLES); // Ensure to cast user.role to ROLES
    if (user && user.role && hasRole()) {
        console.log("masuk sini pak")
      return true; // If the user has the required role, grant access
    }

    throw new ForbiddenException('You do not have permission to access this resource');
  }
}
