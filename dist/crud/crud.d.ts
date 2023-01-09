import { Prisma } from "@prisma/client";
import { CustomOption, DefaultOption, ValidateModel, BaseModel, CreateArg, UpdateArg } from "./types";
export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;
export declare abstract class Crud<Model extends ValidateModel> {
    private readonly model;
    private readonly defaultOptions;
    private readonly customOptions;
    constructor(model: BaseModel<Model>, config?: {
        defaultOptions?: DefaultOption<Model>;
        customOptions?: CustomOption<Model>;
    });
    create(createArg: CreateArg<Model>): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: UpdateArg<Model>): Promise<any>;
    remove(id: number): Promise<any>;
    private getOption;
}
//# sourceMappingURL=crud.d.ts.map