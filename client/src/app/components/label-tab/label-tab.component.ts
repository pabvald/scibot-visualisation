import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';
import { FixationArea, IFixationArea } from 'src/app/models/fixation-area.model';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DataFacade } from 'src/app/facade/data/data.facade';

@Component({
  selector: 'app-label-tab',
  templateUrl: './label-tab.component.html',
  styleUrls: ['./label-tab.component.scss']
})
export class LabelTabComponent implements OnInit {
  
  isDisabled: boolean = false; 
  isLabelLevelUpdating: boolean = false;
  isDataUpdating: boolean = false;

  fixationStep = 50;
  thumbLabel = false;
  minFixation: number = 0;
  maxFixation: number = 0; 
  minFixationInterval: number[] = [0, 300];
  maxFixationInterval: number[] = [400, 700];
   
  fixationAreaOptions: FormGroup;
  leftMarginCtrl = new FormControl({value: null}, Validators.min(0));
  rightMarginCtrl = new FormControl({value: null}, Validators.min(0));


  constructor(
    private dataFacade: DataFacade,
    private labelLevelFacade: LabelLevelFacade, 
    fb: FormBuilder) { 
    
    // create form group
    this.fixationAreaOptions = fb.group({
      leftMargin: this.leftMarginCtrl,
      rightMargin: this.rightMarginCtrl
    });
    
    // subscriptions
    this.labelLevelFacade.isDisabled$()
                        .subscribe((value) => {
                          this.isDisabled = value; 
                          this.enableFixationAreaOptions();
                        });
    this.dataFacade.isUpdating$()
                        .subscribe((value) => { this.isDataUpdating = value; })
    this.labelLevelFacade.isUpdating$()
                        .subscribe((value) => { this.isLabelLevelUpdating = value; });
    this.labelLevelFacade.getMinFixation$()
                        .subscribe((value) => { this.minFixation = value; });
    this.labelLevelFacade.getMaxFixation$()
                        .subscribe((value) => { this.maxFixation = value; });
    this.labelLevelFacade.getFixationArea$()
                        .subscribe((fixationArea) => {
                          this.fixationAreaOptions.controls['leftMargin']
                                                  .setValue(fixationArea.leftMargin);
                          this.fixationAreaOptions.controls['rightMargin']
                                                  .setValue(fixationArea.rightMargin);
                        });    
  }

  ngOnInit(): void {
    this.enableFixationAreaOptions();
  }

  /**
   * Any state is being updated.
   */
  get isUpdating(): boolean {
    return this.isLabelLevelUpdating || this.isDataUpdating;
  }

  /**
   * The apply button is disabled.
   */
  get isApplyDisabled(): boolean {
    return !this.fixationAreaOptions.valid;
  }

  /**
   * Enables or disables the form controls depending on the 
   * `@this.isDisable` value.
   */
  enableFixationAreaOptions() {
    if (this.isDisabled) {
      this.fixationAreaOptions.disable();
    } else {
      this.fixationAreaOptions.enable();
    }
  }

  /**
   * @param event change on the mininum fixation slider's value
   */
  onMinFixationChange(event: MatSliderChange): void {
    if (event.value) {
      console.log("minFixation " + event.value);
      this.labelLevelFacade.setMinFixation(event.value);
    }    
  }

  /**
   * @param event change on the maximum fixation slider's value
   */
  onMaxFixationChange(event: MatSliderChange): void {
    if (event.value) {
      console.log("maxFixation " + event.value);
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

  /**
   * 
   */
  setFixationArea() {
    if (this.fixationAreaOptions.valid) {
      this.labelLevelFacade.setFixationArea(
        new FixationArea(this.leftMarginCtrl.value, this.rightMarginCtrl.value)
      );
    }
    
  }
}
