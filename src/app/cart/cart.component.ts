import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('myapp_user'));
    const user_id = currentUser.USERID;
    this.cartService.get_cart(user_id).subscribe(res=>{
         console.log(res);
    },(err:HttpErrorResponse)=>{ console.log('error in fecthing cart: '+err)})
  }

}
