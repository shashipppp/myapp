import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstCompComponent } from './first-comp/first-comp.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth-guard';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'card',component:FirstCompComponent},
  {path:'create_card',component:PostDetailComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo: '/card', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'place_order', component:PlaceOrderComponent},
  {path:'cart', component:CartComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FirstCompComponent,PostDetailComponent,PlaceOrderComponent,CartComponent]
