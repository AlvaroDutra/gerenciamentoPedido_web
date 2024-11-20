import { IOrderProduct } from "./product";


export interface IOrder{
    id: number,
    clientId: string,
    orderProducts: IOrderProduct[]
}