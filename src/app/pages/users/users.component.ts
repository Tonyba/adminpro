import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { ModalUploadService } from '../../components/model-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalRegisters: number = 0;
  loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  showModal(id: string) {
    this._modalUploadService.showModal('users', id );
  }

  ngOnInit() {
    this.loadUsers();

    this._modalUploadService.notification
                            .subscribe( resp => this.loadUsers() );
  }

  loadUsers() {
    this._userService.getUsers( this.from )
                     .subscribe( (resp: any) => {
                       console.log(resp);
                       this.totalRegisters = resp.total;
                       this.users = resp.users;
                       this.loading = false;
                     });
  }

  changeFrom(value: number) {
    const from = this.from + value;

    if ( from >= this.totalRegisters ) {
      return;
    }

    if ( from < 0 ) {
      return;
    }

    this.from += value;
    this.loadUsers();
  }

  searchUser( term: string ) {

    if ( term.length <= 0 ) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUser(term)
    .subscribe( ( resp: User[]) => {
      this.users = resp;
      this.loading = false;
    });
  }

  deleteUser( user: User ) {
    if ( user._id === this._userService.user._id ) {
      // swal( 'cannot delete user', 'you can´t delete yourself', 'error' );
      return;
    }

    swal({
      title: 'ya sure?',
      text: 'ya about to delete ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( WillDelete =>  {
      console.log(WillDelete);

      if (WillDelete) {
        this._userService.deleteUser( user._id )
                          .subscribe( resp => {
                            console.log(resp);
                            this.loadUsers();
                          });
      }
    });
  }

  updateUser( user: User) {
    this._userService.updateUser(user).subscribe(
      resp => {
      }
    );
  }

}
