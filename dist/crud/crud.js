"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
class Crud {
    constructor(model, config) {
        this.model = model;
        if (config === null || config === void 0 ? void 0 : config.customOptions)
            this.customOptions = config.customOptions;
        else
            this.customOptions = {};
        if (config === null || config === void 0 ? void 0 : config.defaultOptions)
            this.defaultOptions = config.defaultOptions;
        else
            this.defaultOptions = {};
    }
    async create(createArg) {
        try {
            return await this.model.create(Object.assign(Object.assign({}, this.getOption("create")), { data: createArg }));
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new common_1.ConflictException(`Unique constraint failed on the ${error.meta.target}`);
            }
        }
    }
    async findAll() {
        return await this.model.findMany(Object.assign({}, this.getOption("findAll")));
    }
    async findOne(id) {
        const instance = await this.model.findUnique(Object.assign(Object.assign({}, this.getOption("findOne")), { where: { id } }));
        if (!instance)
            throw new common_1.NotFoundException("not found");
        return instance;
    }
    async update(id, updateDto) {
        return await this.model
            .update(Object.assign(Object.assign({}, this.getOption("update")), { data: updateDto, where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
    async remove(id) {
        return await this.model
            .delete(Object.assign(Object.assign({}, this.getOption("remove")), { where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
    getOption(method) {
        if (this.customOptions[method])
            return this.customOptions[method];
        if (method === "findAll") {
            return this.defaultOptions;
        }
        else if (this.defaultOptions.select)
            return {
                select: this.defaultOptions.select,
            };
        else if (this.defaultOptions.include)
            return {
                include: this.defaultOptions.include,
            };
    }
}
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map