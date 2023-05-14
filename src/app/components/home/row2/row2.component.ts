import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, tap } from 'rxjs';
import { IHomeRow2 } from 'src/app/models/home-row2';
import { ICategory } from 'src/app/models/navbar';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-row2',
  templateUrl: './row2.component.html',
  styleUrls: ['./row2.component.css']
})
export class Row2Component implements OnInit {


 // topCategory!:ICategory;
  row2Items$!: Observable<IHomeRow2 | null>
  
  @Input() user!:IUser;

  constructor(private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {


    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
   

    if (userId) {
    forkJoin([
      this.homeService.GetRow2(userId).pipe(tap(() => {
        this.row2Items$ = this.homeService.row2Items$;
      }))
    
    ]).subscribe();
  }
 

  }



  
  
  CallDepartment(id:number)
  {
  
    this.homeService.CallDepartment(this.user,id);
  
  }
  
  CallCategoryDepartment()
  {
  
    this.homeService.CallCategoryDepartment(this.user);
   
  
  }
  
  CallCategory(id:number)
  {
    this.homeService.CallCategory(this.user,id);
  
    
  }
  
  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }
  CallDepartments()
  {
  
  }
}
