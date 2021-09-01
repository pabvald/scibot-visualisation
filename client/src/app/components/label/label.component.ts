import { Component, Input, OnInit } from '@angular/core';
import { ILabel } from 'src/app/models/label.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() label: ILabel | undefined; 
  @Input() isTitle: boolean = false; 

  constructor() { }

  ngOnInit(): void {

  }

  displaySize() {
    let width = 0;
    let height = 0;
    if (this.label) {
      width = (this.label.x2 - this.label.x1);
      height = (this.label.y2 - this.label.y1);      
    }      
    let sizeStyle = {
      'width': width  + '%',
      'height': height + '%',
      'display': 'inline-block'
    };
    return sizeStyle;
  }

}
