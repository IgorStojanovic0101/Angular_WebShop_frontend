import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Filter, IFilter } from 'src/app/models/filter';
import { IHistory } from 'src/app/models/history';
import { ImageModel } from 'src/app/models/image-list-item';
import { IProduct } from 'src/app/models/product';
import { IProductsPage } from 'src/app/models/products-page';
import { SearchModelClass } from 'src/app/models/search-model';
import { MasterService } from '../master-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productPageSource = new BehaviorSubject<IProductsPage | null >(null);
  productPage$ = this.productPageSource.asObservable();

  private productSource = new BehaviorSubject<IProduct | null >(null);
  product$ = this.productSource.asObservable();

  private historySource = new BehaviorSubject<IHistory | null >(null);
  history$ = this.historySource.asObservable();

  //private 
  constructor(private service: MasterService) { }



  GetProductbyCategory(search:SearchModelClass)
  {
   return this.service.GetProductbyCategory(search).pipe
   (
    map((productPage:IProductsPage) => {
      this.productPageSource.next(productPage);
    

    })
   );
  }
  SearchProducts(model:SearchModelClass)
  {
    return this.service.SearchProducts(model).pipe
    (
     map((product:IProductsPage) => {
       this.productPageSource.next(product);
     
 
     })
    );
  }

  GetProductsByDepartment(model:SearchModelClass)
  {
    return this.service.GetProductsByDepartmentFk(model).pipe
   (
    map((product:IProductsPage) => {
      this.productPageSource.next(product);
    })
   );
  }
  DestroyDepartments()
  {
    this.productPageSource.next(null);
    
  }
  DestroyCategories()
  {
    this.productPageSource.next(null);
    
  }

  
  FilterProducts(filter : Filter)
  {

     return this.service.FilterProducts(filter).subscribe((response:IProductsPage)=>
     {
      this.productPageSource.next(response);
    
     })
     
  }
    
  FilterHistoryProducts(userId:number,filter : Filter)
  {

     return this.service.FilterHistoryProducts(userId,filter).subscribe((response:IHistory)=>
     {
      this.historySource.next(response);
    
     })
     
  }
  GetProductById(productId:number)
  {
    return this.service.GetProductbyId(productId).pipe
    (
     map((product:IProduct) => {
       this.productSource.next(product);
     })
    );
  }
  BigImageChange( image:ImageModel)
  {
    let product = this.getCurrentProductValue()!;
    product.current_image = image;
    this.productSource.next(product);

  }

  getCurrentProductPageValue()
  {
    return this.productPageSource.value;
  }
  getCurrentProductValue()
  {
    return this.productSource.value;
  }
  DestroyProduct()
  {
    this.productSource.next(null);

  }
  DestroyHistory()
  {
    this.historySource.next(null);

  }
}

