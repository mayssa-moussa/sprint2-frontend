import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                  {"username":"mayssa","password":"123","roles":['USER']} ]; */
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token!: string;
  apiURL: string = 'http://localhost:8081/users';
  private helper = new JwtHelperService();


  constructor(private router: Router, private http: HttpClient) { }
  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }
  getToken(): string {
    return this.token;
  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }
  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

}
