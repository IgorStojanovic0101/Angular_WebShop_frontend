import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/services/home/home.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users$!:Observable<IUser[] | null>;
  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(()=>{});
    this.users$ = this.userService.users$;

  }
  DataImport()
  {
    this.router.navigate(['auth/admin/dataimport']);

  }
  UpdateData()
  {
    this.router.navigate(['auth/admin/updatedata']);

  }
    onSelect(event:any)
  {
    localStorage.setItem('See_as_user_id',String(event.target.value));
    this.userService.getUserSeeAss(Number(event.target.value)).subscribe(()=> {
      //console.log('initialized nav bar');
     });
    this.router.navigate(['auth/home']);

  
  }


  
}
