import { Injectable } from '@angular/core';
import { ParagraphFeatureConf } from 'src/app/models/paragraph.model';
import { BehaviorSubject, Observable } from 'rxjs';


const featuresConf: ParagraphFeatureConf[] = [
  { id: "f_total_time",           name: "Total time",               transform: 1.0,    units: "",   enabled: false  },
  { id: "f_fixn_n",               name: "Number of fixations",      transform: 1.0,    units: "",   enabled: false  },
  { id: "f_fixn_dur_sum",         name: "Sum fixation duration",    transform: 1.0,    units: "s",  enabled: false  },
  { id: "f_fixn_dur_avg",         name: "Avg. fixation duration",   transform: 1000.0, units: "ms", enabled: true  },
  { id: "f_fixn_dur_sd",          name: "Sd. fixation duration",    transform: 1000.0, units: "ms", enabled: false },
  { id: "f_scan_distance_h",      name: "Scan distance horizontal", transform: 1.0,    units: "",   enabled: false  },
  { id: "f_scan_distance_v",      name: "Scan distance vertical",   transform: 1.0,    units: "",   enabled: false  },
  { id: "f_scan_distance_euclid", name: "Scan distance euclidean",  transform: 1.0,    units: "",   enabled: true  },
  { id: "f_scan_hv_ratio",        name: "Scan hv ratio",            transform: 1.0,    units: "",   enabled: false },
  { id: "f_avg_sacc_length",      name: "Avg. saccade length",      transform: 1.0,    units: "",   enabled: false  },
  { id: "f_scan_speed_h",         name: "Scan speed horizontal",    transform: 1.0,    units: "",   enabled: false },
  { id: "f_scan_speed_v",         name: "Scan speed vertical",      transform: 1.0,    units: "",   enabled: false },
  { id: "f_scan_speed",           name: "Scan speed",               transform: 1.0,    units: "",   enabled: true },
  { id: "f_box_area",             name: "Box area",                 transform: 1.0,    units: "",   enabled: true },
  { id: "f_box_area_per_time",    name: "Box area per time",        transform: 1.0,    units: "",   enabled: false },
  { id: "f_fixns_per_box_area",   name: "Fixations per box area",   transform: 1.0,    units: "",   enabled: false },
  { id: "f_hull_area_per_time",   name: "Hull area per time",       transform: 1.0,    units: "",   enabled: false },
  { id: "f_fixns_per_hull_area",  name: "Fixations per hull area",  transform: 1.0,    units: "",   enabled: false }
];


@Injectable({
  providedIn: 'root'
})
export class ParagraphLevelState {

  private featuresConf$ = new BehaviorSubject<ParagraphFeatureConf[]>(featuresConf);
  private updating$ = new BehaviorSubject<boolean>(false);
  private enabled$ = new BehaviorSubject<boolean>(true);

  /**
   * @returns the paragraph-level state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns the paragraph level is enabled
   */
  isEnabled$(): Observable<boolean> {
    return this.enabled$.asObservable();
  }

  /**
   * @returns paragraph features' configuration
   */
  getFeaturesConf$(): Observable<ParagraphFeatureConf[]> {
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
   * @param isEnabled the paragraph level has to be enabled
   */
  setEnabled(isEnabled: boolean) {
    this.enabled$.next(isEnabled);
  }  

  /**
   * @param featureseConf new paragraph features' configuration
   */
  setFeaturesConf(featureseConf: ParagraphFeatureConf[]) {
    this.featuresConf$.next(featureseConf);
  }
}
