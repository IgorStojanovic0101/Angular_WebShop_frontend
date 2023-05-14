import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDepartment } from 'src/app/models/navbar';
import { FilterPageService } from 'src/app/shared/services/filterPage/filter-page.service';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-departments',
  templateUrl: './product-departments.component.html',
  styleUrls: ['./product-departments.component.css']
})
export class ProductDepartmentsComponent implements OnInit {

  constructor(private filterService: FilterPageService, private productService:ProductsService,private router:Router,private route: ActivatedRoute,private service: MasterService, private modalService: NgbModal, private httpclient: HttpClient,private sanitizer: DomSanitizer) 
  {
  

    this.filterService.getFilterEvent().subscribe((response)=>
    {
      // response.categoryFk = 0;
      // response.departmentFk = this.department_fk;

      // console.log("Filter - department",response);

       this.productService.FilterProducts(response);
       //this.filterService.ResetFilterEvent();

    });
  }
  ngOnInit(): void {

     let departments = this.route.snapshot.queryParamMap.get('departments')!;
     console.log(departments);

  }

}
