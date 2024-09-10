import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private toast:ToastrService,private router:Router) {

    
  }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('authToken');

    // Clone the request and add the Authorization header if token is present
    if (jwtToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }


    return next.handle(req).pipe(
      // Catch errors, specifically for handling 401 Unauthorized errors
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          
          this.toast.error('Session expired. Please log in again.', 'Unauthorized', {
            timeOut: 3000
          });
         
          this.router.navigate(['/login']);
        }
       
        return throwError(() => new Error(err.message));
      })
    );
  }


}