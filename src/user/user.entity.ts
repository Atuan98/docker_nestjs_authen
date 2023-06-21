import { Entity, Column} from "typeorm"
import { IsEmail, IsNotEmpty} from 'class-validator';
import { BaseDatabase } from "src/constants/base.database";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseDatabase{

    @Column({
        nullable: true
    })
    name: string;

    @Column()
    @IsEmail()
    email: string;

    
    @Column()
    @IsNotEmpty()
    @Exclude()
    password: string;

    @Column(
        {
            default: false,
        }
    )
    admin: boolean;

    @Column('text',{
        nullable: true
    })
    refresh_token: string;

    @Column('timestamp',{
        nullable: true, 
        default: null,
    })
    lastloginat: Date | null;
}