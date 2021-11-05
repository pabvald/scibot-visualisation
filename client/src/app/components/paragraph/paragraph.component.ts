import { Component, Input, OnInit } from '@angular/core';
import { ParagraphLevelFacade } from 'src/app/facade/paragraph-level/paragraph-level.facade';
import { Paragraph, ParagraphFeatureConf } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  // Inputs
  @Input() paragraph: Paragraph | undefined;

  // Constants
  readonly ID_HEIGHT: number = 4; // in %
  readonly MARGIN: number = 4; // in %
  readonly COLORBAR_WIDTH: number = 1.1; // in %
  readonly HEIGHT_REDUCTION: number = 0.95; 
  readonly WIDTH_REDUCTION_F: number = 0.5; 
  readonly WIDTH_REDUCTION_R: number = 0.6;


  color: string = "lightgrey";
  isParLevelEnabled: boolean = true;
  featuresConf: ParagraphFeatureConf[] = [];

  constructor(private parLevelFacade: ParagraphLevelFacade) { 

    // Subscriptions
    this.parLevelFacade.isEnabled$()
                      .subscribe((value) => { this.isParLevelEnabled = value; });
    this.parLevelFacade.getFeaturesConf$()
                      .subscribe((featuresConf) => { this.featuresConf = featuresConf;});
  }

  ngOnInit(): void {
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

  /**
   * Compute the opacity of the predicted relevance.
   */
  get predictedRelevanceOpacity(): number {
    if (this.paragraph)
      return 40 + 120 * Math.abs(this.paragraph.predictedRelevance[0] - 0.5);
    return 100;
  }
}
