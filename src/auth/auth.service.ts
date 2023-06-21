import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { AppDataSource } from 'db/data-source';

const userRepository = AppDataSource.getRepository(User)
@Injectable()
export class AuthService {

  constructor(
    private readonly helper: AuthHelper
  ){}

  public async login(body: LoginDto): Promise<any> {
    const { email, password }: LoginDto = body;
    const user: User = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const compareSync = this.helper.isPasswordValid(password, user.password);
    if (!compareSync) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    userRepository.update(user.id, { lastloginat: new Date() });

    return await this.helper.generateToken(user);
    
  }

  public async refresh(user: User): Promise<any> {
    const userFind: User = await userRepository.findOneBy({id: user.id, email: user.email})
    if (!userFind){
      throw new HttpException("Not found user", HttpStatus.NOT_FOUND)
    }
    const token = await this.helper.generateToken(user)
    await userRepository.update({id: user.id, email: user.email, refresh_token: user.refresh_token}, {lastloginat: new Date(), refresh_token: token.refresh_token})
    return token;
  }

  public logout(user: User): Promise<any>{
    return this.helper.logOut(user)
  }
}