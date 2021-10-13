import { Component, Input, OnInit } from '@angular/core';
import { LabelLevelFacade } from 'src/app/facade/label-level/label-level.facade';
import { ParagraphLevelFacade } from 'src/app/facade/paragraph-level/paragraph-level.facade';
import { IParagraph, IParagraphFeatureConf } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  // Inputs
  @Input() paragraph: IParagraph | undefined;

  // Constants
  readonly ID_HEIGHT: number = 5; // in %
  readonly MARGIN: number = 4; // in %
  readonly COLORBAR_WIDTH: number = 1.1; // in %
  readonly HEIGHT_REDUCTION: number = 0.95; 
  readonly WIDTH_REDUCTION_F: number = 0.5; 
  readonly WIDTH_REDUCTION_R: number = 0.6;
  readonly MATH: any = Math; // Math library


  color: string = "lightgrey";
  isParLevelEnabled: boolean = true;
  featuresConf: IParagraphFeatureConf[] = [];

  constructor(private parLevelFacade: ParagraphLevelFacade,
              private labelLevelFacade: LabelLevelFacade) { 

    // Subscriptions
    this.parLevelFacade.isEnabled$()
                      .subscribe((value) => { this.isParLevelEnabled = value; });
    this.parLevelFacade.getFeaturesConf$()
                      .subscribe((featuresConf) => { this.featuresConf = featuresConf;});
  }

  ngOnInit(): void {
    // this.labelLevelFacade.getColor$(this.paragraph?.getFeatureById('f_fixn_dur_avg') * 1000, 1.0)
    //                     .subscribe((value) => { this.color = value; });
  }

  /**
   * Determines if there are visible features.
   */
  get areVisibleFeatures(): boolean {
    let anyVisible = false;
    this.featuresConf.forEach((f) => {
      if (f.enabled && this.paragraph?.getFeatureById(f.id) != null) {
        anyVisible = true;
      }
    });
    return anyVisible;
  }

}
