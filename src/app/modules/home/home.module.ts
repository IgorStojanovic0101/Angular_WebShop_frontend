import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/components/home/home.component';
import { Row1Component } from 'src/app/components/home/row1/row1.component';
import { Row2Component } from 'src/app/components/home/row2/row2.component';
import { Row3Component } from 'src/app/components/home/row3/row3.component';
import { Row4Component } from 'src/app/components/home/row4/row4.component';
import { Row5Component } from 'src/app/components/home/row5/row5.component';
import { Row6Component } from 'src/app/components/home/row6/row6.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { DragScrollModule } from 'ngx-drag-scroll';



@NgModule({
  declarations: [
    HomeComponent,
    Row1Component,
    Row2Component,
    Row3Component,
    Row4Component,
    Row5Component,
    Row6Component
   
  ],
 imports: [
    CommonModule,
    NgbCarouselModule,
    MaterialModule,
    DragScrollModule
  ],
  exports: [
    
    HomeComponent,
    Row1Component,
    Row2Component,
    Row3Component,
    Row4Component,
    Row5Component,
    Row6Component
  ],
 
})
export class HomeModule { }
