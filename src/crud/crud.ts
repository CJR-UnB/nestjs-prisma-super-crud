import { ConflictException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
    CustomOption,
    DefaultOption,
    ValidateModel,
    BaseModel,
    CreateArg,
    UpdateArg,
    Return,
} from "./types";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;

export abstract class Crud<Model extends ValidateModel> {
    private readonly defaultOptions: DefaultOption<Model> = {};
    private readonly customOptions: CustomOption<Model> = {};

    constructor(
        private readonly model: BaseModel<Model>,
        config?: {
            defaultOptions?: DefaultOption<Model>;
            customOptions?: CustomOption<Model>;
        }
    ) {
        if (config?.customOptions) this.customOptions = config.customOptions;
        if (config?.defaultOptions) this.defaultOptions = config.defaultOptions;
    }

    async create(createArg: CreateArg<Model>): Return<Model>["create"] {
        try {
            return await this.model.create({
                ...(this.customOptions.create
                    ? this.customOptions.create
                    : this.cast("create", this.defaultOptions)),
                data: createArg,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new ConflictException(
                        `Unique constraint failed on the ${error.meta.target}`
                    );
            }
        }
    }

    async findAll(): Return<Model>["findAll"] {
        return await this.model.findMany({
            ...(this.customOptions.findAll
                ? this.customOptions.findAll
                : this.cast("findAll", this.defaultOptions)),
        });
    }

    async findOne(id: number): Return<Model>["findOne"] {
        const instance = await this.model.findUnique({
            ...(this.customOptions.findOne
                ? this.customOptions.findOne
                : this.cast("findOne", this.defaultOptions)),
            where: { id },
        });

        if (!instance) throw new NotFoundException("not found");

        return instance;
    }

    async update(id: number, updateDto: UpdateArg<Model>): Return<Model>["update"] {
        return await this.model
            .update({
                ...(this.customOptions.update
                    ? this.customOptions.update
                    : this.cast("update", this.defaultOptions)),
                data: updateDto,
                where: { id },
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === "P2025") {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }

    async remove(id: number): Return<Model>["remove"] {
        return await this.model
            .delete({
                ...(this.customOptions.remove
                    ? this.customOptions.remove
                    : this.cast("remove", this.defaultOptions)),
                where: { id },
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === "P2025") {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }

    private cast(method: keyof Crud<Model>, option: DefaultOption<Model>) {    
        if (method === "findAll") {
            return <CustomOption<Model>["findAll"]>option;
        }
        else
            if (option.select)
                return <CustomOption<Model>["create" | "update" | "remove"]>{
                    select: option.select,
                };
            else if (option.include)
                return <CustomOption<Model>["create" | "update" | "remove"]>{
                    include: option.include,
                };
    }
}
