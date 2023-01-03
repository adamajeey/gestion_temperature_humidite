import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor(private authService: UsersService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.authService.currentUserValue;
      //  console.log(JSON.parse(<any>currentUser)); 
       
      if (currentUser) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser}`
              }
          });
      }
          
      return next.handle(request).pipe(catchError(err => {
          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
