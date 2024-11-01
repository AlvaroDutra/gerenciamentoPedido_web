import { ITable } from "./table";

export interface IClient {
    name:string,
    id:string,
    table: ITable
}