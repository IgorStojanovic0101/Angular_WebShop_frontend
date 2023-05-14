import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthomeService {

  private openSubject = new Subject<any>()
  private closedSubject = new Subject<any>();
  private userIdSubject = new Subject<number>();
  constructor() { }



  SetUser(userId:number)
  {
    this.userIdSubject.next(userId);
  }
  GetUser():Observable<number>
  {
    return this.userIdSubject.asObservable();
  }

  ShowDownEvent()
  {
    this.openSubject.next(null);
  }

  getShowDownEvent():Observable<any>
  {
    return this.openSubject.asObservable();
  }

  TurnOnEvent()
  {
     this.closedSubject.next(null);
  }

  getTurnOnEvent():Observable<any>
  {
    return this.closedSubject.asObservable();
  }
}
