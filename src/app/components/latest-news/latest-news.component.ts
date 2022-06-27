import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/categories.model';
import { Latest } from 'src/app/models/latest.model';
import { CategoryService } from 'src/app/services/category.service';
import { LatestNewsService } from 'src/app/services/latest-news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {

  public news!: Latest[];
  public newsCategory!: Category[];
  public savedItems: boolean = false;
  public isLoaded: boolean = true;

  //Handle Unsubscription using RxJS
  private componentSubscription

  constructor(private _news: LatestNewsService, private _categories: CategoryService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this.getNewsCategory();
    this.sentCateValue(0);
  }

  // Method to get News Category Data
  getNewsCategory() {
    this._categories.getNewsCate().pipe(takeUntil(this.componentSubscription))
      .subscribe({
        next: (data: any) => {
          let castedData: Category[] = data.newsCategory
          this.newsCategory = castedData
          this.isLoaded = false
        },
        error: (err: Error) => { console.log(err.message) }
      })
  }

  // Method to get Saved Items and store 'em in local storage
  saveItem(id: string): void {
    localStorage.setItem('userSavedItems', id)
    this.savedItems = !this.savedItems
  }

  //Method to Handle Filter Operation
  sentCateValue(val: any): void {
    this._news.getAllNews().pipe(takeUntil(this.componentSubscription))
      .subscribe({
        next: (data: any) => {
          let castedData: Latest[] = data.News
          if (val == '0') {
            this.news = castedData
            this.isLoaded = false
          } else {
            this.news = castedData.filter(el => el.categoryID == val)
            this.isLoaded = false
          }
        },
        error: (err: Error) => { console.log(err.message) }
      })
  }

  //Method to Reset All Categories
  reset(): void {
    this.sentCateValue(0)
  }

  ngOnDestroy(): void {
    this.componentSubscription.next();
    this.componentSubscription.complete();
  }
}