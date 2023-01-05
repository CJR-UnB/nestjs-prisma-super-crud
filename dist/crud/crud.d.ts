import { Prisma } from "@prisma/client";
import { CustomOption, DefaultOption, ValidateModel, BaseModel, CreateArg, UpdateArg, Return } from "./types";
export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;
export declare abstract class Crud<Model extends ValidateModel> {
    private readonly model;
    private readonly defaultOptions;
    private readonly customOptions;
    constructor(model: BaseModel<Model>, config?: {
        defaultOptions?: DefaultOption<Model>;
        customOptions?: CustomOption<Model>;
    });
    create(createArg: CreateArg<Model>): Return<Model>["create"];
    findAll(): Return<Model>["findAll"];
    findOne(id: number): Return<Model>["findOne"];
    update(id: number, updateDto: UpdateArg<Model>): Return<Model>["update"];
    remove(id: number): Return<Model>["remove"];
    private cast;
}
//# sourceMappingURL=crud.d.ts.map