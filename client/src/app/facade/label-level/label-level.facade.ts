import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFixationArea } from 'src/app/models/fixation-area.model';
import { DataState } from 'src/app/state/data/data.state';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';
import { DataFacade } from '../data/data.facade';

@Injectable({
  providedIn: 'root'
})
export class LabelLevelFacade {

  private minFixation$: Observable<number>;
  private maxFixation$: Observable<number>;
  private fixationArea$: Observable<IFixationArea>;

  constructor(
    private dataFacade: DataFacade,
    private labelState: LabelLevelState,
    private dataState: DataState) { 

      this.minFixation$ = this.labelState.getMinFixation$();
      this.maxFixation$ = this.labelState.getMaxFixation$();
      this.fixationArea$ = this.dataState.getFixationArea$();     
    }

  /** Some state is being updated */
  isUpdating$(): Observable<boolean> {
    return (this.dataState.isUpdating$() || this.labelState.isUpdating$());
  }

  /** Some state is being updated */
  isDisabled$(): Observable<boolean> {
    return this.labelState.isDisabled$();
  }
  
  /**
   * @returns the mimimum visualized fixation. 
   */
   getMinFixation$(): Observable<number> {
    return this.minFixation$;
  }

  /**
   * @returns the maximum visualized fixation.
   */
   getMaxFixation$(): Observable<number> {
    return this.maxFixation$;
  }

  getFixationArea$(): Observable<IFixationArea> {
    return this.fixationArea$;
  }

  /**
   * @param isDisabled the label level is disabled
   */
  setDisabled(isDisabled: boolean) {
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
   * Sets the maximum visualized fixation.
   * @param maxFixation new maximum visualized fixation
   */
   setMaxFixation(maxFixation: number) {
    this.labelState.setUpdating(true);
    this.labelState.setMaxFixation(maxFixation);
    this.labelState.setUpdating(false);
  }

  /**
   * Sets the fixation area.
   * @param fixationArea fixation area
   */
  setFixationArea(fixationArea: IFixationArea) {
    this.dataState.setUpdating(true);
    this.dataState.setFixationArea(fixationArea);
    this.dataFacade.reloadDocument();
  }
}
