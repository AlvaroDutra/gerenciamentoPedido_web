import { ICategory } from "./category";

export interface IProduct {
    id: string,
    name: string,
    price: number,
    active: boolean,
    category: ICategory
}