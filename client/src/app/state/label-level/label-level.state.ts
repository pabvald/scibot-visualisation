import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelLevelState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private enabled$ = new BehaviorSubject<boolean>(true);
  private minFixation$ = new BehaviorSubject<number>(50);
  private maxFixation$ = new BehaviorSubject<number>(600);


  constructor() { }

  /**
   * @returns the label-level state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns the label-level state is enabled (`true`) or disabled (`false`)
   */
  isEnabled$(): Observable<boolean> {
    return this.enabled$.asObservable();
  }
  
  /**
   * @returns minimum fixation time (ms) to be visualized
   */
   getMinFixation$(): Observable<number> {
    return this.minFixation$.asObservable();
  } 

  /**
   * @returns maximum fixation time (ms) to be visualized
   */
   getMaxFixation$(): Observable<number> {
    return this.maxFixation$.asObservable();
  }

  /**
   * @param isUpdating `false` if the state has been updated, `true` if the state 
   * is going to be updated
   */
  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }
  
  /**
   * @param isEnabled the label level has to be enabled
   */
  setEnabled(isEnabled: boolean) {
    return this.enabled$.next(isEnabled);
  }

  /**
   * @param minFixation new minimum fixation time (ms)
   */
  setMinFixation(minFixation: number) {
    this.minFixation$.next(minFixation);
  }

  /**
   * @param maxFixation new maximum fixation time (ms)
   */
  setMaxFixation(maxFixation: number) {
    this.maxFixation$.next(maxFixation);
  } 

}
