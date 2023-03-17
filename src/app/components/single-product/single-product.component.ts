import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation,
  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import { MasterService } from 'src/app/shared/master-service.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { IProduct } from 'src/app/models/product';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { catchError, filter, map, Observable, of, take } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ProductsService } from 'src/app/shared/products/products.service';
import { IProductsPage } from 'src/app/models/products-page';
import { FilterPageService } from 'src/app/shared/filterPage/filter-page.service';
import { UserService } from 'src/app/shared/user/user.service';
import { IUser } from 'src/app/models/user';
import { SearchModelClass } from 'src/app/models/search-model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class SingleProductComponent implements OnInit,OnDestroy {

  
  product$!:Observable<IProductsPage | null>;
  user$!:Observable<IUser | null>;
  user!:IUser;


  department_fk:number = 0;
  categoryFk!:number;



  productImage: any;
 
  



  
  
  constructor(private userService:UserService,private filterService: FilterPageService, private productService:ProductsService,private _snackBar: MatSnackBar,private router:Router,private route: ActivatedRoute,private service: MasterService, private modalService: NgbModal, private httpclient: HttpClient,private sanitizer: DomSanitizer) 
  {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.filterService.getFilterEvent().subscribe((response)=>
    {
      // response.categoryFk = this.categoryFk;
      // response.departmentFk = 0;
      // console.log("Filter - category",response);
       this.productService.FilterProducts(response);
       //this.filterService.ResetFilterEvent();


    });
    this.user$ = this.userService.user$;

  }
  ngOnDestroy(): void {
    this.productService.DestroyCategories();
  }

 


  
  ngOnInit(): void {
    //const id = this.route.snapshot.params.id // any param name after "params"
    let id = this.route.snapshot.paramMap.get('id');

    this.categoryFk = Number(CryptoJS.AES.decrypt(decodeURIComponent(id!), "id").toString(CryptoJS.enc.Utf8));
    
    //console.log("CategoryFk",this.categoryFk);
    this.user$.pipe(filter(x => !!x),take(1))
    .subscribe((response)=>
    {
    if(response)
    {
      this.user = response;
  

    if(this.categoryFk)
    {
      let userId: number;
      if(!response.isAdmin)
            userId = Number(localStorage.getItem('user_id')!);
      else
             userId =  Number(localStorage.getItem('See_as_user_id')!); 

      let search = new SearchModelClass(userId);
      search.categoryFk = this.categoryFk;

     
      this.productService.GetProductbyCategory(search).subscribe(()=>{
     });


   // this.Getallproducts();
    }
    }
    });
  

     this.product$ = this.productService.productPage$;


     //console.log("Products:,",this.productService.getCurrentProductValue());





    //this.filter.get('pepperoni').valueChanges.subscribe((value: any)=>{
     // console.log(value);
   // })
   


  }



  openProduct(id:number)
  {
    let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
    //encodeURIComponent
    
    this.router.navigate(['auth/home/product',nekID]);
    
  }

 
  



 



}

