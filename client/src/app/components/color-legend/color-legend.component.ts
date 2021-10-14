import { Component, OnInit } from '@angular/core';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';


@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.scss']
})
export class ColorLegendComponent implements OnInit {

  readonly SPLITS : number = 20;
  readonly SHOW_EACH: number = 3;

  isLabelLevelEnabled : boolean = false;
  minFixation : number = 0;
  maxFixation : number = 600;
  
  constructor(private labelLevelFacade: LabelLevelFacade) {
    // Subscriptions
    this.labelLevelFacade.isEnabled$()
                        .subscribe((value) => { this.isLabelLevelEnabled = value; });
    this.labelLevelFacade.getMinFixation$()
                        .subscribe((value) => {this.minFixation = value});

    this.labelLevelFacade.getMaxFixation$()
                        .subscribe((value) => {this.maxFixation = value});
  }

  ngOnInit(): void {
  }

  /** Generates a range of numbers from 0 to `SPLITS` - 1.*/
  get splitting() {
    return [...Array(this.SPLITS).keys()];
  }
}
