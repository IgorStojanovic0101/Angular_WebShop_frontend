import {CUSTOM_ELEMENTS_SCHEMA , NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/group-products/group-products.component';


import { NgImageSliderModule } from 'ng-image-slider';
import { DragScrollModule } from 'ngx-drag-scroll';

import { SingleProductComponent } from './components/single-product/single-product.component'; 

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


import { MaterialModule } from './modules/material/material.module';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { FrameModule } from './modules/frame/frame.module';
import { AdminModule } from './modules/admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    
    ProductsComponent,
    SingleProductComponent,  
    ProductComponent,
    BasketComponent,
    OrderTotalsComponent,
    BuyAllSuccesComponent,
    OrderHistoryComponent,
    
 
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
    NgImageSliderModule,
    DragScrollModule,  
    NgxSpinnerModule,   
    NgbDropdownModule,


    
 //My modules
    HomeModule, 
    MaterialModule,
    AuthModule,
    FrameModule,
    AdminModule
    
    
  ],
  providers: [MasterService,UserService,KorpaService,  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
