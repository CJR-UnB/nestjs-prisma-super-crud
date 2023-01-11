export type GetOption<Payload> = {
    select: {
        [key in keyof Payload]: Payload[key] extends
            | (number | string | boolean)
            | (number | string | boolean)[]
            ? true
            : Payload[key] extends any[]
            ? GetOption<Payload[key][0]>
            : GetOption<Payload[key]>;
    };
};

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
