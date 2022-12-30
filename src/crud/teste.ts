import { PrismaClient } from "@prisma/client";
import { UserService } from "../user/user.services";

const prisma = new PrismaClient()
const userService = new UserService(prisma)

async function teste () {
    console.log('Create')
    const newUser = await userService.create({email:'teste@email', name:'teste'})
    console.log(newUser)

    console.log('\nFindOne')
    console.log(await userService.findOne(newUser.id))

    console.log('\nFindAll')
    console.log(await userService.findAll())

    console.log('\nUpdate')
    console.log(await userService.update(newUser.id, {name: 'novo nome'}))

    console.log('\nRemove')
    console.log(await userService.remove(newUser.id))
}

teste()