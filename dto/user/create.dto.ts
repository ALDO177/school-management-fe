import { UserRole } from "@entity/Users";
import { hash } from "bcrypt";
import { IsDefined, IsIn, IsNotEmpty, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate } from "typeorm";

export class UserCreateDto{

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username?: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password?: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsIn([UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER])
    role?: UserRole;

    constructor(body: Record<string, string>){
        Object.assign(this, body);
    }
}