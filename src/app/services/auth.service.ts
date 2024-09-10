import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5039/api/";

  private userPayload: any;
  private jwtHelper = new JwtHelperService();
  private userPayloadSubject = new BehaviorSubject<any>(null);
  public userPayload$ = this.userPayloadSubject.asObservable();
  

  constructor(private http: HttpClient,private router:Router) {
    this.loadUserPayload();
  }
  loadUserPayload() {
    const token = this.getToken();
    if (token) {
      this.userPayloadSubject.next(this.jwtHelper.decodeToken(token));
    } else {
      this.userPayloadSubject.next(null);
    }
  }
  

  register(user: Register): Observable<any> {
    const url = `${this.baseUrl}register`;
    return this.http.post(url, user);
  }

  login(user: Login): Observable<any> {
    const url = `${this.baseUrl}login`;
   

    return this.http.post(url, user).pipe(
      tap((res: any) => {
        this.storeToken(res.token);
      })
    );
  }


  storeToken(tokenValue: string): void {
    localStorage.setItem('authToken', tokenValue);
    this.loadUserPayload();

  }

  getToken(): string | null {
    return localStorage.getItem('authToken');

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  signOut() {
    localStorage.clear();
    this.userPayloadSubject.next(null);
    this.router.navigate(['/login']);
}
getFullnameFromToken(): string | null {
  return this.userPayloadSubject.value?.unique_name || null;
}

}
