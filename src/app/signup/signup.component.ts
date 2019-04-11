import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import  {passwordValidator} from './passwordValidator';
import  {patternValidator} from './patternValidator';
import {USER} from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  result:string;
  show:boolean;

  constructor(private fb:FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['',[Validators.required,Validators.email,Validators.pattern(patternValidator.PATTERNS.email)]],
      username: ['',[Validators.required,Validators.minLength(6),Validators.pattern(patternValidator.PATTERNS.username)]],
      institute: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]]
    },{validator: passwordValidator});

    console.log();
}

onSignup(){
  console.log(this.signupForm.value);
    this.loginService.signup(this.signupForm.value).subscribe(res=>{
      this.result = "You have successfully signed UP"
      console.log(res);
      this.show = true;
    })
}

login(){
 this.router.navigate(['/login']);
}
}
