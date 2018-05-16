import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  MedicService

} from './service.index';
import { ModalUploadService } from '../components/model-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';


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
  HospitalService,
  LoginGuardGuard,
  UploadFileService,
  ModalUploadService,
  MedicService
  ]
})
export class ServiceModule { }
