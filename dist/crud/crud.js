"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
class Crud {
    constructor(model, config) {
        this.model = model;
        Object.assign(this, { deafultOptions: {}, customOptions: {} }, config);
    }
    async create(createDto) {
        try {
            return await this.model.create(Object.assign(Object.assign({}, (this.customOptions.create
                ? this.customOptions.create
                : this.cast("create", this.defaultOptions))), { data: createDto }));
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
        if (["create", "update", "remove"].includes(method))
            return {
                select: option.select,
            };
        if (method === "findOne")
            return {
                select: option.select,
                include: option.include,
            };
        if (method === "findAll") {
            const _a = Object.assign({}, option), { data: _ } = _a, castedOption = __rest(_a, ["data"]);
            return castedOption;
        }
    }
}
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map