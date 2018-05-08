import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.countThree().then();

  }

  ngOnInit() {
  }


  countThree() {
      return new Promise( ( resolve, reject ) => {

        let counter = 0;

        const interval = setInterval( () => {
          counter += 1;
          console.log(counter);

          if ( counter === 3 ) {
            resolve();
            clearInterval(interval);
          }
        }, 1000 );


    });
  }


}


