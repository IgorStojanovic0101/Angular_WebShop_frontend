
import { v4 as uuidv4 } from 'uuid';
import { BasketStatus } from './enums/basketStatus';

export interface IBasket {
    BasketPk:number;
    UserFk:number;
    itemList:IBasketitem[];
    status:BasketStatus;
}

export interface IBasketitem
{
    BasketItemPk:number;
    BasketFk:number;
    ProductName:string;
    ProductPrice:number;
    slika:string;
    ProductFk:number;
    UserFk:number;
    ItemCount:number;
}

export class Basket implements IBasket
{
    BasketPk:number = 0;
    UserFk:number = 0;
    itemList: IBasketitem[] = [];
    status!: BasketStatus;
    
}

export interface IBasketTotals
{
    shipping:number;
    subtotal:number;
    total:number;
}