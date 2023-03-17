import { HistoryStatus } from "./enums/historyStatus";

export interface IHistoryItem
{
    HistoryItemPk:number;
    ProductName:string;
    slika:string;
    ProductFk:number;
    UserFk:number;
    Rating:number;
    RatingStar:string[];

}

export interface IHistory
{
    itemList:IHistoryItem[];
    UserFk:number;
    status: HistoryStatus;

}
export class OrderHistory implements IHistory
{
    itemList: IHistoryItem[] = [];
    UserFk:number = 0; 
    status!:HistoryStatus;
  
}
