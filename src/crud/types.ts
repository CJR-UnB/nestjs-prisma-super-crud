export interface ValidateModel {
    create<T>(arg: any): any;
    findUnique<T>(arg: any): any;
    findMany<T>(arg: any): any;
    update<T>(arg: any): any;
    delete<T>(arg: any): any;
}
export type CreateArg<Model extends ValidateModel> = Parameters<
    Model["create"]
>[0]["data"];
export type UpdateArg<Model extends ValidateModel> = Parameters<
    Model["update"]
>[0]["data"];

type Entity<CreateArg> = Required<{
    [key in keyof CreateArg]: CreateArg[key] extends number | string | boolean
        ? CreateArg[key]
        : CreateArg[key] extends { create?: any }
        ? CreateArg[key]["create"]
        : unknown;
}>;

export type Return<Option> = Option extends {select:any}? true:false

export interface BaseModel<Model extends ValidateModel> {
    create<T>(arg?: Parameters<Model["create"]>[0]);
    findUnique<T>(arg?: Parameters<Model["findUnique"]>[0]);
    findMany<T>(arg?: Parameters<Model["findMany"]>[0]);
    update<T>(arg?: Parameters<Model["findUnique"]>[0]);
    delete<T>(arg?: Parameters<Model["delete"]>[0]);
}

export type DefaultOption<Model extends ValidateModel> = Partial<
    Omit<Parameters<Model["findMany"]>[0], "where">
>;

export type CustomOption<Model extends ValidateModel> = {
    create?: Omit<Parameters<Model["create"]>[0], "data">;
    findOne?: Omit<Parameters<Model["findUnique"]>[0], "where">;
    findAll?: Omit<Parameters<Model["findMany"]>[0], "where">;
    update?: Omit<Parameters<Model["update"]>[0], "where" | "data">;
    remove?: Omit<Parameters<Model["delete"]>[0], "where">;
};