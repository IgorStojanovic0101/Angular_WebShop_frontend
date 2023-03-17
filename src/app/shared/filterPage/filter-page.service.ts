import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Filter, IFilter } from 'src/app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterPageService {

  private filterSubject =  new Subject<Filter>();

  constructor() { }

  SetFilter(filter : Filter)
  {
    this.filterSubject.next(filter);
  }

  getFilterEvent():Observable<Filter>
  {
    return this.filterSubject.asObservable();
  }


  getCurrentFilterValue()
  {
    return this.filterSubject;
  }
}
