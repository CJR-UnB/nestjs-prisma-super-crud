export type GetOption<Payload> = {
    select: {
        [key in keyof Payload]: Payload[key] extends number | string | boolean ? true : GetOption<Payload[key]>;
    };
};
export interface ValidateModel {
    create<T>(arg: any): any;
    findUnique<T>(arg: any): any;
    findMany<T>(arg: any): any;
    update<T>(arg: any): any;
    delete<T>(arg: any): any;
}
export interface BaseModel<Model extends ValidateModel> {
    create(arg?: Parameters<Model["create"]>[0]): any;
    findUnique(arg?: Parameters<Model["findUnique"]>[0]): any;
    findMany(arg?: Parameters<Model["findMany"]>[0]): any;
    update(arg?: Parameters<Model["findUnique"]>[0]): any;
    delete(arg?: Parameters<Model["delete"]>[0]): any;
}
export type CreateArg<Model extends ValidateModel> = Parameters<Model["create"]>[0]["data"];
export type UpdateArg<Model extends ValidateModel> = Parameters<Model["update"]>[0]["data"];
//# sourceMappingURL=types.d.ts.map