import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Session } from 'protractor';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  backgroundUrl ="assets/images/eiffel.jpg"

  constructor(private fb:FormBuilder, private loginService: LoginService, private router:Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe((response:HttpResponse<any>)=>{
      console.log(response);
      sessionStorage.setItem('myapp_user', JSON.stringify(response));
      this.router.navigate(['/card'])
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
    })
  }

}
