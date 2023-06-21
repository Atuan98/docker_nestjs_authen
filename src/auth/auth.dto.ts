import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer'

export class LoginDto{

    @Expose()
    @ApiProperty()
    @IsString()
    email: string;

    @Expose()
    @ApiProperty()
    @IsString()
    password: string;
}