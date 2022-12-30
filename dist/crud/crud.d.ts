import { BaseEntity, CustomOption, DefaultOption, Model } from "./types";
export declare abstract class Crud<Entity extends BaseEntity, CreateDto, UpdateDto> {
    private readonly model;
    private readonly defaultOptions;
    private readonly customOptions;
    constructor(model: Model<Entity, CreateDto, UpdateDto>, config?: {
        defaultOptions?: DefaultOption<Entity, CreateDto, UpdateDto>;
        customOptions?: CustomOption<Entity, CreateDto, UpdateDto>;
    });
    create(createDto: CreateDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: UpdateDto): Promise<any>;
    remove(id: number): Promise<any>;
    private cast;
}
//# sourceMappingURL=crud.d.ts.map