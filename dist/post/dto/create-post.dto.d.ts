import { PostEntity } from "../entity/post.entity";
export interface CreatePostDto extends Pick<PostEntity, "title" | "content" | "authorId"> {
}
//# sourceMappingURL=create-post.dto.d.ts.map