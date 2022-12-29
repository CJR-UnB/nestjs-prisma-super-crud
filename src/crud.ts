import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseEntity, CustomOption, DefaultOption, Model } from './types';

export abstract class Crud<Entity extends BaseEntity, CreateDto, UpdateDto> {
    constructor(
        private readonly model: Model<Entity, CreateDto, UpdateDto>,
        private readonly config: {
            defaultOptions: DefaultOption<Entity, CreateDto, UpdateDto>;
            customOptions: CustomOption<Entity, CreateDto, UpdateDto>;
        } = {defaultOptions: {}, customOptions: {}},
    ) {}

    async create(createDto: CreateDto) {
        try {
            return await this.model.create({
                ...(this.config.customOptions.create
                    ? this.config.customOptions.create
                    : this.config.defaultOptions),
                data: createDto,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new ConflictException(
                        `Unique constraint failed on the ${error.meta.target}`,
                    );
            }
        }
    }

    async findAll() {
        return await this.model.findMany({
            ...(this.config.customOptions.findAll
                ? this.config.customOptions.findAll
                : this.config.defaultOptions),
        });
    }

    async findOne(id: number) {
        const instance = await this.model.findUnique({
            ...(this.config.customOptions.findOne
                ? this.config.customOptions.findOne
                : this.config.defaultOptions),
            where: { id } as Partial<Record<keyof Entity, any>>,
        });

        if (!instance) throw new NotFoundException('not found');

        return instance;
    }

    async update(id: number, updateDto: UpdateDto) {
        return await this.model
            .update({
                ...(this.config.customOptions.update
                    ? this.config.customOptions.update
                    : this.config.defaultOptions),
                data: updateDto,
                where: { id } as Partial<Record<keyof Entity, any>>,
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === 'P2025') {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }

    async remove(id: number) {
        return await this.model
            .delete({
                ...(this.config.customOptions.remove
                    ? this.config.customOptions.remove
                    : this.config.defaultOptions),
                where: { id } as Partial<Record<keyof Entity, any>>,
            })
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError)
                    if (error.code === 'P2025') {
                        throw new NotFoundException(error.meta.cause);
                    }
            });
    }
}
