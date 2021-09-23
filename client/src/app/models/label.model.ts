import { IMapping } from "./mapping.model";

export interface ILabel extends IMapping {
    id: number;
    text: string;
    fixationDuration: number;
    inTitle: boolean;
}

export class Label implements ILabel {

    private parId: number;
    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public text: string;
    public fixationDuration: number;

    constructor(labelObject: any) {
        this.parId = labelObject.parId;
        this.id = labelObject.id;
        this.x1 = labelObject.x1; 
        this.y1 = labelObject.y1; 
        this.x2 = labelObject.x2; 
        this.y2 = labelObject.y2; 
        this.text = labelObject.text;
        this.fixationDuration = Label.transFixDuration(labelObject.fixationDuration);
    }

    /**
     * Transforms the fixation duration to the corresponding units.
     * @param duration in seconds
     * @returns durations in miliseconds
     */
    private static transFixDuration(duration: number): number {
        return (duration * 1000); 
    }
    
    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }

    get inTitle(): boolean {
        return this.parId == -1;
    }
}
