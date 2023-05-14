import {CUSTOM_ELEMENTS_SCHEMA , NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './components/users/users.component';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/group-products/group-products.component';
import { AddImageComponent } from './components/group-products/add-image/add-image.component';
import { ShowUsersComponent } from './components/users/show-users/show-users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'; 
import {MatListModule} from '@angular/material/list'; 
import { NgImageSliderModule } from 'ng-image-slider';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { DragScrollModule } from 'ngx-drag-scroll';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { SingleProductComponent } from './components/single-product/single-product.component'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from './components/auth/auth.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio';
import { ProductComponent } from './components/product/product.component';
import { InterceptorService } from './components/loader/interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from './shared/services/user/user.service';
import { KorpaService } from './shared/services/korpa/korpa.service';
import { BasketComponent } from './components/basket/basket.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BuyAllSuccesComponent } from './components/buy-all-succes/buy-all-succes.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { DataimportComponent } from './components/dataimport/dataimport.component';
import { ProductDepartmentsComponent } from './components/product-departments/product-departments.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { Row1Component } from './components/home/row1/row1.component';
import { Row2Component } from './components/home/row2/row2.component';
import { Row3Component } from './components/home/row3/row3.component';
import { Row4Component } from './components/home/row4/row4.component';
import { Row5Component } from './components/home/row5/row5.component';
import { Row6Component } from './components/home/row6/row6.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
    AddImageComponent,
    ShowUsersComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    SingleProductComponent,
    AuthComponent,
    ProductComponent,
    BasketComponent,
    OrderTotalsComponent,
    BuyAllSuccesComponent,
    OrderHistoryComponent,
    FilterComponent,
    SearchComponent,
    AdminComponent,
    DataimportComponent,
    ProductDepartmentsComponent,
    UpdateProductComponent,
    Row1Component,
    Row2Component,
    Row3Component,
    Row4Component,
    Row5Component,
    Row6Component,
    

    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgImageSliderModule,
    DragScrollModule,
    MatGridListModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxSpinnerModule,   
    NgbDropdownModule 
    
    
  ],
  providers: [MasterService,UserService,KorpaService,  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
