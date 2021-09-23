import { Injectable } from '@angular/core';
import { IParagraphFeatureConf, paragraphFeatures } from 'src/app/models/paragraph.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParagraphLevelState {

  private featuresConf$ = new BehaviorSubject<IParagraphFeatureConf[]>(paragraphFeatures);
  private updating$ = new BehaviorSubject<boolean>(false);
  private paragraphLevelDisabled$ = new BehaviorSubject<boolean>(false);

  /**
   * @returns the paragraph-level state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns the paragraph level is disabled
   */
  isDisabled$(): Observable<boolean> {
    return this.paragraphLevelDisabled$.asObservable();
  }

  /**
   * @returns paragraph features' configuration
   */
  getFeaturesConf$(): Observable<IParagraphFeatureConf[]> {
    return this.featuresConf$.asObservable();
  }

  /**
   * @param isUpdating `false` if the state has been updated, `true` if the state 
   * is going to be updated
   */
  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }
  
  /**
   * @param isDisabled the paragraph level has to be disabled
   */
  setDisabled(isDisabled: boolean) {
    this.paragraphLevelDisabled$.next(isDisabled);
  }  

  /**
   * @param featureseConf new paragraph features' configuration
   */
  setFeaturesConf(featureseConf: IParagraphFeatureConf[]) {
    this.featuresConf$.next(featureseConf);
  }
}
