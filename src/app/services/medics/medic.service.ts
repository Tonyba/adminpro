import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { Medic } from '../../models/medic.model';

declare var swal: any;

@Injectable()
export class MedicService {

  totalMedics: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  getToken() {
   return localStorage.getItem('token');
  }

  getMedics() {
    const url = URL_SERVICES + 'medic';

    return this.http.get( url )
                    .map( (resp: any) => {
                        this.totalMedics = resp.total;
                        return resp.medics;
                    });
  }

  getMedic( id: string ) {
    const url = URL_SERVICES + 'medic/' + id;

    return this.http.get( url )
             .map( (resp: any) => {
               return resp.medic;
              });
  }

  searchMedic( term: string ) {
    const url = URL_SERVICES + 'search/medics/' + term;

    return this.http.get( url )
              .map ( (resp: any) =>  {
                  return resp.medics;
              });
  }

  deleteMedic( id: string ) {
    let url = URL_SERVICES + 'medic/' + id;
    url += '?token=' + this.getToken();

    return this.http.delete( url )
                    .map( (resp: any) => {
                      swal('medic deleted', 'medic successfuly deleted', 'success');
                      return resp;
                    });
  }

  saveMedic( medic: Medic ) {
    let url = URL_SERVICES + 'medic';

    if ( medic._id ) {
      // updating
      url += '/' + medic._id;
      url += '?token=' + this.getToken();

      return this.http.put( url, medic)
                       .map( (resp: any) => {
                         swal('Medic Updated', medic.name, 'success');
                         return resp.updatedMedic;
                       });

    } else {
      // creating
      url += '?token=' + this.getToken();

      return this.http.post( url, medic )
                      .map( (resp: any) => {
                        swal( 'Medic created', medic.name, 'success' );
                        return resp.newMedic;
                      });
    }


  }

}
