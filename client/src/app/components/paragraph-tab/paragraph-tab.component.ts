import { Component, OnInit } from '@angular/core';
import { ParagraphLevelFacade } from 'src/app/facade/paragraph-level/paragraph-level.facade';
import { ParagraphFeatureConf } from 'src/app/models/paragraph.model';


@Component({
  selector: 'app-paragraph-tab',
  templateUrl: './paragraph-tab.component.html',
  styleUrls: ['./paragraph-tab.component.scss']
})
export class ParagraphTabComponent implements OnInit {

  isEnabled: boolean = true; 
  isParLevelStateUpdating: boolean = false;
  features: ParagraphFeatureConf[] = [];
  allFeaturesEnabled: boolean = false;

  constructor(private parLevelFacade: ParagraphLevelFacade) { 

    // subscriptions 
    this.parLevelFacade.isEnabled$()
                      .subscribe((value) => { this.isEnabled = value; });
    this.parLevelFacade.isUpdating$()
                      .subscribe((value) => { this.isParLevelStateUpdating = value; });
    this.parLevelFacade.getFeaturesConf$()
                      .subscribe((features) => { this.features = features; });

  }

  ngOnInit(): void {
  }

  /**
   * Some of the paragraph features are enabled.
   */
  get someFeaturesEnabled(): boolean {
    if (this.features == null) {
      return false;
    }
    return this.features.filter(f => f.enabled).length > 0 && !this.allFeaturesEnabled;
  } 

  /**
   * Update the flag of 'all features enabled'.
   */
  updateAllEnabled(): void {
    this.allFeaturesEnabled = this.features != [] && this.features.every(f => f.enabled);
    this.updateFeaturesConf();
  }

  /**
   * Enable/disabled all paragraph features
   * @param enabled `true` if all features are to be enabled, `false` if all features
   * are to be disabled.
   */
  setAllFeatures(enabled: boolean): void {
    this.allFeaturesEnabled = enabled;
    if (this.features != []) {
      this.features.forEach(f => f.enabled = enabled);
      this.updateFeaturesConf();
    }
  }

  /**
   * Enable/disabled the paragraph level
   * @param enable the paragraph level is enabled
   */
  setParLevelEnabled(enable: boolean): void {
    this.parLevelFacade.setDisabled(enable);
  }

  /** Update the feature configuration */
  updateFeaturesConf(): void {
    this.parLevelFacade.setFeaturesConf(this.features);
  }

}
