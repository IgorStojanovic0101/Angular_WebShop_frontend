import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, IBasket, IBasketitem, IBasketTotals } from 'src/app/models/basket';
import { MasterService } from '../master-service.service';
import { map } from 'rxjs/operators'
import { IProduct } from 'src/app/models/product';
import { BasketStatus } from 'src/app/models/enums/basketStatus';
@Injectable({
  providedIn: 'root'
})
export class KorpaService {

  private basketSource = new BehaviorSubject<IBasket | null >(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotals$ = this.basketTotalSource.asObservable();

  constructor(private service: MasterService) { }

   
  getBasket(id:number)
  {
   return this.service.GetBasket(id).pipe
   (
    map((basket:IBasket) => {
      this.basketSource.next(basket);
      this.CalculateTotals();

    })
   );
  }
  setBasket(basket: IBasket)
  {
    return this.service.SetBaset(basket).subscribe((response:IBasket)=>
    {
      this.basketSource.next(response);
      this.CalculateTotals();
    })
  }

  getCurrentBasketValue()
  {
    return this.basketSource.value;
  }
  createBasket():IBasket
  {
    const basket = new Basket();
   // localStorage.setItem('basket_id',basket.BasketPk);
    return basket;
  }

  addItemToBasket(item:IProduct,counts:number,userFk:number)
  {
    const itemToAdd:IBasketitem = this.mapProductToBasketItem(item,counts,userFk);
    console.log("IBasketitem",itemToAdd);

    let basket = this.getCurrentBasketValue()??this.createBasket();
    basket = this.AddOrUpdateItem(basket,basket.itemList,itemToAdd,counts);    
    basket.UserFk = userFk;

    //console.log("Add item to basket:",basket);

    this.setBasket(basket);
  }

  private AddOrUpdateItem(basket:IBasket, items:IBasketitem[],itemToAdd:IBasketitem,itemCount:number):IBasket
  {
    const index = items.findIndex(i=>i.BasketItemPk === itemToAdd.BasketItemPk);
    console.log(index);
    if(index === -1)
    {
      const any = items.findIndex(i=>i.ProductFk === itemToAdd.ProductFk);
      if(any === -1)
      {
        itemToAdd.ItemCount = itemCount;
        items.push(itemToAdd);
        basket.status = BasketStatus.AddUpdateItem;

      }
      else
      {
        items[any].ItemCount = itemCount;
        basket.status = BasketStatus.UpdateItem;

      }
    }
    else
    {
      items[index].ItemCount += itemCount;
      basket.status = BasketStatus.UpdateItem;
    }
   
   
    

    basket.itemList = items;
    return basket;
  }

  incrementItemQuantity(item: IBasketitem)
  {
    const basket = this.getCurrentBasketValue()!;
    const foundItemIndex = basket.itemList.findIndex(x=>x.BasketItemPk === item.BasketItemPk);
    basket!.itemList[foundItemIndex].ItemCount++;
    basket.status = BasketStatus.UpdateItem;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketitem)
  {
    const basket = this.getCurrentBasketValue()!;
    const foundItemIndex = basket.itemList.findIndex(x=>x.BasketItemPk === item.BasketItemPk);
    if(basket.itemList[foundItemIndex].ItemCount > 1)
    {
    basket.itemList[foundItemIndex].ItemCount--;
    basket.status = BasketStatus.UpdateItem;
    this.setBasket(basket);
    }
    else
    {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item:IBasketitem)
  {
    const basket = this.getCurrentBasketValue()!;
    if(basket.itemList.some(x=>x.BasketItemPk === item.BasketItemPk))
    basket.itemList = basket.itemList.filter(i => i.BasketItemPk !== item.BasketItemPk);
    if (basket.itemList.length>0)
    {
        basket.status = BasketStatus.DeleteItem;
        this.setBasket(basket);
    }
    else{
     this.deleteBasket(basket);
    }
  }
  deleteBasket(basket: IBasket) {
      basket.status =  BasketStatus.DeleteItem_DeleteBasket;
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      this.setBasket(basket);

  }


  DeleteAllFromBasket(basket: IBasket) {
  
    basket.itemList = [];
    basket.status =  BasketStatus.DeleteAllItemsInBasket;
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    this.setBasket(basket);

}
  
 private mapProductToBasketItem(item:IProduct,counts:number,userFk:number):IBasketitem{
    console.log("Product",item);
    return {
      BasketItemPk:0,
      BasketFk:Number(this.getCurrentBasketValue()!.BasketPk),
      ProductName:item.ProductName,
      ProductPrice:Number(item.ProductPrice),
      slika:item.slika,
      ProductFk:item.ProductPk,
      UserFk:userFk,
      ItemCount:counts
      
    }
  }


  private CalculateTotals()
  {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket!.itemList.reduce((a,b) =>(b.ProductPrice * b.ItemCount) + a,0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping,total,subtotal});
  }
}
