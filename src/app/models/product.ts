import { SafeUrl } from "@angular/platform-browser";
import { SafeResourceUrl,SafeValue } from '@angular/platform-browser';
import { ProductStatus } from "./enums/productStatus";
import { ImageModel } from "./image-list-item";


export interface IProduct {
    ProductPk: number;
    ProductName:string;
    ProductDetails:string;
    ProductFk: number;
     ProductPrice : number;
   slika : string;
   Images: ImageModel[];
   current_image:ImageModel;
   Rating:number;
    RatingStar:string[];
    Score:number;

   
}

export interface IProductUpload
{
    ProductPk:number;
    ProductName:string;
    ProductDetails:string;
    ProductPrice : number;
    CategoryFk: number;
    Base64File : string;
    MainPhoto:boolean
    ProductStatus:ProductStatus

}





export interface newProduct {
    ProductPk: number;
    ProductName:string;
     Id: number;
     code : number;
     name :string,
    amount : string;
   slika : string;
   Images: ImageModel[];
   
}