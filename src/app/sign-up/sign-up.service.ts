import { Injectable } from '@angular/core';
import { GlobalUrl } from '../class/global-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUp } from './sign-up';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient,
    private url : GlobalUrl
   ) { }

 private baseUrl: string = this.url.baseUrl + "/";


 createUser(userData: any): Observable<any> {
  console.log(userData);

  return this.http.post(this.baseUrl+'users', userData);
}

editUser(user: SignUp, first_name: string, jobtitle: any) {
  // const name = first_name.split(' ');

  user.first_name = first_name;
  // user.last_name = name[1] ? name[1] : '';
  user.jobtitle = jobtitle;

  const request = this.http.post(
      this.baseUrl + 'users/' + user.id,
      {
          name: first_name,
          job: jobtitle
      }
  );
  // request.subscribe((payload: any) => {
  //     this.store.dispatch(new UsersActions.EditUser(user));
  // });
  return request;
}
}
