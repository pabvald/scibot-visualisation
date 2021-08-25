import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  
  @Input() label: Label | undefined; 
  @Input() isTitle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
