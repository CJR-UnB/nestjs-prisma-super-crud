import { PrismaClient } from "@prisma/client";
import { Crud } from "../crud";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entity/user.entity";

export class UserService extends Crud<UserEntity, CreateUserDto, UpdateUserDto>{
    constructor(private readonly prisma: PrismaClient) {
        super(prisma.user);
    }
}