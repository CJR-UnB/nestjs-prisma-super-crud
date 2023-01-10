"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
class Crud {
    constructor(model, defaultOptions) {
        this.model = model;
        this.defaultOptions = defaultOptions ? defaultOptions : {};
    }
    async create(createArg) {
        try {
            return await this.model.create(Object.assign(Object.assign({}, this.defaultOptions), { data: createArg }));
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new common_1.ConflictException(`Unique constraint failed on the ${error.meta.target}`);
            }
        }
    }
    async findAll() {
        return await this.model.findMany(Object.assign({}, this.defaultOptions));
    }
    async findOne(id) {
        const instance = await this.model.findUnique(Object.assign(Object.assign({}, this.defaultOptions), { where: { id } }));
        if (!instance)
            throw new common_1.NotFoundException("not found");
        return instance;
    }
    async update(id, updateDto) {
        return await this.model
            .update(Object.assign(Object.assign({}, this.defaultOptions), { data: updateDto, where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
    async remove(id) {
        return await this.model
            .delete(Object.assign(Object.assign({}, this.defaultOptions), { where: { id } }))
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(error.meta.cause);
                }
        });
    }
}
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map