import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-all-succes',
  templateUrl: './buy-all-succes.component.html',
  styleUrls: ['./buy-all-succes.component.css']
})
export class BuyAllSuccesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  GoToHistory()
  {
    this.router.navigate(['auth/home/order-history']);

  }

}
