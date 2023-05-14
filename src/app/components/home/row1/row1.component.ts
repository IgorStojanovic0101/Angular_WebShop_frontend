import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, filter, forkJoin, map, take, tap } from 'rxjs';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { IProduct } from 'src/app/models/product';
import { SearchModel } from 'src/app/models/search-model';
import { IUser } from 'src/app/models/user';
import { AuthomeService } from 'src/app/shared/services/authome/authome.service';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-row1',
  templateUrl: './row1.component.html',
  styleUrls: ['./row1.component.css']
})
export class Row1Component implements OnInit {

  interval:number = 2000;

  categories$!:Observable<ICategory[] | null>;
  departments$!:Observable<IDepartment[] | null>;

  row1Products_1$!:Observable<IProduct[] | null>;
  row1Products_2$!:Observable<IProduct[] | null>;



  @Input() user!:IUser;

  @ViewChild('carousel') carousel!: NgbCarousel;




  reklame = [

    {title: 'First Slide', short: 'First Slide Short', src: "../assets/images/rek6.webp"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "../assets/images/rek2.jpg"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "../assets/images/rek3.jpg"},
    {title: 'Fifth Slide', short: 'Fifth Slide Short', src: "../assets/images/rek5.jpg"},


  ];
  constructor(private homeService: HomeService,private router:Router,private config: NgbCarouselConfig,private authome: AuthomeService) {

    this.config.keyboard = true;
    this.config.pauseOnHover = true;



    this.authome.getShowDownEvent().subscribe(()=>
    {
      this.carousel.interval = 0;
    });

    this.authome.getTurnOnEvent().subscribe(()=> 
    {
      this.carousel.interval = this.interval;

    });

    
   }

   ngOnInit(): void {
    

  

    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
  
      if (userId) {
        forkJoin([
          this.homeService.getDepartments(userId).pipe(tap(() => {
            this.departments$ = this.homeService.departments$;
          })),
          this.homeService.getCategories(userId).pipe(tap(() => {
            this.categories$ = this.homeService.categories$;
          })),
          this.homeService.GetRow1Products_1(userId).pipe(tap(() => {
            this.row1Products_1$ = this.homeService.row1Products_1$;
          })),
          this.homeService.GetRow1Products_2(userId).pipe(tap(() => {
            this.row1Products_2$ = this.homeService.row1Products_2$;
          }))
        ]).subscribe();
      }
    
  

  }
        
      
      
  


  
  CallDepartment(id:number)
  {
  
    this.homeService.CallDepartment(this.user,id);
  
  
  }
  
  CallCategoryDepartment()
  {
  
    this.homeService.CallCategoryDepartment(this.user);
    
  
  }
  
  CallCategory(id:number)
  {
    this.homeService.CallCategory(this.user,id);
  
  
  }
  
  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }
  CallDepartments()
  {

  }

}
