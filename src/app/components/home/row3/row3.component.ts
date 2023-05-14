import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, forkJoin, of, switchMap, take, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-row3',
  templateUrl: './row3.component.html',
  styleUrls: ['./row3.component.css']
})
export class Row3Component implements OnInit {

  row3Products$!:Observable<IProduct[] | null>;
  @Input() user!:IUser;


  constructor(private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {
    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
    this.homeService.row2Items$.pipe(
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
    ).subscribe();



   
  }

  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }

}
