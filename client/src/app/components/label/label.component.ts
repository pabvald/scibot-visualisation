import { Component, Input, OnInit } from '@angular/core';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';
import { ILabel } from 'src/app/models/label.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {


  @Input() label: ILabel | undefined; 
  @Input() isTitle: boolean = false; 
  
  colorGradient: any;
  isLabelLevelDisabled: boolean = false; 
  minFixation: number = 0.0;
  maxFixation: number = 0.0;

  constructor(private labelLevelFacade: LabelLevelFacade) {

    // Subscriptions
    this.labelLevelFacade.isDisabled$()
                        .subscribe((value) =>  { this.isLabelLevelDisabled = value; });
    this.labelLevelFacade.getMinFixation$()
                        .subscribe((value) => { this.minFixation = value; });
    this.labelLevelFacade.getMaxFixation$()
                        .subscribe((value) => { this.maxFixation = value; });
    
    this.colorGradient = this.labelLevelFacade.getColorGradient();
  }

  ngOnInit(): void {

  }

  /**
   * Computes the color of the gradient for the label.
   */
  get color(): string {
    let colorName: string = `rgb(255, 255, 255)`; // white
    let percent: number; 

    if (this.colorGradient && this.label && !this.isLabelLevelDisabled) {
      percent = ((this.label?.fixationDuration - this.minFixation) / this.maxFixation) * 100;
      percent = Math.min(100, percent);

      if (percent >= 0) {
        const color = this.colorGradient.getImageData(percent, 0, 1, 1);
        const rgba = color.data;
        
        colorName =  `rgb(${ rgba[0] }, ${ rgba[1] }, ${ rgba[2] })`;
      }     
    } 

    return colorName;
  }
}
