import { UserEntity } from "../entity/user.entity";

export interface CreateUserDto extends Pick<UserEntity, "email" | "name"> {}