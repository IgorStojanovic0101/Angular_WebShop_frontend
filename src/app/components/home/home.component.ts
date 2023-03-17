import { Component, OnInit,ViewChild,ElementRef,ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { grupe, Tile } from 'src/app/models/tile';
import * as CryptoJS from 'crypto-js';  
import { filter, first, last, Observable, Subscribable, Subscriber, Subscription, take } from 'rxjs';
import { MasterService } from 'src/app/shared/master-service.service';
import { KorpaService } from 'src/app/shared/korpa/korpa.service';
import { UserService } from 'src/app/shared/user/user.service';
import { AuthomeService } from 'src/app/shared/authome/authome.service';
import { HomeService } from 'src/app/shared/home/home.service';
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

  title = 'frontend';
  opened = false;
  interval:number = 2000;
  
  user!:IUser;
  topCategory!:ICategory;


  user$!:Observable<IUser | null>;
  home$!:Observable<IHome | null>;
  departments$!:Observable<IDepartment[] | null>;
  categories$!:Observable<ICategory[] | null>;
  row1Products_1$!:Observable<IProduct[] | null>;
  row1Products_2$!:Observable<IProduct[] | null>;
  row2Items$!: Observable<IHomeRow2 | null>
  row3Products$!:Observable<IProduct[] | null>;
  row4Products$!:Observable<IHomeRow4 | null>;
  row5Items$!:Observable<IHomeRow5 | null>;
  row6Products$!:Observable<IProduct[] | null>;



  constructor(private homeService: HomeService,private userService:UserService,private service: MasterService,private router:Router,private config: NgbCarouselConfig,private authome: AuthomeService) { 

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
    this.user$ = this.userService.user$;
   // console.log("User ID const",this.userIdService);


  }
  ngOnDestroy(): void {
    this.homeService.DestroyHome();
  }



  ngOnInit(): void {
 
  
   // let userId = Number(localStorage.getItem('user_id')!);
    this.user$.pipe(filter(x => !!x),take(1))
    .subscribe((response)=>
    {
    if(response)
    {

        let userId: number;
        if(!response.isAdmin)
              userId = Number(localStorage.getItem('user_id')!);
        else
               userId =  Number(localStorage.getItem('See_as_user_id')!); 

         console.log("is admin",response.isAdmin);
         
        this.user = response;
        if(userId)
        {
          console.log("User Id",userId);

              this.homeService.getHome(userId).subscribe();

              this.home$ = this.homeService.home$;


              this.homeService.getDepartments(userId).subscribe();

              this.departments$ = this.homeService.departments$;

              this.homeService.getCategories(userId).subscribe();

              this.categories$ = this.homeService.categories$;

              this.homeService.GetRow1Products_1(userId).subscribe();

              this.row1Products_1$ = this.homeService.row1Products_1$;

              this.homeService.GetRow1Products_2(userId).subscribe();

              this.row1Products_2$ = this.homeService.row1Products_2$;

              this.homeService.GetRow2(userId).subscribe();

              this.row2Items$ = this.homeService.row2Items$;

             

              //BehSubject..
              this.row2Items$.pipe(filter(x => !!x),take(1)).subscribe((response)=>{
                if(response)
                {
                  this.homeService.GetRow3(userId,response.TopDepartment.RecordPk).subscribe();
                
                  this.row3Products$ = this.homeService.row3Products$;

                  this.homeService.GetProductsForTopCategory(response.TopCategory.RecordPk,userId).subscribe(()=>{
                  });
                  this.row4Products$ = this.homeService.productsForTopCategory$;

                  
                }
              });

              this.homeService.GetRow5(userId).subscribe();

              this.row5Items$ = this.homeService.row5Items$;


            //  this.categories$.pipe(filter(x => !!x),take(1)).subscribe((response)=>{
             //   if(response)
             //   {
                  //console.log("response",response);
                  let serachModel:SearchModelClass = new SearchModelClass(userId);
              //    serachModel.categoryList = response; 
              //    console.log("response",response);
               //   console.log("serachModel",serachModel);

                this.homeService.GetRow6(serachModel).subscribe(()=>{
                  console.log("inicialized data");
                });
                this.row6Products$ = this.homeService.row6Products$;

            //  }
            //  });
          }
        
    }
  });
  }


  @ViewChild('carousel') carousel!: NgbCarousel;
  @ViewChild('nav') slider !: NgImageSliderComponent;
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild('scroll', {read: DragScrollComponent}) ds!: DragScrollComponent;
  @ViewChild('scroll2', {read: DragScrollComponent}) ds2!: DragScrollComponent;
  reklame = [

    {title: 'First Slide', short: 'First Slide Short', src: "../assets/images/rek6.webp"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "../assets/images/rek2.jpg"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "../assets/images/rek3.jpg"},
    {title: 'Fifth Slide', short: 'Fifth Slide Short', src: "../assets/images/rek5.jpg"},


  ];








Proizvod1()
{
  console.log("Proizvod 1");
}


  stopSliding()
  {
    this.opened=!this.opened;
   // console.log("Sliding");
    

    this.config.interval = 0;

   

  }
  moveLeft() {
    let homse = this.homeService.getCurrentHomeValue()!;
    console.log("Home",homse);
    this.ds.moveLeft();
  }
  
  moveRight() {
    this.ds.moveRight();
  }
  
  moveTo(index: number) {
    this.ds.moveTo(index);
  }
  
  Slider2prevImageClick() {
    this.ds2.moveLeft();
  }
  
  Slider2nextImageClick() {
    this.ds2.moveRight();
  }


CallDepartment(id:number)
{
  //let userId = Number(localStorage.getItem('user_id')!);
  let userId = this.user.UserPk;

  let serachModel:SearchModel = {departmentFk: id,departmentCount:1,categoryCount:0,categoryFk:0,userId:userId,categoryList:[]};
  this.homeService.SetDepartmentML(serachModel);
     //here we can see user form data in encrypted format in console
  let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
//encodeURIComponent

  this.router.navigate(['auth/home/product-group',nekID]);

}

CallCategoryDepartment()
{

  let id = this.homeService.getCategoriesValues()!.at(0)?.DepartmentFk;

  if(!this.user.isAdmin)
  {
    let userId = this.user.UserPk;
    let serachModel:SearchModel = {departmentFk: id!,departmentCount:1,categoryCount:0,categoryFk:0,userId:userId,categoryList:[]};
   this.homeService.SetDepartmentML(serachModel);
 
  }
  //let userId = Number(localStorage.getItem('user_id')!);
      //here we can see user form data in encrypted format in console
  let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id!.toString(),"id").toString());
//encodeURIComponent

  this.router.navigate(['auth/home/product-group',nekID]);

}

CallCategory(id:number)
{
  //let userId = Number(localStorage.getItem('user_id')!);
  if(!this.user.isAdmin)
  {
      let userId = this.user.UserPk;
      let serachModel:SearchModel = {departmentFk: 0,departmentCount:0,categoryCount:1,categoryFk:id,userId:userId,categoryList:[]};
       this.homeService.SetCategoryML(serachModel);
  }

 

     //here we can see user form data in encrypted format in console
    let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
//encodeURIComponent 
    this.router.navigate(['auth/home/product-one',nekID]);
}

openProduct(id:number)
{
  let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
  //encodeURIComponent
  
  this.router.navigate(['auth/home/product',nekID]);
  
}
CallDepartments()
{
 // this.router.navigate(['auth/home/product-dept',{ queryParams :{ departments: departments} }]);
}
}
