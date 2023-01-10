import { Options } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RejectOptions } from "./crud";

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

export type Return<Option> = {
    [key in keyof Option as Option[key] extends true
        ? key
        : never]: Option[key];
};

export interface BaseModel<Model extends ValidateModel> {
    create(arg?: Parameters<Model["create"]>[0]);
    findUnique(arg?: Parameters<Model["findUnique"]>[0]);
    findMany(arg?: Parameters<Model["findMany"]>[0]);
    update(arg?: Parameters<Model["findUnique"]>[0]);
    delete(arg?: Parameters<Model["delete"]>[0]);
}

type PickSelects<Option> = Option extends { select?: any }
    ? {
          select?: {
              [key in keyof Option["select"]]: Option["select"][key] extends boolean
                  ? Option["select"][key]
                  :
                        | boolean
                        | PickSelects<Exclude<Option["select"][key], boolean>>;
          };
      }
    : unknown;

export type DefaultOption<Model extends ValidateModel> = Partial<
    PickSelects<Parameters<Model["findMany"]>[0]>
>;
