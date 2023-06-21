import { AuthGuard } from '@nestjs/passport';
import { Injectable} from '@nestjs/common';

@Injectable()
export class JwtAuthGuardRT extends AuthGuard('jwt-refresh') {}