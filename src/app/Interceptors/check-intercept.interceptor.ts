import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CheckInterceptInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) {}

  token = localStorage.getItem('token') || '';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        'client-id': '4CD884F88F476F647CC4446D4593D',
        'client-secret': 'A955BEBD27BFC49E8CE12129346A4',
      },
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.setError(error);
       
        return throwError(errorMessage);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = ' Unknow error ';
    if (error.error instanceof ErrorEvent) {
      //client Side Error
      errorMessage = error.error.message;
    } else {
     
        if (error.status === 401) {
          errorMessage = error.error.message;
          this.toasterService.error(`${errorMessage}`, 'Authorization Error');
          
        } else if (error.status === 400) {
          errorMessage = error.error.message;
          errorMessage === undefined ? errorMessage =  error.error.error : errorMessage=error.error.message;
          
          this.toasterService.error(`${errorMessage}`,'');
        } else if (error.status === 404) {
          errorMessage = error.error.message;
          this.toasterService.error(`${errorMessage}`, 'Route Error');
        } else if (error.status === 403) {
          errorMessage = error.error.message;
          this.toasterService.error(`${errorMessage}`, 'Access Error');
        } else if (error.status === 500 || error.status===503) {
          errorMessage = error.error.message;
          this.toasterService.error(`${errorMessage}`, 'Server Error');
        }
        else{
              errorMessage = "Your Offline";
              this.toasterService.error(`${errorMessage}`, 'Internet Error');
        }


    }
    return errorMessage;
  }
}
