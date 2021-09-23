import { Component, Input, OnInit } from '@angular/core';
import { ParagraphLevelFacade } from 'src/app/facade/paragraph-level/paragraph-level.facade';
import { IParagraph, IParagraphFeatureConf } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: IParagraph | undefined;

  isParLevelDisabled: boolean = true;
  featuresConf: IParagraphFeatureConf[] = [];

  constructor(private parLevelFacade: ParagraphLevelFacade) { 

    // Subscriptions
    this.parLevelFacade.isDisabled$()
                      .subscribe((value) => { this.isParLevelDisabled = value; });
    this.parLevelFacade.getFeaturesConf$()
                      .subscribe((featuresConf) => { this.featuresConf = featuresConf;});
  }

  ngOnInit(): void {
  }

}
