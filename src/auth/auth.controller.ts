import { Body, Controller, Inject, Post, UseGuards, Req, Get } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { LoginDto } from './auth.dto';
import { JwtAuthGuard } from './auth_access_token.guard';
import { JwtAuthGuardRT } from './auth_refresh_token.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Get('refresh')
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuardRT)
  private refresh(@Req() {user}: Request): Promise<string>{
    return this.service.refresh(<User>user)
  }

  @Get('logout')
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  private logout(@Req() { user }: Request){
    return this.service.logout(<User>user)
  }
}