import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FooterComponent,
    FilterComponent,
    SearchComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    NgbDropdownModule
  ],
  exports: [
    FooterComponent,
    FilterComponent,
    SearchComponent,
    AuthComponent
  ]
})
export class FrameModule { }
