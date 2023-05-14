import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { IProductsPage } from 'src/app/models/products-page';
import { FilterPageService } from 'src/app/shared/services/filterPage/filter-page.service';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import * as CryptoJS from 'crypto-js';  
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SearchModelClass } from 'src/app/models/search-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search!:string;
  product$!:Observable<IProductsPage | null>;
  user$!:Observable<IUser | null>;
  user!:IUser;
  constructor(private userService:UserService,private router:Router,private route: ActivatedRoute,private service: MasterService,private filterService: FilterPageService, private productService:ProductsService) { 


    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.filterService.getFilterEvent().subscribe((response)=>
    {
      // response.categoryFk = this.categoryFk;
      // response.departmentFk = 0;
       console.log("Filter - category",response);
       this.productService.FilterProducts(response);
       //this.filterService.ResetFilterEvent();


    });

    this.user$ = this.userService.user$;

  }

  ngOnInit(): void {

    this.search = this.route.snapshot.queryParamMap.get('search')!;

    this.user$.pipe(filter(x => !!x),take(1))
    .subscribe((response)=>
    {
    if(response)
    { 
      this.user = response;
       if(this.search)
        {
          let userId: number;
          if(!response.isAdmin)
                userId = Number(localStorage.getItem('user_id')!);
          else
                 userId =  Number(localStorage.getItem('See_as_user_id')!); 
     
          let model = new SearchModelClass(userId);
          model.search = this.search;

          this.productService.SearchProducts(model).subscribe(()=>{
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
