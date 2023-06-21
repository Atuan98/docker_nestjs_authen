import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer'

export class RegisterDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Expose()
    name?: string;

    @Expose()
    @ApiProperty()
    @IsString()
    email: string;

    @Expose()
    @ApiProperty()
    @IsString()
    password: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    admin?: boolean
}