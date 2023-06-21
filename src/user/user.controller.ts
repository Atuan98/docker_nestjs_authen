import { Body, Controller, Post, ClassSerializerInterceptor, 
  UseInterceptors, UseGuards, Get} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/auth/auth_access_token.guard';
import { RegisterDto } from 'src/user/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('users')
@Controller('')
export class UserController {
  constructor(
    private readonly userServ: UserService
  ){}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  private async register(@Body() body: RegisterDto) {
    return await this.userServ.register(body)
  }

  @Get('users')
  @Roles(Role.Admin)
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getallUsers(){
    return this.userServ.getAllUser()
  }
}