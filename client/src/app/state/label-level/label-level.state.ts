import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelLevelState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private labelLevelDisabled$ = new BehaviorSubject<boolean>(false);
  private minFixation$ = new BehaviorSubject<number>(0);
  private maxFixation$ = new BehaviorSubject<number>(600);


  constructor() { }

  /**
   * @returns the label-level state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns the label-level state is disabled (`true`) or not (`false`)
   */
  isDisabled$(): Observable<boolean> {
    return this.labelLevelDisabled$.asObservable();
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
   * @param isDisabled the label level has to be disabled
   */
  setDisabled(isDisabled: boolean) {
    return this.labelLevelDisabled$.next(isDisabled);
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
