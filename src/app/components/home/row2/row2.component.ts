import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, forkJoin, of, switchMap, take, tap } from 'rxjs';
import { IHomeRow2 } from 'src/app/models/home-row2';
import { ICategory } from 'src/app/models/navbar';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-row2',
  templateUrl: './row2.component.html',
  styleUrls: ['./row2.component.css']
})
export class Row2Component implements OnInit {


 // topCategory!:ICategory;
  row2Items$!: Observable<IHomeRow2 | null>
  
  @Input() user!:IUser;

  constructor(private userService:UserService, private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {


   
     
    this.userService.user$.pipe(
      filter(x => !!x),
      take(1),
      switchMap(response => {
        if (!response) {
          return of(null);
        }
        
        let userId = response.isAdmin ? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
    
        if (userId) {
          return forkJoin([
            this.homeService.GetRow2(userId).pipe(
              tap(() => {
                this.row2Items$ = this.homeService.row2Items$;
              })
            )
          ]);
        }

        
       else {
          return of(null);
        }
      })
    ).subscribe();

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
