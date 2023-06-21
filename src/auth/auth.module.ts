import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, JwtStrategyRT } from './jwt.auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleService } from 'src/role/role.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const envConfig = dotenv.parse(fs.readFileSync('.env'))

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envConfig.SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthHelper, JwtStrategyRT, RoleService],
  exports: [AuthService, AuthHelper, RoleService]
})
export class AuthenticationModule { }
