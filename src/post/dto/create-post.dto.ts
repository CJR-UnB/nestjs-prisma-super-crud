import { PostEntity } from "../entity/post.entity";

export interface CreatePostDto
    extends Pick<PostEntity, "title" | "content" | "userId"> {}
