import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  // ...
  getUserList():Observable<IUser[]>{
    return this.http.get<IUser[]>(ServiceUrls.User.GetUsers);
  }
  findUser(val:IUser):Observable<IUser>{
    return this.http.post<IUser>(ServiceUrls.User.FindUsers,val);
  }
  SetUpUser(val:any):Observable<any>{
    return this.http.post<any>(ServiceUrls.User.SetUp,val);
  }
  GetUserById(val: number): Observable<IUser> {
    const params = new HttpParams().set('userId', val.toString());
    return this.http.post<IUser>(ServiceUrls.User.GetUserById, null, { params });
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
    const params = new HttpParams().set('id', val.toString());
    return this.http.post<IProduct[]>(ServiceUrls.Product.GetProductbycode, null, { params });
  }

  GetProductbyId(val: number): Observable<IProduct> {
    const params = new HttpParams().set('id', val.toString());
    return this.http.post<IProduct>(ServiceUrls.Product.GetProductbyId, null, { params });
  }
  GetProductbyCategory(val: SearchModelClass): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.GetProductsByCategoryFk, val);
  }

  GetProductListbyCategory(val: number): Observable<IProduct[]> {
    const params = new HttpParams().set('category_id', val.toString());
    return this.http.post<IProduct[]>(ServiceUrls.Product.GetProductListByCategoryFk, null, { params });
  }
  FilterProducts(filter: Filter): Observable<IProductsPage> {
    return this.http.post<IProductsPage>(ServiceUrls.Product.FilterProducts, filter);
  }
  

  FilterHistoryProducts(val: number, filter: Filter): Observable<IHistory> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.FilterHistoryProducts, filter, { params });
  }

  SetProduct(product: IProductUpload): Observable<SharedModel> {
    return this.http.post<SharedModel>(ServiceUrls.Product.SetProduct, product);
  }
  GetBasket(val: any): Observable<IBasket> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IBasket>(ServiceUrls.Basket.GetBacket, null, { params });
  }

  GetBasketById(val: any): Observable<IBasket> {
    const params = new HttpParams().set('pk', val.toString());
    return this.http.post<IBasket>(ServiceUrls.Basket.GetBacketById, null, { params });
  }
  SetBaset(basket: IBasket): Observable<IBasket> {
    return this.http.post<IBasket>(ServiceUrls.Basket.SetBacket, basket);
  }
  

  GetHistory(val: any): Observable<IHistory> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.GetHistory, null, { params });

  }
  SetHistory(history: IHistory): Observable<IHistory> {
    return this.http.post<IHistory>(ServiceUrls.OrderHistory.SetHistory, history);
  }
  

  GetNavBar(val: any): Observable<INavBar> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<INavBar>(ServiceUrls.Department.GetNavBar, null, { params });
  }
  
 
  GetHome(val: any): Observable<IHome> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IHome>(ServiceUrls.Home.GetHome, null, { params });
    }
    
    GetHomeDepartments(val: any): Observable<IDepartment[]> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IDepartment[]>(ServiceUrls.Home.GetDepartments, null, { params });
    }
    
    GetHomeCategories(val: any): Observable<ICategory[]> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<ICategory[]>(ServiceUrls.Home.GetCategories, null, { params });
    }
    
    GetRow1Products_1(val: any): Observable<IProduct[]> 
    {
          const params = new HttpParams().set('user_id', val.toString());
          return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow1Products_1, null, { params });
    }
    
    GetRow1Products_2(val: any): Observable<IProduct[]> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow1Products_2, null, { params });
    }
    
    GetRow2(val: any): Observable<IHomeRow2> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IHomeRow2>(ServiceUrls.Home.GetRow2, null, { params });
    }
    
    GetRow3(val: any, department_id: number): Observable<IProduct[]> {
    const params = new HttpParams().set('user_id', val.toString()).set('department_id', department_id.toString());
    return this.http.post<IProduct[]>(ServiceUrls.Home.GetRow3, null, { params });
    }
    
    GetProductsForTopCategory(categoryId: number, user_id: number): Observable<IHomeRow4> {
    const params = new HttpParams().set('user_id', user_id.toString()).set('category_id', categoryId.toString());
    return this.http.post<IHomeRow4>(ServiceUrls.Home.GetProductsForTopCategory, null, { params });
    }
    
    GetRow5(val: any): Observable<IHomeRow5> {
    const params = new HttpParams().set('user_id', val.toString());
    return this.http.post<IHomeRow5>(ServiceUrls.Home.GetRow5, null, { params });
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
    const params = new HttpParams().set('department_id', department_id.toString());
    return this.http.post<ICategory[]>(ServiceUrls.Department.GetCategories, null, { params });
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
