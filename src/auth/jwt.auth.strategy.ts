import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { User } from 'src/user/user.entity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const envConfig = dotenv.parse(fs.readFileSync('.env'))

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly helper: AuthHelper
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<User | never> {
    return this.helper.validateUser(payload);
  }
}

@Injectable()
export class JwtStrategyRT extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly helper: AuthHelper
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.REFRESH_KEY,
    });
  }

  async validate(payload: any): Promise<User | never> {
    return this.helper.validateRefreshToken(payload);
  }
}