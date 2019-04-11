import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  signup(data):Observable<any>{
    return this.http.post('http://localhost:3000/api/user/signup',data,{
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }).pipe(catchError(this.handleError))
  }

  login(data):Observable<any>{
    return this.http.post('http://localhost:3000/api/user/login',data,{
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }).pipe(catchError(this.handleError))
  }

  handleError(err:HttpErrorResponse){
    return throwError('err: ' + err);
}

}

