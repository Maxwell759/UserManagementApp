import { Injectable } from '@angular/core';
import { GlobalUrl } from '../class/global-url';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../sign-up/sign-up';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient,
    private url : GlobalUrl
   ) { }

 private baseUrl: string = this.url.baseUrl + "/";

 getUser(page:number) {
  const request = this.http.get<any[]>(
      this.baseUrl + 'users?page'+page 
  );
  
  return request;
}


getoneUser(id:number){
  const request= this.http.get(this.baseUrl +'users/'+id);
  return request;
}


deleteUser(user: any) {
  const request = this.http.delete(
      this.baseUrl + 'users/' + user.id
  );
  return request;
}
}
