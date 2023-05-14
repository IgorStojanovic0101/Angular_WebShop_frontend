import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { INavBar } from 'src/app/models/navbar';
import { MasterService } from '../master-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  
  private navBarSource = new BehaviorSubject<INavBar | null >(null);
  navBar$ = this.navBarSource.asObservable();
  constructor(private service: MasterService) { }


  getNavBar(id : number)
  {
   return this.service.GetNavBar(id).pipe
   (
    map((navbar:INavBar) => {

      this.navBarSource.next(navbar);
    })
   );
  }
}
