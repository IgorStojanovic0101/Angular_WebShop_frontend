import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import { MasterService } from 'src/app/shared/master-service.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { IProduct } from 'src/app/models/product';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { catchError, filter, map, Observable, of, take } from 'rxjs';
import { ProductsService } from 'src/app/shared/products/products.service';
import { IProductsPage } from 'src/app/models/products-page';
import { FilterPageService } from 'src/app/shared/filterPage/filter-page.service';
import { IUser } from 'src/app/models/user';
import { SearchModelClass } from 'src/app/models/search-model';
import { UserService } from 'src/app/shared/user/user.service';
@Component({
  selector: 'app-products',
  templateUrl: './group-products.component.html',
  styleUrls: ['./group-products.component.css']
})




export class ProductsComponent implements OnInit,OnDestroy {


  product$!:Observable<IProductsPage | null>;
  department_fk!:number;
  category_fk:number = 0;

  user$!:Observable<IUser | null>;
  user!:IUser;

  
  constructor(private userService:UserService,private filterService: FilterPageService, private productService:ProductsService,private router:Router,private route: ActivatedRoute,private service: MasterService, private modalService: NgbModal, private httpclient: HttpClient,private sanitizer: DomSanitizer) 
  {
  

    this.filterService.getFilterEvent().subscribe((response)=>
    {
      // response.categoryFk = 0;
      // response.departmentFk = this.department_fk;

      // console.log("Filter - department",response);

       this.productService.FilterProducts(response);
       //this.filterService.ResetFilterEvent();

    });

    this.user$ = this.userService.user$;

  }
  ngOnDestroy(): void {
    this.productService.DestroyDepartments();
  }

 

  

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    //const id = this.route.snapshot.params.id // any param name after "params"

    this.department_fk = Number(CryptoJS.AES.decrypt(decodeURIComponent(id!), "id").toString(CryptoJS.enc.Utf8));


    this.user$.pipe(filter(x => !!x),take(1))
    .subscribe((response)=>
    {
    if(response)
    {
      this.user = response;
    
      if(this.department_fk)
      {
      let userId: number;
      if(!response.isAdmin)
            userId = Number(localStorage.getItem('user_id')!);
      else
             userId =  Number(localStorage.getItem('See_as_user_id')!); 

      let search = new SearchModelClass(userId);
      search.departmentFk = this.department_fk;

     
   
    this.productService.GetProductsByDepartment(search).subscribe(()=>{
    });
      }
  
  }});

    this.product$ = this.productService.productPage$;

  }

  openProduct(id:number)
  {
    let nekID = encodeURIComponent(CryptoJS.AES.encrypt(id.toString(),"id").toString());
    //encodeURIComponent
    
    this.router.navigate(['auth/home/product',nekID]);
    
  }




  
}



