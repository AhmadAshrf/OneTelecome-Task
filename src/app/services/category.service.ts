import { Category } from './../models/categories.model';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient:HttpClient) { }

  getNewsCate():Observable<Category[]>{
    return this._httpClient
        .get<Category[]>('https://api.npoint.io/91298d970c27e9a06518')
        .pipe(retry(1),
        catchError((err:HttpErrorResponse) =>{
          console.log(err.error)
          return throwError(() => new Error('Something went wrong with Banners Service'))
        }))
  }
}
