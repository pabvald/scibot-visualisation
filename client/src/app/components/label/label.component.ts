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
  
  color : string = "";
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
  }

  ngOnInit(): void {
    // Subscriptions
    this.labelLevelFacade.getColor$(this.label?.fixationDuration)
                        .subscribe((value) => { this.color = value; });
  }
}
