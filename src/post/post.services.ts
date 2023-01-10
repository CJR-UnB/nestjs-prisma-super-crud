import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";

//A options vai precisar ser no <> mesmo, mas também precisar ser no super.
//Pode ter a opção de ser só super se não for usar em outros services
export class PostServices extends Crud<
    Prisma.PostDelegate<RejectOptions>, {select:{authorId:true}}
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post, {
            select: {
                authorId: true
            }
        });
    }
}
