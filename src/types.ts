export interface BaseEntity {
    id: number;
}

type Option<Entity, CreateDto, UpdateDto> = {
    data: CreateDto | UpdateDto;
    where: Partial<Record<keyof Entity, any>>;
    select: Partial<Record<keyof Entity, any>>;
    orderBy: Partial<Record<keyof Entity, 'asc' | 'desc'>>[];
    include: Partial<Record<keyof Entity, any>>;
    skip: number;
    take: number;
};

export type DefaultOption<Entity, CreateDto, UpdateDto> = Partial<
    Pick<Option<Entity, CreateDto, UpdateDto>, 'select'>
>;

type createOption<Entity, CreateDto, UpdateDto> =
    | Pick<Option<Entity, CreateDto, UpdateDto>, 'data'>
    | Partial<Pick<Option<Entity, CreateDto, UpdateDto>, 'select'>>;
type findAllOption<Entity, CreateDto, UpdateDto> =
    | Partial<Omit<Option<Entity, CreateDto, UpdateDto>, 'data'>>
    | Pick<Option<Entity, CreateDto, UpdateDto>, 'where'>;
type findOneOption<Entity, CreateDto, UpdateDto> =
    | Pick<Option<Entity, CreateDto, UpdateDto>, 'where'>
    | Partial<Pick<Option<Entity, CreateDto, UpdateDto>, 'select' | 'include'>>;
type updateOption<Entity, CreateDto, UpdateDto> =
    | Pick<Option<Entity, CreateDto, UpdateDto>, 'data' | 'where'>
    | Partial<Pick<Option<Entity, CreateDto, UpdateDto>, 'select'>>;
type remove<Entity, CreateDto, UpdateDto> =
    | Pick<Option<Entity, CreateDto, UpdateDto>, 'where'>
    | Partial<Pick<Option<Entity, CreateDto, UpdateDto>, 'select'>>;

export interface Model<Entity extends BaseEntity, CreateDto, UpdateDto> {
    create(options: createOption<Entity, CreateDto, UpdateDto>): Promise<any>;
    findMany(
        options: findAllOption<Entity, CreateDto, UpdateDto>,
    ): Promise<any>;
    findUnique(
        options: findOneOption<Entity, CreateDto, UpdateDto>,
    ): Promise<any>;
    update(options: updateOption<Entity, CreateDto, UpdateDto>): Promise<any>;
    delete(options: remove<Entity, CreateDto, UpdateDto>): Promise<any>;
}

export type CustomOption<Entity, CreateDto, UpdateDto> = {
    create?: createOption<Entity, CreateDto, UpdateDto>;
    findAll?: findAllOption<Entity, CreateDto, UpdateDto>;
    findOne?: findOneOption<Entity, CreateDto, UpdateDto>;
    update?: updateOption<Entity, CreateDto, UpdateDto>;
    remove?: remove<Entity, CreateDto, UpdateDto>;
};
