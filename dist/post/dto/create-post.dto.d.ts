import { PostEntity } from "../entity/post.entity";
export interface CreatePostDto extends Pick<PostEntity, "title" | "content" | "userId"> {
}
//# sourceMappingURL=create-post.dto.d.ts.map