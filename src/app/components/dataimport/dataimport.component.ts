import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { ProductStatus } from 'src/app/models/enums/productStatus';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { IProductUpload } from 'src/app/models/product';
import { DataimportService } from 'src/app/shared/services/dataimport/dataimport.service';

@Component({
  selector: 'app-dataimport',
  templateUrl: './dataimport.component.html',
  styleUrls: ['./dataimport.component.css']
})
export class DataimportComponent implements OnInit {

  departments$!:Observable<IDepartment[] | null>;
  categories$!:Observable<ICategory[] | null>;

  categoryFk!:number;
  departmentFk!:number;
  fileSelected!:File;

  departmentfileSelected!:File;
  categoryfileSelected!:File;


  base64!:string;
 
  productFrom:any = FormGroup;
  departmentForm:any = FormGroup;
  categoryForm:any = FormGroup;

  constructor(private sant : DomSanitizer, private fb:FormBuilder,private DataImportService: DataimportService) { }

  ngOnInit(): void {

    this.productFrom = this.fb.group({
      ProductName:['',Validators.required],
      ProductDetails:[''],
      ProductPrice:['',Validators.required],
     
    });
    this.departmentForm = this.fb.group({
      DepartmentName:['',Validators.required],
     
    });
    this.categoryForm = this.fb.group({
      CategoryName:['',Validators.required],
     
    });


    this.DataImportService.GetDepartments().subscribe(()=>{

    });
    this.departments$ = this.DataImportService.departments$;
  }

  onSelect(event:any)
  {
    this.departmentFk = event.target.value;
    this.DataImportService.GetCategories(Number(event.target.value)).subscribe(()=>{

    });
    this.categories$ = this.DataImportService.categories$;
   // console.log(event.target.value);
  }

  onSelectCategory(event:any)
  {
    this.categoryFk = event.target.value;

  }

  ImageUpload(event:any)
  {
    this.fileSelected = event.target.files[0];

    this.convertFileToBase64(this.fileSelected);
    
   // console.log("Image Url",this.ImageUpload)


  }

  DepartmentImageUpload(event:any)
  {
    this.departmentfileSelected = event.target.files[0];

    this.convertFileToBase64(this.departmentfileSelected);
    
    //console.log("Image Url",this.ImageUpload)

  }

  CategoryImageUpload(event:any)
  {
    this.categoryfileSelected = event.target.files[0];

    this.convertFileToBase64(this.categoryfileSelected);
    
   // console.log("Image Url",this.ImageUpload)

  }


  ProductForm()
  {
    let ProductName = this.productFrom.value.ProductName;
    let ProductPrice = this.productFrom.value.ProductPrice;
    let ProductDetails = this.productFrom.value.ProductDetails;
 
    let productUpload:IProductUpload =  { 
      ProductPk:0,
      ProductName: ProductName,
      ProductDetails :ProductDetails,
      ProductPrice:ProductPrice,
      CategoryFk:this.categoryFk,
      Base64File:this.base64,
      MainPhoto:true,
      ProductStatus:ProductStatus.CreateProduct
     };    
     
     this.DataImportService.SetProduct(productUpload);



  //  let formdata = new FormData();
   //formdata.append("file",this.files,this.files.name);
//console.log( formdata);
    //console.log(ProductName,ProductPrice,this.categoryFk);

  }
  DepartmentForm()
  {
    let DepartmentName = this.departmentForm.value.DepartmentName;

    var send: IDepartment = {DepartmentName : DepartmentName,RecordPk:0,CategoryList:[],slika:this.base64,Score:0};
    this.DataImportService.SetDepartment(send);

  }
  CategoryForm()
  {
    let CategoryName = this.categoryForm.value.CategoryName;
    var send: ICategory = {CategoryName : CategoryName,RecordPk:0,slika:this.base64,DepartmentFk:this.departmentFk,Score:0};
    this.DataImportService.SetCategory(send);
  }
  convertFileToBase64(file:File):void{
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file,subscriber);
    })

    observable.subscribe((d) => {
      console.log(d);
      this.base64 = d;
    })


  }

  readFile(file:File,subscriber:Subscriber<any>)
  {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      subscriber.next(reader.result as string);
      subscriber.complete();
    }
  }
  
}
