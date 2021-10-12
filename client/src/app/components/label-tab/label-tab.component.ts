import { Component, OnInit } from '@angular/core';
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
  
  // General settings
  isEnabled: boolean = false; 
  isLabelLevelUpdating: boolean = false;
  isDataUpdating: boolean = false;

  // Fixation duration settings
  sliderStep = 5;
  thumbLabel = true;
  minFixation: number = 0;
  maxFixation: number = 0; 
  minFixationInterval: number[] = [0, 400];
  maxFixationInterval: number[] = [500, 800];
   
  // Fixation area settings
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
    this.labelLevelFacade.isEnabled$()
                        .subscribe((value) => {
                          this.isEnabled = value; 
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
   * `@this.isEnabled` value.
   */
  enableFixationAreaOptions() {
    if (this.isEnabled) {
      this.fixationAreaOptions.enable();
    } else {
      this.fixationAreaOptions.disable();
    }
  }

  /**
   * Enable/disable the lebel level.
   * @param enabled is enabled.
   */
   setLabelLevelEnabled(enabled: boolean) {
    this.labelLevelFacade.setEnabled(enabled);
  }

  /** Update the minimum fixation duration */
  updateMinFixation()  {
    this.labelLevelFacade.setMinFixation(this.minFixation);
  }

  /** Update the maximum fixation duration */
  updateMaxFixation() {
    this.labelLevelFacade.setMaxFixation(this.maxFixation);
  }  

  /**
   * Updates the fixation area configuration.
   */
  updateFixationArea() {
    if (this.fixationAreaOptions.valid) {
      this.labelLevelFacade.setFixationArea(
        new FixationArea(this.leftMarginCtrl.value, this.rightMarginCtrl.value)
      );
    }    
  }
  
}
