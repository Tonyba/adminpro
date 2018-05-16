import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import 'rxjs/add/operator/map';
import { UploadFileService } from '../service.index';

declare var swal: any;


@Injectable()
export class HospitalService {

  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService
  ) { }

  getHospitals( from: number = 0 ) {
    const url = URL_SERVICES + 'hospital?from=' + from;

    return this.http.get( url );
  }

  getHospital( id: string ) {
    const url = URL_SERVICES + 'hospital/' + id;

    return this.http.get( url )
                    .map( (resp: any) => resp.hospital ) ;
  }

  createHospital( name: string ) {
    let url = URL_SERVICES + 'hospital';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post( url, {name} )
                    .map ( (resp: any) => {
                          return resp.hospital;
                    });
  }

  updateHospital( hospital: Hospital ) {
      let url = URL_SERVICES + 'hospital/' + hospital._id ;
      url += '?token=' + localStorage.getItem('token');

      return this.http.put( url, hospital )
                      .map ( (resp: any) => {
                        swal( 'hospital updated', hospital.name, 'success');
                        return resp.hospital;
                      });
  }

  deleteHospital( id: string ) {
    let url = URL_SERVICES + 'hospital/' + id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.delete( url )
                    .map( (resp: any) => {
                      swal('hospital deleled', 'the hospital has been successfuly deleted', 'success');
                      return true;
                    });
  }

  searchHospital( term: string ) {
    const url = URL_SERVICES + 'search/hospitals/' + term;

    return this.http.get( url)
    .map( (resp: any) =>  resp.hospitals);
  }

  changeImage( file: File, id: string ) {
    this._uploadFileService.uploadFile( file, 'hospitals', id )
                .then( (resp: any) => {
                  console.log(resp);

                  this.hospital.img = resp.hospital.img;
                  swal('image updated', this.hospital.name, 'success');
                })
                .catch( resp => {
                  console.error(resp);
                });
  }



}
