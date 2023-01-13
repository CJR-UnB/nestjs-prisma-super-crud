import { Prisma, PrismaClient, User } from "@prisma/client";
import { Crud, RejectOptions } from "../crud/crud";
import { CrudOptions } from "../crud/types";

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOption({
    select: { name: true }
});

export class UserServices extends Crud<
    UserModel,
    Prisma.UserGetPayload<typeof defaultOptions>
> {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.user, defaultOptions);
    }
}
