import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private http:HttpClient) { }

  getDesign(ID):Observable<any>{
    return this.http.get('http://localhost:3000/api/design',{
      headers: new HttpHeaders({
        
        'selected_card':ID,
        'selected_color':'white'
      })
     })
  }

  getDesign_byColor(ID,color):Observable<any>{
    return this.http.get('http://localhost:3000/api/design',{
      headers: new HttpHeaders({

        'selected_card':ID,
        'selected_color':color
      })
    })
  }

}
