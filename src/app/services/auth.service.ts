import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5039/api/";
  constructor(private http: HttpClient) { }
  
  register(user: Register): Observable<any> {
    const url = `${this.baseUrl}register`; 
    return this.http.post(url, user); 
  }

  login(user:Login): Observable<any> {
    const url = `${this.baseUrl}login`;
    return this.http.post(url, user);
  }
  

  storeToken(tokenValue: string):void
  {
    localStorage.setItem('authToken', tokenValue);

  }

  getToken():string|null
  {
    return  localStorage.getItem('authToken');

  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('authToken');
  }
  
}
