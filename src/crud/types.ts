export interface BaseEntity {
    id: number;
}

// Falta testes para Entidades com relações
type Option<Entity, CreateDto, UpdateDto> = {
    data: CreateDto | UpdateDto;
    where: Partial<Record<keyof Entity, any>>;
    select: Partial<Record<keyof Entity, any>>;
    orderBy: Partial<Record<keyof Entity, "asc" | "desc">>[];
    include: Partial<Record<keyof Entity, any>>;
};

export type DefaultOption<Entity, CreateDto, UpdateDto> = Partial<
    Option<Entity, CreateDto, UpdateDto>
>;

//**************** Tipos da Model ****************

type ModelCreateOption<Entity, CreateDto, UpdateDto> = Pick<
    Option<Entity, CreateDto, UpdateDto>,
    "data"
> &
    Partial<Pick<Option<Entity, CreateDto, UpdateDto>, "select">>;

type ModelFindManyOption<Entity, CreateDto, UpdateDto> = Partial<
    Omit<Option<Entity, CreateDto, UpdateDto>, "data">
>;

type ModelFindUniqueOption<Entity, CreateDto, UpdateDto> = Pick<
    Option<Entity, CreateDto, UpdateDto>,
    "where"
> &
    Partial<Pick<Option<Entity, CreateDto, UpdateDto>, "select" | "include">>;

type ModelUpdateOption<Entity, CreateDto, UpdateDto> = Pick<
    Option<Entity, CreateDto, UpdateDto>,
    "data" | "where"
> &
    Partial<Pick<Option<Entity, CreateDto, UpdateDto>, "select">>;

type ModelDeleteOption<Entity, CreateDto, UpdateDto> = Pick<
    Option<Entity, CreateDto, UpdateDto>,
    "where"
> &
    Partial<Pick<Option<Entity, CreateDto, UpdateDto>, "select">>;

export interface Model<Entity extends BaseEntity, CreateDto, UpdateDto> {
    create(
        options: ModelCreateOption<Entity, CreateDto, UpdateDto>
    ): Promise<ModelCreateOption<Entity, CreateDto, UpdateDto>["select"]>;
    findMany(
        options: ModelFindManyOption<Entity, CreateDto, UpdateDto>
    ): Promise<ModelFindManyOption<Entity, CreateDto, UpdateDto>["select"][]>;
    findUnique(
        options: ModelFindUniqueOption<Entity, CreateDto, UpdateDto>
    ): Promise<ModelFindUniqueOption<Entity, CreateDto, UpdateDto>['select']>;
    update(
        options: ModelUpdateOption<Entity, CreateDto, UpdateDto>
    ): Promise<ModelUpdateOption<Entity, CreateDto, UpdateDto>['select']>;
    delete(
        options: ModelDeleteOption<Entity, CreateDto, UpdateDto>
    ): Promise<ModelDeleteOption<Entity, CreateDto, UpdateDto>['select']>;
}

//**************** Tipos da Opções Personalizadas ****************

type CustomCreateOption<Entity, CreateDto, UpdateDto> = Partial<
    Pick<Option<Entity, CreateDto, UpdateDto>, "select">
>;
type CustomFindAllOption<Entity, CreateDto, UpdateDto> = Partial<
    Omit<Option<Entity, CreateDto, UpdateDto>, "data">
>;
type CustomFindOneOption<Entity, CreateDto, UpdateDto> = Partial<
    Pick<Option<Entity, CreateDto, UpdateDto>, "select" | "include">
>;
type CustomUpdateOption<Entity, CreateDto, UpdateDto> = Partial<
    Pick<Option<Entity, CreateDto, UpdateDto>, "select">
>;
type CustomRemoveOption<Entity, CreateDto, UpdateDto> = Partial<
    Pick<Option<Entity, CreateDto, UpdateDto>, "select">
>;

export type CustomOption<Entity, CreateDto, UpdateDto> = {
    create?: CustomCreateOption<Entity, CreateDto, UpdateDto>;
    findAll?: CustomFindAllOption<Entity, CreateDto, UpdateDto>;
    findOne?: CustomFindOneOption<Entity, CreateDto, UpdateDto>;
    update?: CustomUpdateOption<Entity, CreateDto, UpdateDto>;
    remove?: CustomRemoveOption<Entity, CreateDto, UpdateDto>;
};
