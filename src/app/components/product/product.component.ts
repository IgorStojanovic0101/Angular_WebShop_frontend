import { Component, ElementRef, EventEmitter, Input, OnInit,OnDestroy, Output, ViewChild, ViewEncapsulation,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import { IProduct, newProduct } from 'src/app/models/product';
import { MasterService } from 'src/app/shared/master-service.service';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageModel } from 'src/app/models/image-list-item';
import { KorpaService } from 'src/app/shared/korpa/korpa.service';
import { UserService } from 'src/app/shared/user/user.service';
import { filter, Observable, take } from 'rxjs';
import { ProductsService } from 'src/app/shared/products/products.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy  {


  @ViewChild('contentImageList') addImageListview !: ElementRef;

  product$!:Observable<IProduct | null>;
  itemCount:number = 1;
  original_price!:number;
  price!:number

  constructor(private productService : ProductsService, private userService: UserService, private korpa: KorpaService, private modalService: NgbModal,private service: MasterService,private route: ActivatedRoute,private router:Router) {
   
   }
  


  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
   
    //const id = this.route.snapshot.params.id // any param name after "params"

    let decoded = CryptoJS.AES.decrypt(decodeURIComponent(id!), "id").toString(CryptoJS.enc.Utf8)
   

    this.productService.GetProductById(Number(decoded)).subscribe(()=>{
    });
   
    this.product$ = this.productService.product$;
    this.product$.pipe(filter(x => !!x),take(1)).subscribe((response)=>{
      if(response)
      {
        this.price = response.ProductPrice;
        this.original_price = response.ProductPrice;
      }
    });
    //this.current_image = this.product.Images[0];
   // this.images_menu =  this.product?.Images;      
    
    //console.log("images_menu : ",this.images_menu);

  }
 
  ngOnDestroy(): void {
    this.productService.DestroyProduct();
  }

  ImageChange(image : ImageModel)
  {

    this.productService.BigImageChange(image);
  }


  Getproductslide(id: any) {
 
  this.openImageList();
     
}


openImageList() {
  this.modalService.open(this.addImageListview, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  }, (reason) => {
  });
}

addItemToBasket()
{
  console.log("Item count",this.itemCount);
  let user = this.userService.GetUserData()!;
 this.korpa.addItemToBasket(this.productService.getCurrentProductValue()!,this.itemCount,user.UserPk);
}

IncrementCount()
{
  this.itemCount++;
  this.price = this.original_price * this.itemCount;
}
DecrementCount()
{
  this.itemCount--;
  this.price = this.original_price * this.itemCount;

}
}
