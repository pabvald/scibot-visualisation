import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataState } from 'src/app/state/data/data.state';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';

@Injectable({
  providedIn: 'root'
})
export class LabelLevelFacade {

  private minFixation$: Observable<number>;
  private maxFixation$: Observable<number>;

  constructor(
    private labelState: LabelLevelState,
    private dataState: DataState) { 

      this.minFixation$ = this.labelState.getMinFixation$();
      this.maxFixation$ = this.labelState.getMaxFixation$();
     
    }

  /** Some state is being updated */
  isUpdating$(): Observable<boolean> {
    return (this.dataState.isUpdating$() || this.labelState.isUpdating$());
  }

  /** Some state is being updated */
  isDisabled$(): Observable<boolean> {
    return this.labelState.isDisabled$();
  }

  setDisabled(isDisabled: boolean): void {
    this.labelState.setDisabled(isDisabled);
  }


  /**
   * Sets the mimimum visualized fixation.
   * @param minFixation new minimum visualized fixation
   */
  setMinFixation(minFixation: number) {
    this.labelState.setUpdating(true);
    if (minFixation >= 0) {
      this.labelState.setMinFixation(minFixation);
    } else {
      console.error('The minimum visualized fixation cannot be negative');
    }
    this.labelState.setUpdating(false);
  }

  /**
   * @returns the mimimum visualized fixation. 
   */
  getMinFixation$(): Observable<number> {
    return this.minFixation$;
  }

  /**
   * Sets the maximum visualized fixation.
   * @param maxFixation new maximum visualized fixation
   */
   setMaxFixation(maxFixation: number) {
    this.labelState.setUpdating(true);
    this.labelState.setMaxFixation(maxFixation);
    this.labelState.setUpdating(false);
  }

  /**
   * @returns the maximum visualized fixation.
   */
  getMaxFixation$(): Observable<number> {
    return this.maxFixation$;
  }

}
