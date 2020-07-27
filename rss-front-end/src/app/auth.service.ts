import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signupUser(username: string, email: string, password: string) {
    const userData = { username, email, password };
    const config = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    this.http
      .post('http://localhost:6523/api/auth/signup', JSON.stringify(userData), { headers: config })
      .subscribe((response) => {
        this.token = JSON.stringify(response);
        this.authStatusListener.next(true);
      });
  }

  loginUser(email: string, password: string) {
    const userData = { email, password };
    const config = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    this.http
      .post('http://localhost:6523/api/auth/login', JSON.stringify(userData), { headers: config })
      .subscribe((response) => {
        this.token = JSON.stringify(response);
        this.authStatusListener.next(true);
      });
  }
}
