import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
  UploadFileService
} from './service.index';
import { ModalUploadService } from '../components/model-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  ModalUploadService
  ]
})
export class ServiceModule { }
