import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth:AuthService, private _router:Router) { }


  ngOnInit(): void {
    this._auth.logout()
    this._router.navigateByUrl('/home')
  }

}
