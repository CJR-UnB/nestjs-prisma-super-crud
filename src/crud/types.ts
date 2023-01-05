import { prisma, Prisma } from "@prisma/client";
import { Mode } from "fs";
import { pid } from "process";

export type RejectOptions = Prisma.RejectOnNotFound | Prisma.RejectPerOperation

export interface ValidateModel {
    create (arg: any): any
    findUnique (arg: any): any
    findMany (arg: any): any
    update(arg:any): any
    delete(arg:any): any
}


export interface BaseModel<Model extends ValidateModel> {
    create: Model["create"]
    findUnique: Model["findUnique"]
    findMany: Model["findMany"]
    update: Model["update"]
    delete: Model["delete"]
}