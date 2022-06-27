import { Latest } from './../models/latest.model';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LatestNewsService {

  constructor(private _httpClient:HttpClient) { }
  getAllNews():Observable<Latest[]>{
    return this._httpClient.get<Latest[]>('https://api.npoint.io/d275425a434e02acf2f7')
  }

  getNewsByID(id:number):Observable<Latest>{
    return this._httpClient
            .get<Latest>(`https://api.npoint.io/d275425a434e02acf2f7/News/${id}`)
            .pipe(retry(1),
            catchError((err:HttpErrorResponse) =>{
              console.log(err.error)
              return throwError(() => new Error('Something went wrong with Banners Service'))
            }))
  }
}
