import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";

//A options vai precisar ser no <> mesmo, mas também precisar ser no super.
//Pode ter a opção de ser só super se não for usar em outros services
export class PostServices extends Crud<
    Prisma.PostDelegate<RejectOptions>, {}
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post,{});
    }
}
