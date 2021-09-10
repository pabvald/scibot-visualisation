import { Component, OnInit } from '@angular/core';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.scss']
})
export class ColorLegendComponent implements OnInit {

  legendDivisions: number = 10;
  minFixation: number = 0;
  maxFixation: number = 600;
  
  constructor(private labelLevelState: LabelLevelState) {
    this.labelLevelState.getMinFixation$()
                        .subscribe((value) => {this.minFixation = value});

    this.labelLevelState.getMaxFixation$()
                        .subscribe((value) => {this.maxFixation = value});
  }

  ngOnInit(): void {
  }

  

}
