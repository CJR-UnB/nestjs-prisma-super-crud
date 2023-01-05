import { Prisma, User } from "@prisma/client"
import { RejectOptions } from "../../crud/types";

export class UserEntity implements User {
    id: number;
    email: string;
    name: string;
}