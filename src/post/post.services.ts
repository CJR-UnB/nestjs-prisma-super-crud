import { Prisma, PrismaClient } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";

export class PostServices extends Crud<
    Prisma.PostDelegate<RejectOptions>,
    Prisma.PostGetPayload<true>
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post);
    }
}
