import { Component, OnInit,ViewChild,ElementRef,ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { grupe, Tile } from 'src/app/models/tile';
import * as CryptoJS from 'crypto-js';  
import { filter, first, last, Observable, Subscribable, Subscriber, Subscription, take } from 'rxjs';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { KorpaService } from 'src/app/shared/services/korpa/korpa.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthomeService } from 'src/app/shared/services/authome/authome.service';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { IHome } from 'src/app/models/home';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { SearchModel, SearchModelClass } from 'src/app/models/search-model';
import { IProduct } from 'src/app/models/product';
import { IHomeRow2 } from 'src/app/models/home-row2';
import { IUser } from 'src/app/models/user';
import { IHomeRow4 } from 'src/app/models/home-row4';
import { IHomeRow5 } from 'src/app/models/home-row5';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig],
 encapsulation: ViewEncapsulation.None, 
  styles:[`


 .row1 .carousel-control-prev:active,
 .row1 .carousel-control-prev:hover,
 .row1 .carousel-control-next:active,
 .row1 .carousel-control-next:hover
{
  border:0.5em solid #00c; /* here configure as your needs */
     color:#00c;
}
  
  
 .row1 .carousel-control-prev,
 .row1 .carousel-control-next
  {
    height:52%;
  }

 .row1 .carousel-indicators
  {
    display: none;
  }

  drag-scroll {
      height: 300px;
      width: 100%;
    }
  .mat-grid-tile-content
  {
    height:97%;
  }

  

`]
})

export class HomeComponent implements OnInit,OnDestroy {

 

  user$!:Observable<IUser | null>;

  constructor(private homeService: HomeService,private userService:UserService) { 
  }



  ngOnInit(): void {

    this.user$ = this.userService.user$;

  }
  
  ngOnDestroy(): void {
    this.homeService.DestroyHome();
  }



}
