import { PostEntity } from "../entity/post.entity";

export interface UpdatePostDto extends Pick<PostEntity, "content" | "title"> {}
