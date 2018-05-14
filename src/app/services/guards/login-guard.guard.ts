import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { UserService } from '../service.index';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate() {

    if ( this._userService.islogged() ) {
      console.log('pass guard');
      return true;
    } else {
      console.log('blocked faggot');
      this.router.navigate(['/login']);
      return false;

    }
  }

}
