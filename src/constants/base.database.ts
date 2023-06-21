import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique} from "typeorm"
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['id'])
export class BaseDatabase{
    @PrimaryGeneratedColumn('increment')
    @IsNotEmpty()
    id: string;
    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}