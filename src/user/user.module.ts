import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthHelper } from 'src/auth/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService, RoleService],
})
export class UserModule {}
