import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidateModel, CreateArg, UpdateArg, ModelOptions } from "./types";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;

export abstract class Crud<
    Model extends ValidateModel,
    ModelPayload,
    DefaultOptions
> {
    constructor(
        private readonly model: Model,
        protected readonly defaultOptions: DefaultOptions
    ) {}

    async create(createArg: CreateArg<Model>): Promise<ModelPayload> {
        return await this.model
            .create({
                ...this.defaultOptions,
                data: createArg,
            })
            .catch(this.handleError);
    }

    async findAll(): Promise<ModelPayload[]> {
        return await this.model.findMany({
            ...this.defaultOptions,
        });
    }

    async findOne(id: number): Promise<ModelPayload> {
        const instance = await this.model.findUnique({
            ...this.defaultOptions,
            where: { id },
        });

        if (!instance) throw new NotFoundException("not found");

        return instance;
    }

    async update(
        id: number,
        updateDto: UpdateArg<Model>
    ): Promise<ModelPayload> {
        return await this.model
            .update({
                ...this.defaultOptions,
                data: updateDto,
                where: { id },
            })
            .catch(this.handleError);
    }

    async remove(id: number): Promise<ModelPayload> {
        return await this.model
            .delete({
                ...this.defaultOptions,
                where: { id },
            })
            .catch(this.handleError);
    }

    private handleError(error: unknown) {
        if (error instanceof PrismaClientValidationError) {
            throw new BadRequestException(
                "Fields in the provided data are missing or incorrect"
            );
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                throw new NotFoundException(error.meta.cause);

            if (error.code === "P2002")
                throw new ConflictException(
                    `Unique constraint failed on the ${error.meta.target}`
                );
        }
        throw new InternalServerErrorException();
    }
}

export class CrudOptions<Model extends ValidateModel> {
    public setOptions<DefaultOptions extends ModelOptions<Model> | {}>(
        defaultOptions: DefaultOptions
    ) {
        return {
            defaultOptions,
            getCrud: function getCrud<ModelPayload>() {
                return Crud<Model, ModelPayload, DefaultOptions>;
            },
        };
    }
}
