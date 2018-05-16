import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../service.index';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _userServices: UserService,
  ) { }

  canActivate() {

    if ( this._userServices.user.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log('blocked by guard, asshole .l.');
      this._userServices.logout();
      return false;
    }


  }
}
