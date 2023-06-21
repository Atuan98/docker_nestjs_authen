import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/auth_access_token.guard';

@Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector,
//     private readonly roleservice: RoleService
//     ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     console.log(user)
//     return await this.roleservice.matchRole(roles, user)
//   }
// }
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly roleservice: RoleService
  ) { super()}

   async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return await this.roleservice.matchRole(roles, user)
  }
}