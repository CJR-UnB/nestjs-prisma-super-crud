export interface ValidateModel {
    create(arg: any): any;
    findUnique(arg: any): any;
    findMany(arg: any): any;
    update(arg: any): any;
    delete(arg: any): any;
}

export type ModelOptions<Model extends ValidateModel> = Pick<
    Parameters<Model["findMany"]>[0],
    "select"
>;

export type CreateArg<Model extends ValidateModel> = Parameters<
    Model["create"]
>[0]["data"];
export type UpdateArg<Model extends ValidateModel> = Parameters<
    Model["update"]
>[0]["data"];
