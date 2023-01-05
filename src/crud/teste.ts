import { PrismaClient } from "@prisma/client";
import { UserServices } from "../user/user.services";

const prisma = new PrismaClient()
const userServices = new UserServices(prisma)

async function teste () {
    console.log('Create')
    const newUser = await userServices.create({email:'teste@email', name:'teste'})
    console.log(newUser)

    console.log('\nFindOne')
    console.log(await userServices.findOne(newUser.id))

    console.log('\nFindAll')
    console.log(await userServices.findAll())

    console.log('\nUpdate')
    console.log(await userServices.update(newUser.id, {name: 'novo nome'}))

    console.log('\nRemove')
    console.log(await userServices.remove(newUser.id))
}

teste()