import { prisma, Prisma } from "@prisma/client";
import { Mode } from "fs";
import { pid } from "process";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation;

export interface ValidateModel {
    create(arg: any): any;
    findUnique(arg: any): any;
    findMany(arg: any): any;
    update(arg: any): any;
    delete(arg: any): any;
}

export interface BaseModel<Model extends ValidateModel> {
    create: Model["create"];
    findUnique: Model["findUnique"];
    findMany: Model["findMany"];
    update: Model["update"];
    delete: Model["delete"];
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

export type CreateArg<Model extends ValidateModel> = Parameters<
    Model["create"]
>[0]["data"];
export type UpdateArg<Model extends ValidateModel> = Parameters<
    Model["update"]
>[0]["data"];

export type Return<Model extends ValidateModel> = {
    create: Promise<ReturnType<Model["create"]>>;
    findOne: Promise<ReturnType<Model["findUnique"]>>;
    findAll: Promise<ReturnType<Model["findMany"]>>;
    update: Promise<ReturnType<Model["update"]>>;
    remove: Promise<ReturnType<Model["delete"]>>;
};
