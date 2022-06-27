import { takeUntil, Subject } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false

  //Handle Unsubscription using RxJS
  private componentSubscription

  constructor(private _auth: AuthService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._auth.loginStatus.pipe(takeUntil(this.componentSubscription))
      .subscribe({
        next: (res) => { this.isLogged = res },
        error: (err: Error) => { console.log(err.message) }
      })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next();
    this.componentSubscription.complete();
  }

}
