import { Prisma, PrismaClient } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";
import { CrudOption } from "../crud/types";

type PostModel = Prisma.PostDelegate<RejectOptions>;
const defaultOptions = new CrudOption<PostModel>().setOption({
    select: { authorId: true },
});


export class PostServices extends Crud<
    PostModel,
    Prisma.PostGetPayload<typeof defaultOptions>
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post, defaultOptions);
    }

    async teste() {
        const post = await super.create({content:'a', title:'a', authorId:1})
        console.log(post.authorId)
    }
}
