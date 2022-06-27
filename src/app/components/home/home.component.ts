import { Subject, take, takeUntil } from 'rxjs';
import { Banner } from './../../models/banner.model';
import { BannerService } from './../../services/banner.service';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public bannerSlides!: Banner[];
  public isLoaded: boolean = true;
  // public selectedID:number = 0;


  //Handle Unsubscription using RxJS
  private componentSubscription

  constructor(private _banner: BannerService) { 
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this.getBannerSlides();
  }

  // Method to get Banner Data
  getBannerSlides() {
    this._banner.getBannerSlides()
    .pipe(takeUntil(this.componentSubscription))
    .subscribe({
      next: (data:any) => {
        let convertedData:Banner[] = data.slides
        this.bannerSlides = convertedData
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
