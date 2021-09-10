import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';

@Component({
  selector: 'app-label-tab',
  templateUrl: './label-tab.component.html',
  styleUrls: ['./label-tab.component.scss']
})
export class LabelTabComponent implements OnInit {
  
  isDisabled: boolean = false; 

  fixationStep = 50;
  thumbLabel = false;
  minFixation: number = 0;
  maxFixation: number = 700;  
  minFixationInterval: number[] = [0, 300];
  maxFixationInterval: number[] = [400, 700];
   
  
  constructor(private labelLevelFacade: LabelLevelFacade) { 
    this.labelLevelFacade.isDisabled$()
                         .subscribe((d) => {this.isDisabled = d});
    this.labelLevelFacade.getMinFixation$()
                        .subscribe((value) => {this.minFixation = value});
    this.labelLevelFacade.getMaxFixation$()
                        .subscribe((value) => {this.maxFixation = value});
  }

  ngOnInit(): void {
  }

  /**
   * @param event change on the mininum fixation slider's value
   */
  onMinFixationChange(event: MatSliderChange): void {
    if (event.value) {
      this.labelLevelFacade.setMinFixation(event.value);
    }    
  }

  /**
   * @param event change on the maximum fixation slider's value
   */
  onMaxFixationChange(event: MatSliderChange): void {
    if (event.value) {
      this.labelLevelFacade.setMaxFixation(event.value);
    }    
  }

  /** 
   * @param event change on the checked slide toggle's value
   */
  onIsDisabledChange(event: MatSlideToggleChange): void {
    if (event) {
      this.labelLevelFacade.setDisabled(!event.checked);
    }
  }

}
