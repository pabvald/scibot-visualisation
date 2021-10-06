import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { first, shareReplay, take, map} from 'rxjs/operators';
import { IFixationArea } from 'src/app/models/fixation-area.model';
import { DataState } from 'src/app/state/data/data.state';
import { LabelLevelState } from 'src/app/state/label-level/label-level.state';
import { DataFacade } from '../data/data.facade';

@Injectable({
  providedIn: 'root'
})
export class LabelLevelFacade {

  private colorGradient: CanvasRenderingContext2D | null;
  private isLabelLevelEnabled$: Observable<boolean>;
  private minFixation$: Observable<number>;
  private maxFixation$: Observable<number>;
  private fixationArea$: Observable<IFixationArea>;  
  private colors: string[] = ["#dfdef7ff",
                              "#c8d5f2ff",
                              "#b1ccedff",
                              "#a1d6c6ff",
                              "#90e09fff",
                              "#d6cd5fff",
                              "#d8ab56ff",
                              "#e1813fff",
                              "#e95727ff",
                              "#ff401fff"];

  constructor(
    private dataFacade: DataFacade,
    private labelState: LabelLevelState,
    private dataState: DataState) { 

      this.isLabelLevelEnabled$ = this.labelState.isEnabled$();
      this.minFixation$ = this.labelState.getMinFixation$();
      this.maxFixation$ = this.labelState.getMaxFixation$();
      this.fixationArea$ = this.dataState.getFixationArea$();     
      this.colorGradient = this.initColorGradient();
  }


  /**
   * Initialize the color gradient.
   * @returns canvas rendering context of the color gradient
   */
  initColorGradient(): CanvasRenderingContext2D | null {

    let context = null;
    const WIDTH = 101; 
    const HEIGHT = 1;

    // Canvas
    const canvasElement  = <HTMLCanvasElement>document.createElement("CANVAS");
    canvasElement.width = 101;
    canvasElement.height = 1;
    context = canvasElement.getContext("2d");

    if (context) {
      // Gradient
      const gradient = context.createLinearGradient(0, 0, WIDTH, 0); // x0, y0, x1, y1
      
      const step = 0.1; //1 / (this.colors.length - 1); // need to validate at least two colors in gradientColors
      let val = 0;
      this.colors.forEach(color => {
        gradient.addColorStop(val, color);
        val += step;
      });

      // Fill with gradient
      context.fillStyle = gradient;
      context.fillRect(0, 0, WIDTH, HEIGHT); // x, y, width, height   
    }
    return context;    
  }

  /**
   * Computes the color of a certain point in the fixation duration range.
   * @param fixationDuration a fixation duration
   * @param alpha transparency of the rgb colors
   */
  getColor$(fixationDuration: number | undefined, alpha: number = 0.7): Observable<string> {
    const a = alpha;
    const defaultColor : string =  `rgb(255, 255, 255, 1)`; // white;
    let color : string = defaultColor;
    let percent : number = 0;  
    
    return combineLatest([this.minFixation$, 
                          this.maxFixation$, 
                          this.isLabelLevelEnabled$]).pipe(map(([min, max, enabled]) => {  
      color = defaultColor;
      if (enabled && fixationDuration != undefined) {
        percent = ((fixationDuration - min) / max) * 100;
        percent = Math.min(100, percent);

        if (percent >= 0 && this.colorGradient != null) {
          const colorObj = this.colorGradient.getImageData(percent, 0, 1, 1);
          const rgba = colorObj.data;
  
          color =  `rgb(${ rgba[0] }, ${ rgba[1] }, ${ rgba[2] }, ${a})`;
        } 
      } 
      return color;
    }))
  }
  
  /** Some state is being updated */
  isUpdating$(): Observable<boolean> {
    return (this.dataState.isUpdating$() || this.labelState.isUpdating$());
  }

  /** The label-level is enabled */
  isEnabled$(): Observable<boolean> {
    return this.labelState.isEnabled$();
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

  /**
   * @returns 
   */
  getFixationArea$(): Observable<IFixationArea> {
    return this.fixationArea$;
  }

  /**
   * @param isEnabled the label level is enabled
   */
  setEnabled(isEnabled: boolean) {
    this.labelState.setEnabled(isEnabled);
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
