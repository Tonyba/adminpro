import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-model-upload',
  templateUrl: './model-upload.component.html',
  styles: []
})
export class ModelUploadComponent implements OnInit {

  image: File;
  tempImage: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
  }

  selectImage(file: File) {

    if (!file) {
      this.image = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('only images', 'the selected file is not an image', 'error');
      this.image = null;
      return;
    }

    this.image = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result;
    };



  }

  closeModal() {
    this.tempImage = null;
    this.image = null;

    this._modalUpload.hideModal();
  }

  uploadImage() {
    this._uploadFileService.uploadFile( this.image, this._modalUpload.type, this._modalUpload.id )
                           .then( resp => {
                               this._modalUpload.notification.emit(resp);
                               this.closeModal();
                           })
                           .catch( err => {
                            console.log('error on uploading');
                           });
  }

}
