import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  loginStatus: boolean = false;
  url = 'https://stage.blendedsense.com/api/login';
  // newHeaders = new HttpHeaders({
  //   'client-id': '4CD884F88F476F647CC4446D4593D',
  //   'client-secret': 'A955BEBD27BFC49E8CE12129346A4',
  // });

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('bs_valid')
    this.router.navigate(['/login']);
  }

   login(data: any):Observable<any> {
    //  return this.http.post(this.url, data, { headers: this.newHeaders });
        return this.http.post(this.url, data);
  }

  checkUserLoggedInOrNotAndRedirect(){

    this.isLoggedIn() === true
      ? this.router.navigate(['/user'])
      : ''
  }


}
