import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from 'src/app/models/basket';
import { KorpaService } from 'src/app/shared/services/korpa/korpa.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  basketTotal$! : Observable<IBasketTotals | null>;
  
  constructor(private basketService:KorpaService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotals$;
  }

}
