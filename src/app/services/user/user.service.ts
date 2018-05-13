import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(
   public http: HttpClient,
   public router: Router
  ) { }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  islogged() {
    return ( this.token.length > 5 ) ? true : false ;
  }

  loadStorage() {
    if ( localStorage.getItem('token')  ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage( id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  createUser( user: User ): Observable<any> {
    const url = URL_SERVICES + 'user' ;

    return this.http.post( url, user )
                    .map( (resp: any ) => {
                        swal('User added', user.email, 'success');
                        return resp.user;
                    });
  }

  login( user: User, remember: boolean = false ): Observable<any> {

    if ( remember ) {
      localStorage.setItem('email', user.email );
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + 'login' ;

    return this.http.post( url, user )
                    .map( (resp: any) => {
                      this.saveStorage( resp.id, resp.token, resp.user );
                      return true;
                    });

  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + 'login/google';

    return this.http.post( url, {token} )
                    .map( (resp: any) => {
                      this.saveStorage( resp.id, resp.token, resp.user );
                      return true;
                    });
  }


}
