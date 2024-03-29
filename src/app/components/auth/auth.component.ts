import { AfterViewInit, Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, filter, Observable, of, switchMap, take } from 'rxjs';
import { IMenu } from 'src/app/models/i-menu';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../loader/loader.service';
import { KorpaService } from 'src/app/shared/services/korpa/korpa.service';
import { IBasket } from 'src/app/models/basket';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IUser } from 'src/app/models/user';
import { HistoryService } from 'src/app/shared/services/history/history.service';
import { ICategory, IDepartment, INavBar } from 'src/app/models/navbar';
import { NavBarService } from 'src/app/shared/services/navBar/nav-bar.service';
import { AuthomeService } from 'src/app/shared/services/authome/authome.service';
import * as CryptoJS from 'crypto-js';  
import { DataimportService } from 'src/app/shared/services/dataimport/dataimport.service';
import { SearchModel } from 'src/app/models/search-model';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { MasterService } from 'src/app/shared/services/master-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None, 
  styles:[`

.mat-form-field-infix
  {
     border-top : 0;
     background-color:white;

  }
  .mat-sidenav
  {
  width: 25%;
  background-color: cornflowerblue;
  position: fixed;
  }
  

  
`]

  
})
export class AuthComponent implements OnInit,AfterViewInit {
  basket$!:Observable<IBasket | null> 
  user$!:Observable<IUser | null>;
  userSeeAss$!:Observable<IUser | null>;
  navBar$!:Observable<INavBar | null>;


  
  departments$!:Observable<IDepartment[] | null>;
  categories$!:Observable<ICategory[] | null>;

  categoryFk!:number;
  departmentFk!:number;

  //menuList: Observable<IMenu[]>;
  opened = false;
  SearchForm:any =  FormGroup;
  
  constructor(private homeService:HomeService, private DataImportService: DataimportService,private NavBarService:NavBarService, private historyService:HistoryService, private userService:UserService, private korpa:KorpaService,private fb:FormBuilder,private router:Router,private service: MasterService,private authome: AuthomeService) {
   // this.menuList = this.service.getList<IMenu>("/assets/menu.json");

   

   }


   ngOnInit(): void {
    this.SearchForm = this.fb.group({
      search: [''],
      // email:['',Validators.compose([Validators.required,Validators.email])]
    });
  
    const userId = Number(localStorage.getItem('user_id'));
    this.authome.SetUser(userId);
  
    // Combining multiple observables into a single stream (observabke)
    combineLatest([
      this.korpa.getBasket(userId),
      this.userService.getUser(userId),
      this.NavBarService.getNavBar(userId),
      this.DataImportService.GetDepartments(),
      this.DataImportService.GetAllCategories()
    ]).subscribe(() => {
      // Initialization complete
    });
  
    this.departments$ = this.DataImportService.departments$;
    this.categories$ = this.DataImportService.categories$;
    this.basket$ = this.korpa.basket$;
    this.user$ = this.userService.user$;
    this.navBar$ = this.NavBarService.navBar$;
    this.userSeeAss$ = this.userService.userSeeAss$;
  }
  
  ngAfterViewInit(): void {
   //this.user$.subscribe((response)=>{
     // let user = response;
    //  console.log("ngAfterViewInit",user);

   // });

 
  }
  logout() {
    this.homeService.DestroyHome();
    localStorage.clear();
    this.router.navigate(['login']);
  }


  onClose():void
  {
    //console.log("On close");
    this.authome.TurnOnEvent();

  }
  BacktoAdmin()
  {
    this.userService.DestroyUserSeeAss();
    this.router.navigate(['auth/admin']);


  }
  
  stopSliding()
  {
    this.opened=!this.opened;
    //console.log("Stop Sliding event");
    this.authome.ShowDownEvent();
  }
  get f() { return this.SearchForm.controls; }



  onSu1bmit() {
  
   // console.log(this.SearchForm.value.search, 'Toastr fun!');   

    this.router.navigate(['auth/home/search'], { queryParams :{ search: this.SearchForm.value.search} });
   // .then(() => {
    //  window.location.reload();
    //});;

    
    

  }

  onSubmit(e: { preventDefault: () => void; }){

    e.preventDefault();   
    this.router.navigate(['auth/home/search'], { queryParams :{ search: this.SearchForm.value.search} });

   }

  handleKeyUp(e: {preventDefault: () => void;  keyCode: number; })
  {    
    e.preventDefault();   

    if(e.keyCode === 13)
      this.onSubmit(e);      
       
  }

  GoToBasket()
  {
      this.router.navigate(['auth/home/basket']);
  }

  GoToOrders()
  {
    this.router.navigate(['auth/home/orders']);

  }
  GoToHistory()
  {
    this.router.navigate(['auth/home/order-history']);

  }
CallDepartment(id:number)
{

  this.user$.pipe(
    switchMap(response =>
    {
      if (!response) {
        return of(null);
      }
      if(!response.isAdmin)
      { 
        let userId = Number(localStorage.getItem('user_id')!);
        let serachModel:SearchModel = {departmentFk: id,departmentCount:1,categoryCount:0,categoryFk:0,userId:userId,categoryList:[]};
        return this.homeService.SetDepartmentML(serachModel);
      }
      return of(null); 

    })).subscribe();

 

     //here we can see user form data in encrypted format in console
  let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
//encodeURIComponent

  this.router.navigate(['auth/home/product-group',nekID]);

  }

CallCategory(id:number)
{

  this.user$.pipe(
    switchMap(response => {
      if (!response) {
        return of(null);
      }
      if (!response.isAdmin) {
        let userId = Number(localStorage.getItem('user_id'));

        if (!userId) {
          return of(null);
        }
        let serachModel: SearchModel = {departmentFk: 0, departmentCount: 0, categoryCount: 1, categoryFk: id, userId: userId, categoryList: []};
        return this.homeService.SetCategoryML(serachModel)
      } 
      return of(null); 
    })
    ).subscribe();
  



  
  
   let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
//encodeURIComponent 
    this.router.navigate(['auth/home/product-one',nekID]);
}

onSelect(value:any)
  {
    this.departmentFk = value;
    this.CallDepartment(Number(value));
   // console.log(event.target.value);
  }

  onSelectCategory(value:any)
  {
    this.categoryFk = value;
    this.CallCategory(Number(value));


  }
 

}
