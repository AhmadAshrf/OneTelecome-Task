import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

//Import Pasword Checker File
import { isPasswordMathc } from 'src/app/CustomValidation/PasswordChecker'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public isPageLoaded: boolean = true;
  public isLogged: boolean = false;
  public signUpForm: FormGroup;

  //Handle Unsubscription using RxJS
  private componentSubscription

  constructor(private _formBuilder: FormBuilder,
    private _userAuthService: AuthService,
    private _router: Router,
    private _auth: AuthService) {

    this.componentSubscription = new Subject<void>()

    //Reactive Forms
    this.signUpForm = this._formBuilder.group({
      username: ['', [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      email: ['', [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(7),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      password: ['', [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(8),
      Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      confPassword: ['', [Validators.required]]
    }, { validators: isPasswordMathc('password', 'confPassword') })
  }

  ngOnInit(): void {
    this.logStatus();
    this.inputChr();
  }

  //User Authentication Ststus Checking..
  logStatus():void{
    this._auth.loginStatus.pipe(
      takeUntil(this.componentSubscription)
    ).subscribe(status => {
      this.isLogged = status
    })
  }

  //Input Validation Method
  inputChr():void{
    this.signUpForm.get('username')?.valueChanges.pipe(
      takeUntil(this.componentSubscription)
    ).subscribe(username => {
      const match = username.match(/[\u0600-\u06FF]+/i);
      if (match) this.signUpForm.get('username')?.setValue(this.username?.value.replace(match, ''));
    })
  }

  //Dealing with Methods as Properties
  get username() {
    return this.signUpForm.get('username')
  }
  get email() {
    return this.signUpForm.get('email')
  }
  get password() {
    return this.signUpForm.get('password')
  }
  get confPassword() {
    return this.signUpForm.get('confPassword')
  }

  signUp(name: string, email: string, password: string) {
    this._userAuthService.signup(name, email, password)
    this._router.navigateByUrl('/home')
  }

  goBack() {
    this._router.navigateByUrl('/home')
  }

  ngOnDestroy(): void {
    this.componentSubscription.next();
    this.componentSubscription.complete();
  }
}
