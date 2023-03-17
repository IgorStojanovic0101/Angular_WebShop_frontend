import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IHistory } from 'src/app/models/history';
import { FilterPageService } from 'src/app/shared/filterPage/filter-page.service';
import { HistoryService } from 'src/app/shared/history/history.service';
import { ProductsService } from 'src/app/shared/products/products.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit,OnDestroy {

  history$!: Observable<IHistory | null>

  @Output() ratingUpdated = new EventEmitter();
   snackBarDuration: number = 3000;



  constructor(private productService:ProductsService,private filterService:FilterPageService, private _snackBar: MatSnackBar,private historyService : HistoryService) {


    this.filterService.getFilterEvent().subscribe((response)=>
    {
      // response.categoryFk = this.categoryFk;
      // response.departmentFk = 0;
      const userId = localStorage.getItem('user_id');

       console.log("Filter - category",response);
       this.productService.FilterHistoryProducts(Number(userId),response);
       this.history$ = this.productService.history$;

       //this.filterService.ResetFilterEvent();


    });
   }
  ngOnDestroy(): void {
    this.productService.DestroyHistory();
  }

  ngOnInit(): void {

    const userId = localStorage.getItem('user_id');

    this.historyService.getHistory(Number(userId)).subscribe(()=>{
      //console.log('initialized history');
 
     // console.log("Home",this.userService.getUser());
     });
     
    this.history$ = this.historyService.history$;

    let history = this.historyService.getCurrentHistoryValue()!; 
   // console.log("History",history);
  
    

  }
  onClick(id:number,index:number) {
    let history = this.historyService.getCurrentHistoryValue()!;

    let raintng = index + 1;
     const foundItemIndex = history.itemList.findIndex(x=>x.HistoryItemPk === id);
    //history.itemList[foundItemIndex].RatingStar = Array( raintng).fill("star_"+id+"").concat(Array(5- raintng).fill("star_border"));
    history.itemList[foundItemIndex].Rating = raintng;
    

    this._snackBar.open('You rated ' +  raintng + ' / ' + 5, '', { duration: this.snackBarDuration });
    this.ratingUpdated.emit(raintng);

    this.historyService.updateItems(history);

    return false;
  }
}
