import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _login: LoginService,
    private _toastr:ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }




   /**
     * Login on Click
     * @param form
     */
   login() {
    this.error = '';
    const username = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this._login
        .login(username, password)
        .subscribe(
            res =>{
              this._toastr.success("Sucessfully logined In")
              this.router.navigate(['/body'])
            } ,
            err => (this.error = err.error.error)
        );
}


  }

