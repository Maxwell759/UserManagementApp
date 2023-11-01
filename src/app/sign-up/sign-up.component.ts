import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { AlertService } from '../services/alert.service';
import { SignUp } from './sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  public registerForm!: FormGroup;
  loading = false;
  signup!: SignUp;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _signup:SignUpService,
    private alertService: AlertService) {

  }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      avatar:['']
    })
  }

  // signUp() {
  //   this.http.post<any>("http://localhost:3000/signupUsers", this.registerForm.value)
  //   .subscribe(res=>{
  //     alert("Sign Up Successful")
  //     this.registerForm.reset();
  //     this.router.navigate(['/login'])
  //   },err=>{
  //     alert('Something went wrong')
  //   })
  // }

  signUp(){

    if (this.registerForm.invalid) {
      return;
  }
  this.loading = true;
    this._signup.createUser(this.registerForm.value).subscribe(data =>{

      this.alertService.success('Registration successful', true);
    
      this.registerForm.reset();
      this.router.navigate(['/login'])
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }
}
