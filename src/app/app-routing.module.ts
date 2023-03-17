import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/group-products/group-products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { ProductComponent } from './components/product/product.component';
import { BasketComponent } from './components/basket/basket.component';
import { BuyAllSuccesComponent } from './components/buy-all-succes/buy-all-succes.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { DataimportComponent } from './components/dataimport/dataimport.component';
import { ProductDepartmentsComponent } from './components/product-departments/product-departments.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
const routes: Routes = [
  {path:'users',component:UsersComponent},
  {path:'items',component:ProductsComponent},
 // {path:'auth/home/product-group/:id',component:ProductsComponent},
 // {path:'auth/home/product-one/:id',component:SingleProductComponent},
  {path:'auth',component:AuthComponent,canActivate:[AuthGuard],
  children: [{path:"home",component:HomeComponent,canActivate:[AuthGuard]},
             {path:'home/product-group/:id',component:ProductsComponent},
             {path:'home/product-one/:id',component:SingleProductComponent},
             {path:'home/product-one',component:SingleProductComponent},
             {path:'home/product/:id',component:ProductComponent},
             {path:'home/basket',component:BasketComponent},
             {path:'home/buy-all-success',component:BuyAllSuccesComponent},
             {path:'home/order-history',component:OrderHistoryComponent},
             {path:'home/search',component:SearchComponent},
             {path:'home/product-dept',component:ProductDepartmentsComponent},
             {path:'admin',component:AdminComponent},
             {path:'admin/dataimport',component:DataimportComponent},
             {path:'admin/updatedata',component:UpdateProductComponent}

             




  ]
  },
 // {path:'auth/home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'' , redirectTo: 'login',pathMatch:'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
