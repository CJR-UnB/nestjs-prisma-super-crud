import { Post } from "@prisma/client";

export class PostEntity implements Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}