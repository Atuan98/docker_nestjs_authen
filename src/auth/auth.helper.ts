import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'db/data-source';
import { Not, IsNull } from 'typeorm';
const userRepository = AppDataSource.getRepository(User)
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const envConfig = dotenv.parse(fs.readFileSync('.env'))

@Injectable()
export class AuthHelper {

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return userRepository.findOneBy({
      id: decoded.id
    });
  }

  public generateRefreshToken(payload:any){
    return this.jwt.signAsync(payload, {
      secret: envConfig.REFRESH_KEY,
      expiresIn: 2592000
    })
  }
  public async insertRefreshToken(refresh_token: string, payload: any){
    return await userRepository.update({id: payload.id}, {refresh_token: refresh_token})
  }
  // Generate JWT Token
  public async generateToken(user: User){
    const payload = { id: user.id, email: user.email , admin: user.admin}
    const refresh_token = await this.generateRefreshToken(payload)
    this.insertRefreshToken(refresh_token, payload)
    return{
      access_token: this.jwt.sign(payload),
      refresh_token: refresh_token
    };
  }

  public async logOut(user:User): Promise<any>{
    const userFind = await userRepository.findOneBy(
      {
        email: user.email,
      }
    )
    if (!userFind){
      throw new HttpException("No user", HttpStatus.NOT_FOUND)
    }
    this.generateToken(user)
    return await userRepository.update({id: user.id, refresh_token: Not(IsNull()) }, {refresh_token: null})
  }
  // Validate User's password
  public isPasswordValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async validateRefreshToken(payload: any){
    const token = await this.generateToken(payload)
    const refresh_token = token.refresh_token
    return {
      ...payload,
      refresh_token
    };
  }
  // Validate JWT Token, throw forbidden error if JWT Token is invalid
}