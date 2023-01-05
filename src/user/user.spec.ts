import { UserServices } from "./user.services";
import {prismaInstance} from "../prisma/prisma-instance"

const userService = new UserServices(prismaInstance)

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