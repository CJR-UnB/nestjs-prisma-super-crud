import { Prisma, PrismaClient } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";
export declare class UserServices extends Crud<Prisma.UserDelegate<RejectOptions>, Prisma.UserGetPayload<true>> {
    protected readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient);
}
//# sourceMappingURL=user.services.d.ts.map