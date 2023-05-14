import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Observable, forkJoin, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { SearchModelClass } from 'src/app/models/search-model';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-row6',
  templateUrl: './row6.component.html',
  styleUrls: ['./row6.component.css']
})
export class Row6Component implements OnInit {

  row6Products$!:Observable<IProduct[] | null>;

  @Input() user!:IUser;
  
  @ViewChild('scroll2', {read: DragScrollComponent}) ds2!: DragScrollComponent;


  constructor(private homeService: HomeService) { }

  ngOnInit(): void {

    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
   

    if (userId) {
      let serachModel:SearchModelClass = new SearchModelClass(userId);
    forkJoin([
      this.homeService.GetRow6(serachModel).pipe(tap(() => {
        this.row6Products$ = this.homeService.row6Products$;
      }))
    
    ]).subscribe();
  }
  }

  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  }
 

  Slider2prevImageClick() {
    this.ds2.moveLeft();
  }
  
  Slider2nextImageClick() {
    this.ds2.moveRight();
  }
}
