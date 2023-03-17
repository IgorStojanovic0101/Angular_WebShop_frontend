import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { IProduct, IProductUpload } from 'src/app/models/product';
import { SharedModel } from 'src/app/models/shared-model';
import { MasterService } from '../master-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductStatus } from 'src/app/models/enums/productStatus';

@Injectable({
  providedIn: 'root'
})
export class DataimportService {

  private departmentSource = new BehaviorSubject<IDepartment [] | null >(null);
  departments$ = this.departmentSource.asObservable();

  private categorySource = new BehaviorSubject<ICategory[] | null >(null);
  categories$ = this.categorySource.asObservable();

  
  private productSource = new BehaviorSubject<IProduct[] | null >(null);
  products$ = this.productSource.asObservable();

  constructor(private service: MasterService, public tostr : ToastrService) { }


  GetDepartments()
  {
   return this.service.GetDepartments().pipe
   (
    map((departments:IDepartment[]) => {
      this.departmentSource.next(departments);

    })
   );
  }

  GetCategories(department_id:number)
  {
   return this.service.GetCategories(department_id).pipe
   (
    map((categories:ICategory[]) => {
      this.categorySource.next(categories);

    })
   );
  }
  GetAllCategories()
  {
   return this.service.GetAllCategories().pipe
   (
    map((categories:ICategory[]) => {
      this.categorySource.next(categories);

    })
   );
  }
  GetProductsFromCategory(categoryId:number)
  {
   return this.service.GetProductListbyCategory(categoryId).pipe
   (
    map((product:IProduct[]) => {
      this.productSource.next(product);

    })
   );
  }

  SetProduct(product:IProductUpload)
  {
    return this.service.SetProduct(product).subscribe((response:SharedModel)=>
    {
      if(product.ProductStatus === ProductStatus.CreateProduct)
      {
      this.tostr.success("Product successfuly added");
      //console.log(response);
      }
      else
      {
        this.tostr.success("Product successfuly updated");

      }
    })
  }

  SetDepartment(department:IDepartment)
  {
    return this.service.SetDepartment(department).subscribe((response:SharedModel)=>
    {
      console.log(response);
    })
  }
  SetCategory(category:ICategory)
  {
    return this.service.SetCategory(category).subscribe((response:SharedModel)=>
    {
      console.log(response);
    })
  }
  
}
