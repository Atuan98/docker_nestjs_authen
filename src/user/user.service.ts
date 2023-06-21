import { Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { User } from '../user/user.entity';
import { AppDataSource } from 'db/data-source';
import { RegisterDto } from './user.dto';
import { AuthHelper } from 'src/auth/auth.helper';

const userRepository = AppDataSource.getRepository(User)
@Injectable()
export class UserService {
    constructor(
        private readonly helper: AuthHelper
    ){}

    public async register(body: RegisterDto) {
        const user  = await userRepository.findOneBy({
            email: body.email
        })
        if (user){
            throw new HttpException('Conflict', HttpStatus.CONFLICT)
        }
        const pwGen = this.helper.encodePassword(body.password)
        body.password = pwGen
        return await userRepository.save(body)
    }

    async getAllUser() {
        return await userRepository.find()
    }

}