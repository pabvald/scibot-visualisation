import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParagraphFeatureConf } from 'src/app/models/paragraph.model';
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
   * @returns The paragraph-level state is disabled  
   */
  isDisabled$(): Observable<boolean> {
    return this.paragraphLevelState.isDisabled$();
  }

  /**
   * @returns the paragraph features' configuration
   */
  getFeaturesConf$(): Observable<IParagraphFeatureConf[]> {
    return this.paragraphLevelState.getFeaturesConf$();
  }

  /**
   * @param isDisabled the paragraph level is set to 'disabled'
   */
  setDisabled(isDisabled: boolean) {
    this.paragraphLevelState.setDisabled(isDisabled);
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
