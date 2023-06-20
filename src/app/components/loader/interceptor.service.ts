import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.busy();
    return next.handle(req).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error);
        // You can also perform additional actions, such as logging or showing an error message to the user
        // ...

        // Rethrow the error to propagate it further
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.idle();
      })
    );
  }
}