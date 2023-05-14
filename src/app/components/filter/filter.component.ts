import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateStatus } from 'src/app/models/enums/CreateStatus';
import { FilterStatus } from 'src/app/models/enums/filterStatus';
import { Filter, IFilter } from 'src/app/models/filter';
import { FilterPageService } from 'src/app/shared/services/filterPage/filter-page.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  @Input() categoryFk!:number;
  @Input() departmentFk!:number;
  @Input() search!:boolean;
  @Input() search_input!:string;

  filter!:FormGroup;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  stars = Array(5).fill("star_border");

  @Input('starCount')  starCount: number = 5;
  @Output() private ratingUpdated = new EventEmitter();
  star_rating = 0
  snackBarDuration: number = 2000;
  ratingArr:any = [];

  constructor(private filterService: FilterPageService,private _snackBar: MatSnackBar,private _formBuilder: FormBuilder) { 
    //console.log("Filterii",this.categoryFk,this.departmentFk);

  }

  ngOnInit(): void {

   // console.log("Filterii",this.categoryFk,this.departmentFk);
    this.filter = this._formBuilder.group({
      Ten_to_20: false,
      Twenty_to_30: false,
  
      radio:false,
    });


    this.filter.valueChanges.subscribe((value: any)=>{
      let status = FilterStatus.None;
      console.log(value);
      if(this.search)
        status = FilterStatus.Search;   
      else
      {
        if(this.departmentFk > 0)
          status = FilterStatus.Department;
        if(this.categoryFk > 0)
          status = FilterStatus.Category;
      }
      let filter = this.mapFilter(this.filter.value,this.star_rating,this.search,this.search_input,this.departmentFk,this.categoryFk,status);
      this.filterService.SetFilter(filter);
     });
  }

 //Star change
  onClick(index:number) {

    
    this.star_rating = index + 1;
    let status = FilterStatus.None;
    if(this.search)
    status = FilterStatus.Search;   
      else
      {
        if(this.departmentFk > 0)
          status = FilterStatus.Department;
        if(this.categoryFk > 0)
          status = FilterStatus.Category;
      }

   // console.log(this.filter.value, this.star_rating);
    let filter = this.mapFilter(this.filter.value,this.star_rating,this.search,this.search_input,this.departmentFk,this.categoryFk,status);
    this.filterService.SetFilter(filter);

    //console.log("IFilter",filter);

    this.stars = Array( this.star_rating).fill("star").concat(Array(5- this.star_rating).fill("star_border"));
    this._snackBar.open('You rated ' +  this.star_rating + ' / ' + this.starCount, '', {
     duration: this.snackBarDuration
   });
    this.ratingUpdated.emit( this.star_rating);

    


    return false;
  }

  private mapFilter(value:any, stars:number,search:boolean,search_input:string, department_fk:number,category_fk:number,stat:FilterStatus) : Filter {
    return {
      Ten_to_20 : value.Ten_to_20,
      Twenty_to_30: value.Twenty_to_30,
      radio: value.radio,
      stars : stars,
      categoryFk:category_fk,
      departmentFk:department_fk,
      search:search,
      search_input:search_input,
      status:stat

    }
  }

  Reset()
  {
    this.stars = Array(5).fill("star_border");
    let status = FilterStatus.None;
    if(this.search)
        status = FilterStatus.Search;   
      else
      {
        if(this.departmentFk > 0)
          status = FilterStatus.Department;
        if(this.categoryFk > 0)
          status = FilterStatus.Category;
      }

    this.filter.setValue({
      Ten_to_20: false,
      Twenty_to_30: false,
  
      radio:false,
    });
    this.star_rating = 0;

    let filter = this.mapFilter(this.filter.value,this.star_rating,this.search,this.search_input,this.departmentFk,this.categoryFk,status);
    this.filterService.SetFilter(filter);
  }

}
