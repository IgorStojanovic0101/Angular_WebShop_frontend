import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { MasterService } from '../master-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userSource = new BehaviorSubject<IUser | null >(null);
  user$ = this.userSource.asObservable();

  public userSeeAss_Source =  new BehaviorSubject<IUser | null >(null);
  userSeeAss$ = this.userSeeAss_Source.asObservable();

  public usersSoruce = new BehaviorSubject<IUser[] | null >(null);
  users$ = this.usersSoruce.asObservable();

  constructor(private service:MasterService) { }

  getUser(val:number)
  {
   return this.service.GetUserById(val).pipe
    (
     map((user:IUser) => {
       this.userSource.next(user);
 
     })
    );
  }
  getUserSeeAss(val:number)
  {
   return this.service.GetUserById(val).pipe
    (
     map((user:IUser) => {
       this.userSeeAss_Source.next(user);
 
     })
    );
  }
  DestroyUserSeeAss()
  {
    this.userSeeAss_Source.next(null);
  }
  getUsers()
  {
   return this.service.getUserList().pipe
    (
     map((users:IUser[]) => {
       this.usersSoruce.next(users);
 
     })
    );
  }


  public setUser(user:IUser)
  {
    this.userSource.next(user);
  }
  public setUserSeeAss(user:IUser)
  {
    this.userSeeAss_Source.next(user);
  }

  public GetUserData()
  {
    return this.userSource.value;
  }

  public GetUserId()
  {
    return this.userSource.value!.UserPk;
  }

  public GetUserData2():Observable<IUser| null>
  {
     return this.user$;
  }
}
