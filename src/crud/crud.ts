import { ConflictException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
    DefaultOption,
    ValidateModel,
    BaseModel,
    CreateArg,
    UpdateArg,
} from "./types";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;

export abstract class Crud<
    Model extends ValidateModel,
    Option extends DefaultOption<Model> = {}
> {
    constructor(
        private readonly model: BaseModel<Model>,
        private readonly defaultOptions: Option
    ) {}

    async create(createArg: CreateArg<Model>) {
        try {
            return await this.model.create({
                ...this.defaultOptions,
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

    async findAll() {
        return await this.model.findMany({
            ...this.defaultOptions,
        });
    }

    async findOne(id: number) {
        const instance = await this.model.findUnique({
            ...this.defaultOptions,
            where: { id },
        });

        if (!instance) throw new NotFoundException("not found");

        return instance;
    }

    async update(id: number, updateDto: UpdateArg<Model>) {
        return await this.model
            .update({
                ...this.defaultOptions,
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

    async remove(id: number) {
        return await this.model
            .delete({
                ...this.defaultOptions,
                where: { id },
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === "P2025") {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }
}
