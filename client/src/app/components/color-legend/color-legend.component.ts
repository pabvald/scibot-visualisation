import { Component, OnInit } from '@angular/core';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.scss']
})
export class ColorLegendComponent implements OnInit {

  colors: string[] = [];
  isLabelLevelDisabled: boolean = false;
  legendDivisions: number = 10;
  minFixation: number = 0;
  maxFixation: number = 600;
  
  constructor(private labelLevelFacade: LabelLevelFacade) {
    this.colors = this.labelLevelFacade.getColors();

    // Subscriptions
    this.labelLevelFacade.isDisabled$()
                        .subscribe((value) => { this.isLabelLevelDisabled = value; });
    this.labelLevelFacade.getMinFixation$()
                        .subscribe((value) => {this.minFixation = value});

    this.labelLevelFacade.getMaxFixation$()
                        .subscribe((value) => {this.maxFixation = value});
  }

  ngOnInit(): void {
  }

  

}
