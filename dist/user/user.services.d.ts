import { PrismaClient } from "@prisma/client";
import { Crud } from "../crud/crud";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entity/user.entity";
export declare class UserService extends Crud<UserEntity, CreateUserDto, UpdateUserDto> {
    protected readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient);
}
//# sourceMappingURL=user.services.d.ts.map