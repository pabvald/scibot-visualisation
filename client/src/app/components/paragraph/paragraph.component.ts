import { Component, Input, OnInit } from '@angular/core';
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


  isParLevelDisabled: boolean = true;
  featuresConf: IParagraphFeatureConf[] = [];

  // Style
  styleIdHeight: number = 6;
  styleWidthReduction: number = 2.5;
  styleColorBarWidth: number = 1.1;

  constructor(private parLevelFacade: ParagraphLevelFacade) { 

    // Subscriptions
    this.parLevelFacade.isDisabled$()
                      .subscribe((value) => { this.isParLevelDisabled = value; });
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

}
