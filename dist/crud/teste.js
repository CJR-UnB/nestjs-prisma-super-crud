"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const user_services_1 = require("../user/user.services");
const prisma = new client_1.PrismaClient();
const userService = new user_services_1.UserService(prisma);
async function teste() {
    console.log('Create');
    const newUser = await userService.create({ email: 'teste@email', name: 'teste' });
    console.log(newUser);
    console.log('\nFindOne');
    console.log(await userService.findOne(newUser.id));
    console.log('\nFindAll');
    console.log(await userService.findAll());
    console.log('\nUpdate');
    console.log(await userService.update(newUser.id, { name: 'novo nome' }));
    console.log('\nRemove');
    console.log(await userService.remove(newUser.id));
}
teste();
//# sourceMappingURL=teste.js.map