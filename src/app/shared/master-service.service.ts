import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { IProduct, IProductUpload, newProduct } from '../models/product';
import { ServiceUrls } from '../models/urls/urls';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBasket } from '../models/basket';
import { IUser } from '../models/user';
import { IHistory } from '../models/history';
import { ICategory, IDepartment, INavBar } from '../models/navbar';
import { IHome } from '../models/home';
import { IProductsPage } from '../models/products-page';
import { Filter, IFilter } from '../models/filter';
import { SharedModel } from '../models/shared-model';
import { SearchModel, SearchModelClass } from '../models/search-model';
import { IHomeRow2 } from '../models/home-row2';
import { IHomeRow4 } from '../models/home-row4';
import { IHomeRow5 } from '../models/home-row5';
@Injectable({
  providedIn: 'root'
})
export class MasterService {


// works!

  //val se koristi kao treba da saljem celu klasu kao argument, a ako je samo neki parametar kao id,name, onda mora da se navede..
  
  constructor(private http:HttpClient) { }

  getUserList():Observable<IUser[]>{
    return this.http.get<IUser[]>(new ServiceUrls.User().GetUsers);
  }
  findUser(val:IUser):Observable<IUser>{
    return this.http.post<IUser>(new ServiceUrls.User().FindUsers,val);
  }
  SetUpUser(val:any):Observable<any>{
    return this.http.post<any>(new ServiceUrls.User().SetUp,val);
  }
  GetUserById(val:number):Observable<IUser>
  {
    return this.http.post<IUser>(new ServiceUrls.User().GetUserById+`/?userId=${val}`,{});

  }
 


  GetProduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(new ServiceUrls.Product().GetProducts);
  }
  GetGroupProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(new ServiceUrls.Product().GetGroupProducts);
  }
  SearchProducts(model:SearchModelClass):Observable<IProductsPage>{
   return this.http.post<IProductsPage>(new ServiceUrls.Product().SearchProducts,model);
  // Products/SearchProducts?search=Igor
  }
  GetProductsProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(new ServiceUrls.Product().GetGroupProducts);
  }

  GetProductsByDepartmentFk(model:SearchModelClass):Observable<IProductsPage>{
    return this.http.post<IProductsPage>(new ServiceUrls.Product().GetProductsByDepartmentFk,model);
  }

  GetProductbycode(val:number):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Product().GetProductbycode+`+/?id=${val}`,{});
  }
  GetProductbyId(val:number):Observable<IProduct>{
    return this.http.post<IProduct>(new ServiceUrls.Product().GetProductbyId+`/?id=${val}`,{});
  }

  GetProductbyCategory(val:SearchModelClass):Observable<IProductsPage>{
    return this.http.post<IProductsPage>(new ServiceUrls.Product().GetProductsByCategoryFk,val);
  }
  GetProductListbyCategory(val:number):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Product().GetProductListByCategoryFk+`/?category_id=${val}`,{});
  }

  FilterProducts(filter : Filter):Observable<IProductsPage>{
    return this.http.post<IProductsPage>(new ServiceUrls.Product().FilterProducts,filter);
  }
  FilterHistoryProducts(val:number, filter : Filter):Observable<IHistory>{
    return this.http.post<IHistory>(new ServiceUrls.OrderHistory().FilterHistoryProducts+`/?user_id=${val}`,filter);
  }

  SetProduct(product:IProductUpload): Observable<SharedModel>
  {
    return this.http.post<SharedModel>(new ServiceUrls.Product().SetProduct,product);

  }





  ////////////////////////////////////////////////////////


  GetBasket(val:any):Observable<IBasket>{
    return this.http.post<IBasket>(new ServiceUrls.Basket().GetBacket+`/?user_id=${val}`,{});
  }
  GetBasketById(val:any):Observable<IBasket>{
    return this.http.post<IBasket>(new ServiceUrls.Basket().GetBacketById+`/?pk=${val}`,{});
  }
  SetBaset(basket : IBasket):Observable<IBasket>{
    return this.http.post<IBasket>(new ServiceUrls.Basket().SetBacket,basket);
  }

  GetHistory(val:any):Observable<IHistory>{
    return this.http.post<IHistory>(new ServiceUrls.OrderHistory().GetHistory+`/?user_id=${val}`,{});
  }
  SetHistory(history:IHistory):Observable<IHistory>{
    return this.http.post<IHistory>(new ServiceUrls.OrderHistory().SetHistory,history);
  }


  GetNavBar(val:any):Observable<INavBar>{
    return this.http.post<INavBar>(new ServiceUrls.Department().GetNavBar+`/?user_id=${val}`,{});
  }

  GetHome(val:any):Observable<IHome>{
    return this.http.post<IHome>(new ServiceUrls.Home().GetHome+`/?user_id=${val}`,{});
  }
  GetHomeDepartments(val:any):Observable<IDepartment[]>{
    return this.http.post<IDepartment[]>(new ServiceUrls.Home().GetDepartments+`/?user_id=${val}`,{});
  }

  GetHomeCategories(val:any):Observable<ICategory[]>{
    return this.http.post<ICategory[]>(new ServiceUrls.Home().GetCategories+`/?user_id=${val}`,{});
  }

  GetRow1Products_1(val:any):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Home().GetRow1Products_1+`/?user_id=${val}`,{});
  }
  GetRow1Products_2(val:any):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Home().GetRow1Products_2+`/?user_id=${val}`,{});
  }
  GetRow2(val:any):Observable<IHomeRow2>{
    return this.http.post<IHomeRow2>(new ServiceUrls.Home().GetRow2+`/?user_id=${val}`,{});
  }
  GetRow3(val:any,department_id:number):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Home().GetRow3+`/?user_id=${val}&&department_id=${department_id}`,{});
  }

  GetProductsForTopCategory(categoryId:number,user_id:number):Observable<IHomeRow4>{
    return this.http.post<IHomeRow4>(new ServiceUrls.Home().GetProductsForTopCategory+`/?user_id=${user_id}&&category_id=${categoryId}`,{});
  }

  GetRow5(val:any):Observable<IHomeRow5>{
    return this.http.post<IHomeRow5>(new ServiceUrls.Home().GetRow5+`/?user_id=${val}`,{});
  }
  GetRow6(model:SearchModelClass):Observable<IProduct[]>{
    return this.http.post<IProduct[]>(new ServiceUrls.Home().GetRow6,model);
  }

  SetDepartmentML(model:SearchModel):Observable<SharedModel>{
    return this.http.post<SharedModel>(new ServiceUrls.Home().SetDepartmentML,model);
  }
  SetCategoryML(model:SearchModel):Observable<SharedModel>{
    return this.http.post<SharedModel>(new ServiceUrls.Home().SetCategoryML,model);
  }



//Admin
GetDepartments():Observable<IDepartment[]>{
  return this.http.get<IDepartment[]>(new ServiceUrls.Department().GetDepartments);

}
  GetCategories(department_id:number)
  {
    //return this.http.get<ICategory[]>(new ServiceUrls.Department().GetDepartments);
    return this.http.post<ICategory[]>(new ServiceUrls.Department().GetCategories+`/?department_id=${department_id}`,{});

  }

  GetAllCategories(){
    //return this.http.get<ICategory[]>(new ServiceUrls.Department().GetDepartments);
    return this.http.get<ICategory[]>(new ServiceUrls.Department().GetAllCategories);

  }

  SetDepartment(department:IDepartment): Observable<SharedModel>
  {
    return this.http.post<SharedModel>(new ServiceUrls.Department().SetDepartment,department);

  }

  SetCategory(category:ICategory): Observable<SharedModel>
  {
    return this.http.post<SharedModel>(new ServiceUrls.Department().SetCategory,category);

  }


}
