import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Card} from './model/card';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http:HttpClient) { }

  cardPost(cardData):Observable<any>{
    let currentUser = JSON.parse(sessionStorage.getItem('myapp_user'));
    return this.http.post<Card>('http://localhost:3000/api/card/post',cardData,{
      headers: new HttpHeaders({
        
        //'Authorization':`${currentUser.Token}`
      })
     }).pipe(catchError(this.handleError))
  }
  
  handleError(err:HttpErrorResponse){
    return throwError('err: ' + err);
}

}
