import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Card} from './model/card';
import {main_page} from './model/main_page';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CardService {
  
  constructor(private http:HttpClient) { console.log('one time') }

  cardPost(cardData):Observable<any>{
    let currentUser = JSON.parse(sessionStorage.getItem('myapp_user'));
    return this.http.post<Card>(environment.apiUrl+'/card/post',cardData,{
      headers: new HttpHeaders({
        
        //'Authorization':`${currentUser.Token}`
      })
     }).pipe(catchError(this.handleError))
  }

  cardGet():Observable<any>{
     return this.http.get<main_page>(environment.apiUrl+'/cards').pipe(catchError(this.handleError));
  }
  
  handleError(err:HttpErrorResponse){
    return throwError('err: ' + err);
}

card_imageUrl(){
  return environment.card_imageUrl;
}

}
