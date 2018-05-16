import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/model-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  totalRegisters: number = 0;
  loading: boolean = true;
  from: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();

    this._modalUploadService.notification
                            .subscribe( () => this.loadHospitals() );
  }

  createHospital() {
    swal({
      title: 'Create Hospital',
      text: 'Write the hospital\'s name',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    })
    .then( (value: string ) => {
      if (!value || value.length === 0 ) {
        return;
       }

       this._hospitalService.createHospital( value )
                            .subscribe( () => this.loadHospitals() );

    });
  }

  showModal( id: string ) {
    this._modalUploadService.showModal('hospitals', id );
  }

  searchHospital( term: string ) {
    if ( term.length <= 0 ) {
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this._hospitalService.searchHospital(term)
    .subscribe( ( resp: Hospital[]) => {
      console.log(resp);
      this.hospitals = resp;
      this.loading = false;
    });
  }

  loadHospitals() {
    this._hospitalService.getHospitals()
                         .subscribe( (resp: any) => {
                                      this.hospitals = resp.hospitals;
                                      this.totalRegisters = resp.total;
                                      this.loading = false;
                                    });
  }

  updateHospital( hospital: Hospital ) {
    this._hospitalService.updateHospital( hospital )
                         .subscribe();
  }

  deleteHospital( hospital: Hospital ) {
    swal({
      title: 'ya sure?',
      text: 'ya about to delete ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( WillDelete =>  {
      console.log(WillDelete);

      if (WillDelete) {
        this._hospitalService.deleteHospital( hospital._id )
                          .subscribe( resp => {
                            console.log(resp);
                            this.loadHospitals();
                          });
      }
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
    this.loadHospitals();
  }

}
