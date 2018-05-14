import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage: File;
  tempImage: string;

  constructor(
    public _userService: UserService
  ) {
    this.user = this._userService.user;
   }

  ngOnInit() {
  }



  selectImage(file: File) {

    if (!file) {
      this.uploadImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      // swal('only images', 'the selected file is not an image', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result;
    };



  }

  save( user: User ) {
    this.user.name = user.name;

    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this._userService.updateUser( this.user )
                     .subscribe( resp => console.log(resp) );
  }

  changeImage() {
    this._userService.changeImage( this.uploadImage, this.user._id );
  }

}
