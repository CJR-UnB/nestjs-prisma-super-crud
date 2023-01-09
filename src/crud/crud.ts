import { ConflictException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
    CustomOption,
    DefaultOption,
    ValidateModel,
    BaseModel,
    CreateArg,
    UpdateArg,
} from "./types";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;

export abstract class Crud<Model extends ValidateModel> {
    private readonly defaultOptions: DefaultOption<Model>;
    private readonly customOptions: CustomOption<Model>;

    constructor(
        private readonly model: BaseModel<Model>,
        config?: {
            defaultOptions?: DefaultOption<Model>;
            customOptions?: CustomOption<Model>;
        }
    ) {
        if (config?.customOptions) this.customOptions = config.customOptions;
        else this.customOptions = {};

        if (config?.defaultOptions) this.defaultOptions = config.defaultOptions;
        else this.defaultOptions = {};
    }

    async create(createArg: CreateArg<Model>){
        try {
            return await this.model.create({
                ...this.getOption("create"),
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

    async findAll(){
        return await this.model.findMany({
            ...this.getOption("findAll"),
        });
    }

    async findOne(id: number) {
        const instance = await this.model.findUnique({
            ...this.getOption("findOne"),
            where: { id },
        });

        if (!instance) throw new NotFoundException("not found");

        return instance;
    }

    async update(
        id: number,
        updateDto: UpdateArg<Model>
    ){
        return await this.model
            .update({
                ...this.getOption("update"),
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

    async remove(id: number){
        return await this.model
            .delete({
                ...this.getOption("remove"),
                where: { id },
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === "P2025") {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }

    private getOption(method: keyof Crud<Model>) {
        if (this.customOptions[method])
            return this.customOptions[method]

        if (method === "findAll") {
            return <CustomOption<Model>["findAll"]>this.defaultOptions;
        } else if (this.defaultOptions.select)
            return <CustomOption<Model>["create" | "update" | "remove"]>{
                select: this.defaultOptions.select,
            };
        else if (this.defaultOptions.include)
            return <CustomOption<Model>["create" | "update" | "remove"]>{
                include: this.defaultOptions.include,
            };
    }
}
