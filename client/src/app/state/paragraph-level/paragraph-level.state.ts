import { Injectable } from '@angular/core';
import { IParagraphFeatureConf } from 'src/app/models/paragraph.model';
import { BehaviorSubject, Observable } from 'rxjs';


 const featuresConf: IParagraphFeatureConf[] = [
  //{ id: "f_total_time",           name: "Total time",             units: "u", enabled: true },
  //{ id: "f_fixn_n",               name: "No. fixations",          units: "u", enabled: true },
  //{ id: "f_fixn_dur_sum",         name: "Sum fixation duration",  units: "u", enabled: true },
  //{ id: "f_fixn_dur_avg",         name: "Avg. fixation duration",   units: "u", enabled: true  },
  //{ id: "f_fixn_dur_sd",          name: "Sd. fixation duration",    units: "u", enabled: false },
  { id: "f_scan_distance_h",      name: "Scan distance horizontal", units: "u", enabled: true  },
  { id: "f_scan_distance_v",      name: "Scan distance vertical",   units: "u", enabled: true  },
  { id: "f_scan_distance_euclid", name: "Scan distance euclidean",  units: "u", enabled: true  },
  { id: "f_scan_hv_ratio",        name: "Scan hv ratio",            units: "u", enabled: false },
  { id: "f_avg_sacc_length",      name: "Avg. saccade length",      units: "u", enabled: true  },
  { id: "f_scan_speed_h",         name: "Scan speed horizontal",    units: "u", enabled: false },
  { id: "f_scan_speed_v",         name: "Scan speed vertical",      units: "u", enabled: false },
  { id: "f_scan_speed",           name: "Scan speed",               units: "u", enabled: false },
  { id: "f_box_area",             name: "Box area",                 units: "u", enabled: false },
  { id: "f_box_area_per_time",    name: "Box area per time",        units: "u", enabled: false },
  { id: "f_fixns_per_box_area",   name: "Fixations per box area",   units: "u", enabled: false },
  { id: "f_hull_area_per_time",   name: "Hull area per time",       units: "u", enabled: false },
  { id: "f_fixns_per_hull_area",  name: "Fixations per hull area",  units: "u", enabled: false }
 ]; 

@Injectable({
  providedIn: 'root'
})
export class ParagraphLevelState {

  private featuresConf$ = new BehaviorSubject<IParagraphFeatureConf[]>(featuresConf);
  private updating$ = new BehaviorSubject<boolean>(false);
  private paragraphLevelDisabled$ = new BehaviorSubject<boolean>(true);

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
