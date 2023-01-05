"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const crud_1 = require("../crud/crud");
class UserServices extends crud_1.Crud {
    constructor(prisma) {
        super(prisma.user);
        this.prisma = prisma;
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=user.services.js.map