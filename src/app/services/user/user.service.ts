import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadFileService } from '../service.index';

declare var swal: any;

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(
   public http: HttpClient,
   public router: Router,
   public _upload: UploadFileService
  ) {
    this.loadStorage();
  }

  loadStorage() {
    if ( localStorage.getItem('token')  ) {
     this.token = localStorage.getItem('token');
    return this.user = JSON.parse(localStorage.getItem('user'));
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

  searchUser( term: string ) {
    const url = URL_SERVICES + 'search/users/' + term;

    return this.http.get( url )
                    .map( (resp: any) =>  resp.users);
  }

  deleteUser( id: string ) {
    let url = URL_SERVICES + 'user/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                    .map( (resp: any) => {
                      swal('user deleted', 'the user has been successfuly deleted', 'success');
                      return true;
                    });
  }

  getUsers( from: number = 0 ) {
    const url = URL_SERVICES + 'user?from=' + from;

    return this.http.get(url) ;
  }

  login( user: User, remember: boolean = false ) {

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

  createUser( user: User ) {
      const url = URL_SERVICES + 'user' ;

      return this.http.post( url, user )
                      .map( (resp: any ) => {
                          swal('User added', user.email, 'success');
                          return resp.user;
                      });
  }


  updateUser( user: User ) {
    let url = URL_SERVICES + 'user/' + user._id;
    url += '?token=' + localStorage.getItem('token') ;

    return this.http.put( url, user )
                    .map( (resp: any) =>  {

                      if ( user._id === this.user._id ) {
                         const userDB: User = resp.user;
                         this.saveStorage( userDB._id, this.token, userDB  );
                      }

                      swal('user updated', user.name, 'success');

                      return true;
                    });
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + 'login/google';

    return this.http.post( url, {token} )
                    .map( (resp: any) => {
                      this.saveStorage( resp.id, resp.token, resp.user );
                      return true;
                    });
  }

  islogged() {
    this.token = localStorage.getItem('token');
    return ( this.token.length > 5 ) ? true : false ;
  }

  changeImage( file: File, id: string ) {
    this._upload.uploadFile( file, 'users', id )
                .then( (resp: any) => {
                  console.log(resp);

                  this.user.img = resp.user.img;
                  swal('image updated', this.user.name, 'success');
                  this.saveStorage(id, this.token, this.user);
                })
                .catch( resp => {
                  console.error(resp);
                });
  }



}
