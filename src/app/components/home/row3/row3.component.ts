import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, forkJoin, of, switchMap, take, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-row3',
  templateUrl: './row3.component.html',
  styleUrls: ['./row3.component.css']
})
export class Row3Component implements OnInit {

  row3Products$!:Observable<IProduct[] | null>;
   user!:IUser;


  constructor(private userService: UserService,private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {


    this.userService.user$.pipe(
      filter(x => !!x),
      take(1),
      switchMap(response => {
        if (!response) {
          return of(null);
        }
        this.user = response;
        let userId = this.user.isAdmin ? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
    
        return this.homeService.row2Items$.pipe(
          filter(x => !!x),
          take(1),
          switchMap(response => {
            if (!response) {
              return of(null);
            }
            if (!userId) {
              return of(null);
            }
            return this.homeService.GetRow3(userId, response.TopDepartment.RecordPk).pipe(
              tap(() => {
                this.row3Products$ = this.homeService.row3Products$;
              })
            );
          })
        );
      })
    ).subscribe();

  }

  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }

}
