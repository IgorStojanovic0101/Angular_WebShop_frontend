import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { DataimportComponent } from 'src/app/components/dataimport/dataimport.component';
import { ProductDepartmentsComponent } from 'src/app/components/product-departments/product-departments.component';
import { UpdateProductComponent } from 'src/app/components/update-product/update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AdminComponent,
    DataimportComponent,
    ProductDepartmentsComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule, 
    MaterialModule
  ],
  exports: [
    AdminComponent,
    DataimportComponent,
    ProductDepartmentsComponent,
    UpdateProductComponent,
  ]
})
export class AdminModule { }
