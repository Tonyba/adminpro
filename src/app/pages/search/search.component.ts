import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Medic } from '../../models/medic.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  medics: Medic[] = [];


  constructor(
    public route: ActivatedRoute,
    public http: HttpClient
  ) {
    route.params.subscribe( params => {
      const term = params['term'];
      this.search( term );
    });
   }

  ngOnInit() {
  }

  search( term: string ) {

    const url = URL_SERVICES + 'search/all/' + term;

    this.http.get( url )
             .subscribe( (resp: any) => {
                console.log(resp);
                this.users = resp.users;
                this.hospitals = resp.hospitals;
                this.medics = resp.medics;
             });

  }

}
