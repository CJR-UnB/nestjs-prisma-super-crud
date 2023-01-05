"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
class Crud {
    constructor(model, config) {
        this.model = model;
        this.defaultOptions = {};
        this.customOptions = {};
        if (config === null || config === void 0 ? void 0 : config.customOptions)
            this.customOptions = config.customOptions;
        if (config === null || config === void 0 ? void 0 : config.defaultOptions)
            this.defaultOptions = config.defaultOptions;
    }
    async create(createArg) {
        try {
            return await this.model.create(Object.assign(Object.assign({}, (this.customOptions.create
                ? this.customOptions.create
                : this.cast("create", this.defaultOptions))), { data: createArg }));
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new common_1.ConflictException(`Unique constraint failed on the ${error.meta.target}`);
            }
        }
    }
    async findAll() {
        return await this.model.findMany(Object.assign({}, (this.customOptions.findAll
            ? this.customOptions.findAll
            : this.cast("findAll", this.defaultOptions))));
    }
    async findOne(id) {
        const instance = await this.model.findUnique(Object.assign(Object.assign({}, (this.customOptions.findOne
            ? this.customOptions.findOne
            : this.cast("findOne", this.defaultOptions))), { where: { id } }));
        if (!instance)
            throw new common_1.NotFoundException("not found");
        return instance;
    }
    async update(id, updateDto) {
        return await this.model
            .update(Object.assign(Object.assign({}, (this.customOptions.update
            ? this.customOptions.update
            : this.cast("update", this.defaultOptions))), { data: updateDto, where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
    async remove(id) {
        return await this.model
            .delete(Object.assign(Object.assign({}, (this.customOptions.remove
            ? this.customOptions.remove
            : this.cast("remove", this.defaultOptions))), { where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
    cast(method, option) {
        if (method === "findAll") {
            return option;
        }
        else if (option.select)
            return {
                select: option.select,
            };
        else if (option.include)
            return {
                include: option.include,
            };
    }
}
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map