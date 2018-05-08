import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';




@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


    this.subscription = this.returnObservable()
    .subscribe(
       numero => console.log( 'subs', numero ),
       error => console.error( error ),
       () => console.log( 'the observer is dead' )
     );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( observer => {

      let counter = 0;

      const interval = setInterval( () => {

        counter += 1;

        const output = {
          value: counter
        };

        observer.next( output );

        // if ( counter === 3 ) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

        // if ( counter === 2 ) {
        //   clearInterval( interval );
        //   observer.error( 'help!' );
        // }

      }, 500);

    })
    .retry(2)
    .map( (res: any) => {
      return res.value;
    })
    .filter( value => {
      if ( value % 2 === 1 ) {
        // impar
        return true;
      } else {
        // par
        return false;
      }
    } );
  }

}
