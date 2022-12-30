import { ConflictException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { BaseEntity, CustomOption, DefaultOption, Model } from "./types";

export abstract class Crud<Entity extends BaseEntity, CreateDto, UpdateDto> {
    private readonly defaultOptions: DefaultOption<
        Entity,
        CreateDto,
        UpdateDto
    >;
    private readonly customOptions: CustomOption<Entity, CreateDto, UpdateDto>;

    constructor(
        private readonly model: Model<Entity, CreateDto, UpdateDto>,
        config?: {
            defaultOptions?: DefaultOption<Entity, CreateDto, UpdateDto>;
            customOptions?: CustomOption<Entity, CreateDto, UpdateDto>;
        }
    ) {
        Object.assign(this, { deafultOptions: {}, customOptions: {} }, config);
    }

    async create(createDto: CreateDto) {
        try {
            return await this.model.create({
                ...(this.customOptions.create
                    ? this.customOptions.create
                    : this.cast("create", this.defaultOptions)),
                data: createDto,
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
            ...(this.customOptions.findAll
                ? this.customOptions.findAll
                : this.cast("findAll", this.defaultOptions)),
        });
    }

    async findOne(id: number) {
        const instance = await this.model.findUnique({
            ...(this.customOptions.findOne
                ? this.customOptions.findOne
                : this.cast("findOne", this.defaultOptions)),
            where: { id } as Partial<Record<keyof Entity, any>>,
        });

        if (!instance) throw new NotFoundException("not found");

        return instance;
    }

    async update(id: number, updateDto: UpdateDto) {
        return await this.model
            .update({
                ...(this.customOptions.update
                    ? this.customOptions.update
                    : this.cast("update", this.defaultOptions)),
                data: updateDto,
                where: { id } as Partial<Record<keyof Entity, any>>,
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
                ...(this.customOptions.remove
                    ? this.customOptions.remove
                    : this.cast("remove", this.defaultOptions)),
                where: { id } as Partial<Record<keyof Entity, any>>,
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === "P2025") {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }

    private cast(
        method: keyof Crud<Entity, CreateDto, UpdateDto>,
        option: DefaultOption<Entity, CreateDto, UpdateDto>
    ) {
        type AuxCustomOption = CustomOption<Entity, CreateDto, UpdateDto>;

        if (["create", "update", "remove"].includes(method))
            return <AuxCustomOption["create" | "update" | "remove"]>{
                select: option.select,
            };
        if (method === "findOne")
            return <AuxCustomOption["findOne"]>{
                select: option.select,
                include: option.include,
            };
        if (method === "findAll") {
            const { data: _, ...castedOption } = { ...option };
            return <AuxCustomOption["findAll"]>castedOption;
        }
    }
}
