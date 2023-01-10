import { Prisma } from "@prisma/client";
import { ValidateModel, BaseModel, CreateArg, UpdateArg, GetOption } from "./types";
export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;
export declare abstract class Crud<Model extends ValidateModel, ModelPayload> {
    private readonly model;
    private readonly defaultOptions;
    constructor(model: BaseModel<Model>, defaultOptions?: GetOption<ModelPayload>);
    create(createArg: CreateArg<Model>): Promise<any>;
    findAll(): Promise<ModelPayload[]>;
    findOne(id: number): Promise<ModelPayload>;
    update(id: number, updateDto: UpdateArg<Model>): Promise<ModelPayload>;
    remove(id: number): Promise<ModelPayload>;
}
//# sourceMappingURL=crud.d.ts.map