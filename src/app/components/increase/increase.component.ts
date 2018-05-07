import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: []
})
export class IncreaseComponent implements OnInit {

 @ViewChild('txtProgress') txtProgress: ElementRef;

 @Input() progress: number = 50;
 @Input('name') legend: string = 'legend';


 @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number ) {

    // const elem: any = document.getElementsByName('progress')[0];

    if ( newValue >= 100 ) {
      this.progress = 100;
    } else if ( newValue <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    // elem.value = Number( this.progress );
    this.txtProgress.nativeElement = this.progress;

    this.valueChange.emit( this.progress );
  }

  changeValue( value: number ) {

    if ( this.progress > 100 && value > 0 ) {
      this.progress = 100;
      return;
    }

    if ( this.progress <= 0 && value < 0 ) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;

    this.valueChange.emit( this.progress );

    this.txtProgress.nativeElement.focus();
  }

}
