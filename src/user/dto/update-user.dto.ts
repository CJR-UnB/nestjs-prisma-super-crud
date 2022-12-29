import { UserEntity } from "../entity/user.entity";

export interface UpdateUserDto extends Partial<UserEntity> {}