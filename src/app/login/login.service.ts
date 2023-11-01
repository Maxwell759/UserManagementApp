import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalUrl } from '../class/global-url';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SignUp } from '../sign-up/sign-up';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject!: BehaviorSubject<SignUp >;
  public currentUser: any;
  constructor(private http: HttpClient,
    private url : GlobalUrl,private router: Router
   ) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<SignUp >(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
   }

 private baseUrl: string = this.url.baseUrl + "/";


 /**
     * Login Handler to do the login to the API
     * @param username
     * @param password
     * @returns Observable
     */
login(username: string, password: string) {
  console.log('username',username ,'password',password)
  const request = this.http.post(this.baseUrl + 'login', {
      username,
      password
  });
  request.subscribe((res: any) => {this.setToken(res.token)
    localStorage.setItem('currentUser', JSON.stringify(res.username));
    this.currentUserSubject.next(res);
  });
  this.router.navigate(['/body']);
  return request;
}



 /**
     *
     * @param token Sets the auth token
     */
 setToken(token: string) {
  localStorage.setItem('token', token);
}

getUser() {
  const request = this.http.get(
      this.baseUrl + 'users?page=2' 
  );
  
  return request;
}


rLoggedIn(){
let user = localStorage.getItem('username');
console.log(!(user == null));
return !(user == null);
}





}
