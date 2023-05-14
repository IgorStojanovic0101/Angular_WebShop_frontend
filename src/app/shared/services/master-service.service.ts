import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { IBasket } from 'src/app/models/basket';
import { IUser } from 'src/app/models/user';
import { IHistory } from 'src/app/models/history';
import { ICategory, IDepartment, INavBar } from 'src/app/models/navbar';
import { IHome } from 'src/app/models/home';
import { IProductsPage } from 'src/app/models/products-page';
import { Filter, IFilter } from 'src/app/models/filter';
import { SharedModel } from 'src/app/models/shared-model';
import { SearchModel, SearchModelClass } from 'src/app/models/search-model';
import { IHomeRow2 } from 'src/app/models/home-row2';
import { IHomeRow4 } from 'src/app/models/home-row4';
import { IHomeRow5 } from 'src/app/models/home-row5';
import { ServiceUrls } from 'src/app/models/urls/urls';
import { IProduct, IProductUpload } from 'src/app/models/product';
@Injectable({
  providedIn: 'root'
})
export class MasterService {


// works!

  //val se koristi kao treba da saljem celu klasu kao argument, a ako je samo neki parametar kao id,name, onda mora da se navede..
  
  constructor(private http:HttpClient) { }

  getUserList():Observable<IUser[]>{
    return this.http.get<IUser[]>(ServiceUrls.User.GetUsers);
  }
  findUser(val:IUser):Observable<IUser>{
    return this.http.post<IUser>(ServiceUrls.User.FindUsers,val);
  }
  SetUpUser(val:any):Observable<any>{
    return this.http.post<any>(ServiceUrls.User.SetUp,val);
  }
  GetUserById(val:number):Observable<IUser>
  {
    return this.http.post<IUser>(ServiceUrls.User.GetUserById+`/?userId=${val}`,{});

  }
 

  GetProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(ServiceUrls.Product.GetProducts);
  }
  
  GetGroupProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(ServiceUrls.Product.GetGroupProducts);
  }
  
  SearchProducts(model: SearchModelClass): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.SearchProducts, model);
  }
  
  GetProductsByDepartmentFk(model: SearchModelClass): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.GetProductsByDepartmentFk, model);
  }
  
  GetProductbycode(val: number): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Product.GetProductbycode + `/?id=${val}`, {});
  }
  
  GetProductbyId(val: number): Observable<IProduct> {
    return this.http.post<IProduct>(ServiceUrls.Product.GetProductbyId + `/?id=${val}`, {});
  }
  
  GetProductbyCategory(val: SearchModelClass): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.GetProductsByCategoryFk, val);
  }
  
  GetProductListbyCategory(val: number): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Product.GetProductListByCategoryFk + `/?category_id=${val}`, {});
  }
  
  FilterProducts(filter: Filter): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.FilterProducts, filter);
  }
  
  FilterHistoryProducts(val: number, filter: Filter): Observable<IHistory> {
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.FilterHistoryProducts + `/?user_id=${val}`, filter);
  }
  
  SetProduct(product: IProductUpload): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Product.SetProduct, product);
  }



  ////////////////////////////////////////////////////////


  GetBasket(val: any): Observable<IBasket> {
    return this.http.post<IBasket>(ServiceUrls.Basket.GetBacket + `/?user_id=${val}`, {});
  }
  
  GetBasketById(val: any): Observable<IBasket> {
    return this.http.post<IBasket>(ServiceUrls.Basket.GetBacketById + `/?pk=${val}`, {});
  }
  
  SetBaset(basket: IBasket): Observable<IBasket> {
    return this.http.post<IBasket>(ServiceUrls.Basket.SetBacket, basket);
  }
  

  ////////////////////////////////////////////////////////////////////////
  GetHistory(val: any): Observable<IHistory> {
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.GetHistory + `/?user_id=${val}`, {});
  }
  
  SetHistory(history: IHistory): Observable<IHistory> {
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.SetHistory, history);
  }
  
  GetNavBar(val: any): Observable<INavBar> {
    return this.http.post<INavBar>(ServiceUrls.Department.GetNavBar + `/?user_id=${val}`, {});
  }
  
  GetHome(val: any): Observable<IHome> {
    return this.http.post<IHome>(ServiceUrls.Home.GetHome + `/?user_id=${val}`, {});
  }
  
  GetHomeDepartments(val: any): Observable<IDepartment[]> {
    return this.http.post<IDepartment[]>(ServiceUrls.Home.GetDepartments + `/?user_id=${val}`, {});
  }
  
  GetHomeCategories(val: any): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(ServiceUrls.Home.GetCategories + `/?user_id=${val}`, {});
  }
  
  GetRow1Products_1(val: any): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow1Products_1 + `/?user_id=${val}`, {});
  }
  
  GetRow1Products_2(val: any): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow1Products_2 + `/?user_id=${val}`, {});
  }
  
  GetRow2(val: any): Observable<IHomeRow2> {
    return this.http.post<IHomeRow2>(ServiceUrls.Home.GetRow2 + `/?user_id=${val}`, {});
  }
  
  GetRow3(val: any, department_id: number): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow3 + `/?user_id=${val}&&department_id=${department_id}`, {});
  }
  
  GetProductsForTopCategory(categoryId: number, user_id: number): Observable<IHomeRow4> {
    return this.http.post<IHomeRow4>(ServiceUrls.Home.GetProductsForTopCategory + `/?user_id=${user_id}&&category_id=${categoryId}`, {});
  }
  
  GetRow5(val: any): Observable<IHomeRow5> {
    return this.http.post<IHomeRow5>(ServiceUrls.Home.GetRow5 + `/?user_id=${val}`, {});
  }
  
  GetRow6(model: SearchModelClass): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow6, model);
  }
  
  SetDepartmentML(model: SearchModel): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Home.SetDepartmentML, model);
  }
  
  SetCategoryML(model: SearchModel): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Home.SetCategoryML, model);
  }

  //Admin

  
  GetDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(ServiceUrls.Department.GetDepartments);
  }
  
  GetCategories(department_id: number): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(ServiceUrls.Department.GetCategories + `/?department_id=${department_id}`, {});
  }
  
  GetAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(ServiceUrls.Department.GetAllCategories);
  }
  
  SetDepartment(department: IDepartment): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Department.SetDepartment, department);
  }
  
  SetCategory(category: ICategory): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Department.SetCategory, category);
  }

}
