"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const crud_1 = require("../crud/crud");
class PostServices extends crud_1.Crud {
    constructor(prisma) {
        super(prisma.post);
        this.prisma = prisma;
    }
}
exports.PostServices = PostServices;
//# sourceMappingURL=post.services.js.map