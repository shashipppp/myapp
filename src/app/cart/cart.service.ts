import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  get_cart(user_id):Observable<any>{
     return  this.http.get('http://localhost:3000/api/design',{
       headers: new HttpHeaders({
         'user_id':user_id
       })
     })
  }
}
