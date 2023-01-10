import { Prisma, PrismaClient } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";
export declare class PostServices extends Crud<Prisma.PostDelegate<RejectOptions>, Prisma.PostGetPayload<true>> {
    protected readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient);
}
//# sourceMappingURL=post.services.d.ts.map