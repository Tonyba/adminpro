import { Component, OnInit } from '@angular/core';
import { MedicService } from '../../services/medics/medic.service';
import { Medic } from '../../models/medic.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {

  medics: Medic[] = [];

  constructor(
    public _medicService: MedicService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadMedics();
  }

  loadMedics() {
    this._medicService.getMedics()
                      .subscribe( resp => {
                        this.medics = resp;
                      });
  }

  searchMedic( term: string ) {

    if ( term.length <= 0 ) {
      this.loadMedics();
      return;
    }

    this._medicService.searchMedic( term )
                      .subscribe( resp => this.medics = resp );
  }

  createMedic() {

  }

  updateMedic( medic: Medic ) {

  }

  deleteMedic( medic: Medic ) {

    swal({
      title: 'ya sure?',
      text: 'ya about to delete ' + medic.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( WillDelete =>  {
      console.log(WillDelete);

      if (WillDelete) {
        this._medicService.deleteMedic( medic._id )
                          .subscribe( resp => {
                            console.log(resp);
                            this.loadMedics();
                          });
      }
    });

  }

}
