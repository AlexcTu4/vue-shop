import type {IProduct} from "@/types/product";

export interface ICartProduct extends IProduct{
    priceTotal: number,
    qty: number
}