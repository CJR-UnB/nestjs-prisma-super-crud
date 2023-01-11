import { Prisma, PrismaClient, User } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";

export class UserServices extends Crud<
    Prisma.UserDelegate<RejectOptions>,
    Prisma.UserGetPayload<{}>
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.user);
    }
}
