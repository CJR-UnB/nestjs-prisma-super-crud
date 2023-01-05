import { Prisma, PrismaClient } from "@prisma/client";
import { Crud } from "../crud/crud";
import { RejectOptions } from "../crud/types";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entity/user.entity";

export class UserService extends Crud<Prisma.UserDelegate<RejectOptions>>{
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.user, {});
    }

    async teste () {
        
    }
}