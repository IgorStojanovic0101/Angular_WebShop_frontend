import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderComponent } from 'ng-image-slider';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Observable, filter, of, switchMap, take, tap } from 'rxjs';
import { IHomeRow4 } from 'src/app/models/home-row4';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-row4',
  templateUrl: './row4.component.html',
  styleUrls: ['./row4.component.css']
})
export class Row4Component implements OnInit {

  row4Products$!:Observable<IHomeRow4 | null>;

   user!:IUser;

  @ViewChild('carousel') carousel!: NgbCarousel;
 
  @ViewChild('scroll', {read: DragScrollComponent}) ds!: DragScrollComponent;

  constructor(private userService: UserService,private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {

    
    this.userService.user$.pipe(
      filter(x => !!x),
      take(1),
      switchMap(response => {
        if (!response) {
          return of(null);
        }
    this.user = response;
    
    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
    return this.homeService.row2Items$.pipe(
      filter(x => !!x),
      take(1),
      switchMap(response => {
        if (!response) {
          return of(null);
        }
        if (!userId) {
          return of(null);
        }
        return  this.homeService.GetProductsForTopCategory(response.TopCategory.RecordPk,userId).pipe(
          tap(() => {
            this.row4Products$ = this.homeService.productsForTopCategory$;
          })
          );
        })
      );
    })
  ).subscribe();


  }


  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }

  moveLeft() {
 
    this.ds.moveLeft();
  }
  
  moveRight() {
    this.ds.moveRight();
  }
}
