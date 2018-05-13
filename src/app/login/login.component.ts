import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  email: string;
  rememberMe: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '' ;
    if ( this.email.length > 1 ) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '91917312276-gbearb11fqfjt7qoicve57kn5clotrit.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( elem ) {
    this.auth2.attachClickHandler( elem, {}, googleUser => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle( token ).subscribe(
        () => {
            window.location.href = '#/dashboard';
        }
      );

      console.log('token', token);
    });
  }

  login( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    const user = new User ( null, form.value.email, form.value.password );

    this._userService.login( user, form.value.rememberMe ).subscribe(
      resp =>  this.router.navigate(['/dashboard']));
  }

}
