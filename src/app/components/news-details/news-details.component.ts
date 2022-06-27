import { Latest } from './../../models/latest.model';
import { LatestNewsService } from './../../services/latest-news.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  //Handle Unsubscription using RxJS
  private componentSubscription

  constructor(private _newsDetails: LatestNewsService,
    private _activateRoute: ActivatedRoute) {
    this.componentSubscription = new Subject<void>()
  }

  public newsDetails!: Latest
  public isLoaded: boolean = true

  ngOnInit(): void {
    this._activateRoute.paramMap.pipe(takeUntil(this.componentSubscription))
      .subscribe({
        next: (param) => {
          let id = Number(param.get('id'))
          this.getNewsDetailsByID(id)
        },
        error: (err: Error) => { console.log(err.message) }
      })
  }

  getNewsDetailsByID(id: number) {
    this._newsDetails.getNewsByID(id).pipe(takeUntil(this.componentSubscription))
      .subscribe({
        next: (data: Latest) => {
          // console.log(data)
          this.newsDetails = data
          this.isLoaded = false
        },
        error: (err: Error) => { console.log(err.message) }
      })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next();
    this.componentSubscription.complete();
  }
}
