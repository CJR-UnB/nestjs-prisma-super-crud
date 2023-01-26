import { Prisma, PrismaClient } from "@prisma/client";
import { CrudOptions, RejectOptions } from "../index";

type PostModel = Prisma.PostDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<PostModel>().setOptions({
    select: { id: true, title: true },
});

export class PostServices extends getCrud<
    Prisma.PostGetPayload<typeof defaultOptions>
>() {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.post, defaultOptions);
    }
}
