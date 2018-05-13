import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-resgister',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  equals ( field1: string, field2: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        equals: true
      };
    };
  }

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      conditions: new FormControl( false )
    }, { validators: this.equals( 'password', 'password2') } );

    this.form.setValue({
      name: 'test1',
      email: 'testab@test.com',
      password: '123',
      password2: '123',
      conditions: true
    });
  }

  registUser() {

    if ( this.form.invalid ) {
      return;
    }

    if ( !this.form.value.conditions ) {
      // swal( 'important', 'you must to accept conditions', 'warning' );
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.createUser( user )
                     .subscribe(
                        resp => {
                          console.log(resp);
                          // this.router.navigate(['/login']);
                        }
    );
  }

}
