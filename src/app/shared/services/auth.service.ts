import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientXsrfModule , HttpErrorResponse } from '@angular/common/http';
import { Observable, map , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseApi } from './response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'isLoggedIn'; // This can also store tokens or user info.

  baseApi:string = 'http://localhost:8000'
  apiUrl:string=''
  constructor(private http: HttpClient,) { }

  public setPo():Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/api/po'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, '', { headers });
  }

  public loadAnswer(): Observable<any> {
    this.apiUrl = this.baseApi + '/api/loadAnswer'
    return this.http.get<any>(this.apiUrl);
  }

  public createUser(userDataCreate: { full_name: string,  phone_number: string, email: string, password: string }): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/create_user';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseApi>(this.apiUrl, userDataCreate, { headers });
  }

  public userLogin(loginRequest: { email: string, password: string }): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/user_login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseApi>(this.apiUrl, loginRequest, { headers });
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in
    return localStorage.getItem(this.storageKey) === 'true';
  }

  getLocalStorage(nameid:string){
    return localStorage.getItem(nameid) ;
  }

  login(userData: any): void {
    // Simulating login process by setting the key in localStorage
    localStorage.setItem(this.storageKey, 'true');
    localStorage.setItem('user_id', userData.user_id);
    localStorage.setItem('full_name', userData.full_name);
    localStorage.setItem('profile_pic', userData.profile_pic);
  }

  logout(): void {
    // Remove the key from localStorage when logging out
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('user_id');
    localStorage.removeItem('full_name');
    localStorage.removeItem('profile_pic');
  }


}
