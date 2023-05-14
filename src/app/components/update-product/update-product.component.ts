import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ProductStatus } from 'src/app/models/enums/productStatus';
import { ICategory, IDepartment } from 'src/app/models/navbar';
import { IProduct, IProductUpload } from 'src/app/models/product';
import { DataimportService } from 'src/app/shared/services/dataimport/dataimport.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  
  productFrom:any = FormGroup;
  departmentForm:any = FormGroup;
  categoryForm:any = FormGroup;

  departments$!:Observable<IDepartment[] | null>;
  categories$!:Observable<ICategory[] | null>;
  products$!:Observable<IProduct[] | null>;
  product$!:Observable<IProduct | null>;

  base64!:string;
  categoryFk!:number;
  departmentFk!:number;
  productFk!:number;

  fileSelected!:File;
  constructor( private fb:FormBuilder,private DataImportService: DataimportService,private productService: ProductsService) { }

  ngOnInit(): void {

    this.productFrom = this.fb.group({
      ProductName:[],
      ProductDetails:[],
      ProductPrice:[],
      MainPhoto:[],

     
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
    this.DataImportService.GetProductsFromCategory(this.categoryFk).subscribe(()=>{

    });
    this.products$ = this.DataImportService.products$;

  }
  onSelectProduct(event:any)
  {
    this.productFk = event.target.value;
    this.productService.GetProductById(this.productFk).subscribe(()=>{

    });
    this.product$ = this.productService.product$;
  
  

  }


  ProductForm()
  {

   let ProductName = this.productFrom.value.ProductName;
    let ProductPrice = this.productFrom.value.ProductPrice;
    let MainPhoto = this.productFrom.value.MainPhoto;
    let ProductDetails = this.productFrom.value.ProductDetails;

    let productData = this.productService.getCurrentProductValue()!;

    let productUpload:IProductUpload =  { 
      ProductPk: productData.ProductPk,
      ProductName: ProductName,
      ProductDetails:ProductDetails,
      ProductPrice:ProductPrice,
      CategoryFk:this.categoryFk,
      Base64File:this.base64,
      MainPhoto:MainPhoto,
      ProductStatus:ProductStatus.UpdateProduct
     };
      console.log(productUpload);


    this.DataImportService.SetProduct(productUpload);
    console.log("Product Fk" ,this.productFk);

    this.productService.GetProductById(this.productFk).subscribe(()=>{

    });

    this.product$ = this.productService.product$;
    console.log("Product value",this.productService.getCurrentProductValue());



  //  let formdata = new FormData();
   //formdata.append("file",this.files,this.files.name);
//console.log( formdata);
   // console.log(ProductName,ProductPrice,this.categoryFk);

  }


  ImageUpload(event:any)
  {
    this.fileSelected = event.target.files[0];

    this.convertFileToBase64(this.fileSelected);
    
   // console.log("Image Url",this.ImageUpload)


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
