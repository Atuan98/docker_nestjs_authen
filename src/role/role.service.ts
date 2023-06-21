import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";

@Injectable()
export class RoleService{
    public async matchRole(role: String[], user: User):Promise<boolean>{
        const user_role : string = (user.admin === true? 'admin':'user')
        const result = (role.includes(user_role)? true : false)
        return result
    }
}