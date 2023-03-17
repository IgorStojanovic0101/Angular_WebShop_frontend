import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IBasket, IBasketitem } from 'src/app/models/basket';
import { HistoryStatus } from 'src/app/models/enums/historyStatus';
import { IHistory, IHistoryItem, OrderHistory } from 'src/app/models/history';
import { MasterService } from '../master-service.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historySource = new BehaviorSubject<IHistory | null >(null);
  history$ = this.historySource.asObservable();

  
  constructor(private service: MasterService) { }



  getHistory(id:number)
  {
   return this.service.GetHistory(id).pipe
   (
    map((history:IHistory) => {
      this.historySource.next(history);

    })
   );
  }

  getCurrentHistoryValue()
  {
    return this.historySource.value;
  }
  ItemsAdd(basket:IBasket)
  {
    //console.log("basket",basket);
    let historyOrders = this.mapBasketToOrderHistory(basket);
   // console.log("history orders ",historyOrders);
    historyOrders.status = HistoryStatus.CreateHistory_addItem;
    this.setHistory(historyOrders);
  }
  updateItems(history:IHistory)
  {
    history.status = HistoryStatus.UpdateItem;
    this.setHistory(history);


  }
  setHistory(history: IHistory)
  {
    return this.service.SetHistory(history).subscribe((response:IHistory)=>
    {
      this.historySource.next(response);
      console.log(response);
    })
  }
  private mapBasketToOrderHistory(basket:IBasket):OrderHistory{
   
   // let history = this.createHistory();

    const history = new OrderHistory();
    history.UserFk = basket.UserFk;

    basket.itemList.forEach(item => {
      
   
    let historyItem:IHistoryItem = {
      HistoryItemPk: 0,
      ProductName: item.ProductName,
      slika: item.slika,
      ProductFk: item.ProductFk,
      UserFk: basket.UserFk,
      Rating: 0,
      RatingStar: []
    }
    console.log("Item",historyItem);
    
    history.itemList.push(historyItem);

   });

   console.log("History",history);
  
   return history;


   
  }

  createHistory():IHistory
  {
    const basket = new OrderHistory();
   // localStorage.setItem('basket_id',basket.BasketPk);
    return basket;
  }


  
}
