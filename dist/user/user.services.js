"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crud_1 = require("../crud/crud");
class UserService extends crud_1.Crud {
    constructor(prisma) {
        super(prisma.user, {
            defaultOptions: { data: { name: 'a' } }
        });
        this.prisma = prisma;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map