import { Banner } from '../models/banner.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private _httpClient:HttpClient) { }

  //After Finishing the Project with JSON-Server
  //I Hosted JSON File On my Github Account as LIVE API
  getBannerSlides():Observable<Banner[]> {
    return this._httpClient
            .get<Banner[]>(`https://ahmadashrf.github.io/JSON-APIs/banner.json`)
            .pipe(
              //using rxjs to retry connection if got lost
              retry(1),
              //handle errors via HttpErrorResponse
              catchError((err:HttpErrorResponse) =>{
                console.log(err.error)
                return throwError(() => new Error('Something went wrong with Banners Service'))
              })
            )
  }
}
