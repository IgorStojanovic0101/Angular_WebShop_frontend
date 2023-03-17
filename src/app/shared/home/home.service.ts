import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IHistory } from 'src/app/models/history';
import { IHome } from 'src/app/models/home';
import { IHomeRow2 } from 'src/app/models/home-row2';
import { IHomeRow4 } from 'src/app/models/home-row4';
import { IHomeRow5 } from 'src/app/models/home-row5';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { IProduct } from 'src/app/models/product';
import { SearchModel, SearchModelClass } from 'src/app/models/search-model';
import { MasterService } from '../master-service.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private homeSource = new BehaviorSubject<IHome | null >(null);
  home$ = this.homeSource.asObservable();

  private departmentSource = new BehaviorSubject<IDepartment[] | null >(null);
  departments$ = this.departmentSource.asObservable();

  
  private categorySource = new BehaviorSubject<ICategory[] | null >(null);
  categories$ = this.categorySource.asObservable();

  private row1Products_1Source = new BehaviorSubject<IProduct[] | null >(null);
  row1Products_1$ = this.row1Products_1Source.asObservable();

  private row1Products_2Source = new BehaviorSubject<IProduct[] | null >(null);
  row1Products_2$ = this.row1Products_2Source.asObservable();

  private row2Items_Source = new BehaviorSubject<IHomeRow2 | null >(null);
  row2Items$ = this.row2Items_Source.asObservable();

  private row3ProductsSource = new BehaviorSubject<IProduct[] | null >(null);
  row3Products$ = this.row3ProductsSource.asObservable();

  private productsForTopCategorySource = new BehaviorSubject<IHomeRow4 | null >(null);
  productsForTopCategory$ = this.productsForTopCategorySource.asObservable();

  private row5Items_Source = new BehaviorSubject<IHomeRow5 | null >(null);
  row5Items$ = this.row5Items_Source.asObservable();

  private row6ProductsSource = new BehaviorSubject<IProduct[] | null >(null);
  row6Products$ = this.row6ProductsSource.asObservable();


  constructor(private service: MasterService) { }


  getHome(id:number)
  {
    console.log("Id",id);
   return this.service.GetHome(id).pipe
   (
    map((home:IHome) => {
      this.homeSource.next(home);
    })
   );
  }
  getDepartments(id:number)
  {
   // console.log("Id",id);
   return this.service.GetHomeDepartments(id).pipe
   (
    map((departments:IDepartment[]) => {
      this.departmentSource.next(departments);
    })
   );
  }
  getCategories(id:number)
  {
   // console.log("Id",id);
   return this.service.GetHomeCategories(id).pipe
   (
    map((categories:ICategory[]) => {
      this.categorySource.next(categories);
    })
   );
  }
  getCategoriesValues()
  {
    return this.categorySource.value;
  }

  GetRow1Products_1(id:number)
  {
   // console.log("Id",id);
   return this.service.GetRow1Products_1(id).pipe
   (
    map((products:IProduct[]) => {
      this.row1Products_1Source.next(products);
    })
   );
  }
  GetRow1Products_2(id:number)
  {
   // console.log("Id",id);
   return this.service.GetRow1Products_2(id).pipe
   (
    map((products:IProduct[]) => {
      this.row1Products_2Source.next(products);
    })
   );
  }
  GetRow2(id:number)
  {
   // console.log("Id",id);
   return this.service.GetRow2(id).pipe
   (
    map((products:IHomeRow2) => {
      this.row2Items_Source.next(products);
    })
   );
  }
  GetRow3(id:number,department_id:number)
  {
   // console.log("Id",id);
   return this.service.GetRow3(id,department_id).pipe
   (
    map((products:IProduct[]) => {
      this.row3ProductsSource.next(products);
    })
   );
  }
  GetRow6(model:SearchModelClass)
  {
   // console.log("Id",id);
   return this.service.GetRow6(model).pipe
   (
    map((products:IProduct[]) => {
      this.row6ProductsSource.next(products);
    })
   );
  }
  GetProductsForTopCategory(categoryId:number,userId:number)
  {
   // console.log("Id",id);
   return this.service.GetProductsForTopCategory(categoryId,userId).pipe
   (
    map((row4:IHomeRow4) => {
      this.productsForTopCategorySource.next(row4);
    })
   );
  }
  GetRow5(id:number)
  {
   // console.log("Id",id);
   return this.service.GetRow5(id).pipe
   (
    map((row5:IHomeRow5) => {
      this.row5Items_Source.next(row5);
    })
   );
  }





  GetRow2Items_Source()
  {
    return this.row2Items_Source.value;
  }

  SetDepartmentML(val:SearchModel)
  {
   
   return this.service.SetDepartmentML(val).subscribe((response)=>
   {
      console.log("SetDepartmentML",response);
   }
   );
  }
  SetCategoryML(val:SearchModel)
  {
   
   return this.service.SetCategoryML(val).subscribe((response)=>
   {
      console.log("SetCategoryML",response);
   }
   );
  }

  


 DestroyHome()
 {
  this.homeSource.next(null);
  this.departmentSource.next(null);
  this.categorySource.next(null);
  this.row1Products_1Source.next(null);
  this.row1Products_2Source.next(null);
  this.row2Items_Source.next(null);
  this.row3ProductsSource.next(null);
 }
  getCurrentHomeValue()
  {
    return this.homeSource.value;
  }
}
