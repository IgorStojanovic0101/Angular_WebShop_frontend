import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/shared/services/master-service.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { IProduct } from 'src/app/models/product';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



//
import { catchError, map, of } from 'rxjs';
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  Productlist: IProduct[] = [];
  ImageList: IProduct[] = [];

  productImage: any;
  EditProductCode = '';
  Result: any;
  file!: File; // Variable to store file
  progressvalue = 0;
  

  constructor(private service: MasterService, private modalService: NgbModal, private httpclient: HttpClient,private sanitizer: DomSanitizer)
   { }
  @ViewChild('contentImageList') addImageListview !: ElementRef;
  @ViewChild('contentUpload') uploadModal !: ElementRef;

  
  @ViewChild('fileupload') fileupload !: ElementRef;

  ngOnInit(): void {
   
  }

 


}
