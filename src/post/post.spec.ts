import { PostServices } from "./post.services";
import {prismaInstance} from "../prisma/prisma-instance"

const postServices = new PostServices(prismaInstance)

async function teste () {
    console.log('Create')
    const newPost = await postServices.create({title: 'title', content: 'content', authorId: 1})
    console.log(newPost)

    console.log('\nFindOne')
    console.log(await postServices.findOne(newPost.id))
    const a = await postServices.findOne(newPost.id)

    
    console.log('\nFindAll')
    console.log(await postServices.findAll())

    console.log('\nUpdate')
    console.log(await postServices.update(newPost.id, {content: 'new content'}))

    console.log('\nRemove')
    console.log(await postServices.remove(newPost.id))
}

teste()