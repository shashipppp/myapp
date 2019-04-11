import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent,SignupComponent],
  imports: [
    CommonModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class LoginPageModule { }
