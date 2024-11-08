import {IProduct} from "./product"

export interface IOrder{
    id: number,
    clientId: string,
    products: IProduct[]
}