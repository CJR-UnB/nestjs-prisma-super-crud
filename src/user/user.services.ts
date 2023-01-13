import { Prisma, PrismaClient } from "@prisma/client";
import { CrudOptions, RejectOptions } from "../index";

type UserModel = Prisma.UserDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<UserModel>().setOptions({
    select: { id: true, name: true },
});

export class UserServices extends getCrud<
    Prisma.UserGetPayload<typeof defaultOptions>
>() {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.user, defaultOptions);
    }
}
