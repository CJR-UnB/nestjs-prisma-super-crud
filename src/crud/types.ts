export interface ValidateModel {
    create<T>(arg: any): any;
    findUnique<T>(arg: any): any;
    findMany<T>(arg: any): any;
    update<T>(arg: any): any;
    delete<T>(arg: any): any;
}

type ModelOptions<Model extends ValidateModel> = Pick<
    Parameters<Model["findMany"]>[0],
    "select"|"include"
>;

export class CrudOptions<Model extends ValidateModel> {
    setOption<DefaultOptions extends ModelOptions<Model>>(
        defaultOptions: DefaultOptions
    ) {
        return defaultOptions;
    }
}

export type CreateArg<Model extends ValidateModel> = Parameters<
    Model["create"]
>[0]["data"];
export type UpdateArg<Model extends ValidateModel> = Parameters<
    Model["update"]
>[0]["data"];
