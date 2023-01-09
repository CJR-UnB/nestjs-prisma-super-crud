import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";

export class PostServices extends Crud<Prisma.PostDelegate<RejectOptions>, {
    customOptions: {findOne: {include: {author: true}}
}}> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post)
    }
}
