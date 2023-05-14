import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketitem } from 'src/app/models/basket';
import { KorpaService } from 'src/app/shared/services/korpa/korpa.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/shared/services/history/history.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket | null>
   

  constructor(private historyService: HistoryService, private router:Router,private toastr: ToastrService,private korpaService:KorpaService) { }

  ngOnInit(): void {
    this.basket$ = this.korpaService.basket$;
    let basket = this.korpaService.getCurrentBasketValue()!;
    console.log("Basket",basket);

  }

  removeBasketItem(item:IBasketitem)
  {
    this.korpaService.removeItemFromBasket(item);
  }
  incrementItemQuantity(item: IBasketitem)
  {
    this.korpaService.incrementItemQuantity(item);
  }
  decrementItemQuantity(item: IBasketitem)
  {
    this.korpaService.decrementItemQuantity(item);
  }
  buyAll()
  {
    let basket = this.korpaService.getCurrentBasketValue()!;
     this.historyService.ItemsAdd(basket);
     console.log(this.historyService.getCurrentHistoryValue());
    this.toastr.success("Order created successfuly!");
    this.korpaService.DeleteAllFromBasket(basket)
    this.router.navigate(['auth/home/buy-all-success']);

  }

}
