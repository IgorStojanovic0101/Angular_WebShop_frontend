import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, tap } from 'rxjs';
import { IHomeRow5 } from 'src/app/models/home-row5';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-row5',
  templateUrl: './row5.component.html',
  styleUrls: ['./row5.component.css']
})
export class Row5Component implements OnInit {

  row5Items$!:Observable<IHomeRow5 | null>;
  @Input() user!:IUser;

  constructor(private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {

    let userId = this.user.isAdmin? Number(localStorage.getItem('See_as_user_id')!) : Number(localStorage.getItem('user_id')!);
   
   

    if (userId) {
    forkJoin([
      this.homeService.GetRow5(userId).pipe(tap(() => {
        this.row5Items$ = this.homeService.row5Items$;
      }))
    
    ]).subscribe();
  }
  }


  openProduct(id:number)
  {
    this.homeService.openProduct(id);
  
    
  }
}
