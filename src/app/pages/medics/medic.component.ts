import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medic } from '../../models/medic.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/model-upload/modal-upload.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {

  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicService: MedicService,
    public _hospitalService: HospitalService,
    public router: Router,
    public route: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    route.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'new' ) {
        this.loadMedic( id );
      }
    });
   }

  ngOnInit() {
    this._hospitalService.getHospitals()
                         .subscribe( (resp: any) => {
                           this.hospitals = resp.hospitals;
                         });

    this._modalUploadService.notification.subscribe( resp => {
          this.medic.img = resp.medic.img;
    });
  }

  changeHospital(id: string) {

    this._hospitalService.getHospital( id )
        .subscribe( resp => {
            this.hospital = resp;
        });

  }

  loadMedic( id: string ) {

    this._medicService.getMedic(id)
                      .subscribe( resp => {
                        this.medic = resp;
                        this.medic.hospital = resp.hospital._id;
                        this.changeHospital( this.medic.hospital );
                      });
  }

  saveMedic( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._medicService.saveMedic( this.medic )
                      .subscribe( resp => {
                        this.medic._id = resp._id;
                        this.router.navigate(['/medic', this.medic._id]);
                      });
  }

  changePicture() {
    this._modalUploadService.showModal('medics', this.medic._id);
  }

}
