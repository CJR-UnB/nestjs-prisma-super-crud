import { Prisma, PrismaClient } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";
import { CrudOptions } from "../crud/types";

type PostModel = Prisma.PostDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<PostModel>().setOption({
    select: { authorId: true },
});

export class PostServices extends Crud<
    PostModel,
    Prisma.PostGetPayload<typeof defaultOptions>
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post, defaultOptions);
    }
}
