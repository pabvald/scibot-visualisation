import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParagraphFeatureConf } from 'src/app/models/feature-conf.model';
import { ParagraphLevelState } from 'src/app/state/paragraph-level/paragraph-level.state';

@Injectable({
  providedIn: 'root'
})
export class ParagraphLevelFacade {


  constructor(private paragraphLevelState: ParagraphLevelState) {
  }

  /** 
   * @returns The paragraph-level state is being updated 
   */
  isUpdating$(): Observable<boolean> {
    return this.paragraphLevelState.isUpdating$();
  }

  /** 
   * @returns The paragraph-level state is enabled  
   */
  isEnabled$(): Observable<boolean> {
    return this.paragraphLevelState.isEnabled$();
  }

  /**
   * @returns the paragraph features' configuration
   */
  getFeaturesConf$(): Observable<IParagraphFeatureConf[]> {
    return this.paragraphLevelState.getFeaturesConf$();
  }

  /**
   * @param isEnabled the paragraph level is to be enabled or not.
   */
  setDisabled(isEnabled: boolean) {
    this.paragraphLevelState.setEnabled(isEnabled);
  }

  /**
   * 
   * @param features new paragraph features' configuration
   */
  setFeaturesConf(featuresConf: IParagraphFeatureConf[]) {
    this.paragraphLevelState.setUpdating(true);
    this.paragraphLevelState.setFeaturesConf(featuresConf);
    this.paragraphLevelState.setUpdating(false);
  }

}
