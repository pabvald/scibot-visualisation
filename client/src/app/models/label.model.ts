import { IBoundingBox } from "./bounding-box";

/**
 * Base label interface.
 */
export interface ILabel {
    id: number;
}

/**
 * Text-and-layout label interface.
 */
export interface ILabelLayout extends ILabel, IBoundingBox{
    text: string;
}

/**
 * Fixation-time-per-token label interface.
 */
export interface ILabelFixation extends ILabel{
    fixationDuration: number;
}


/**
 * Label representation
 */
export class Label implements ILabelLayout, ILabelFixation {
    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public text: string;
    public fixationDuration: number = 0.0;

    /**
     * 
     * @param labelLayout text and layout
     * @param labelFixation fixation time
     */
    constructor(labelLayout: ILabelLayout, labelFixation: ILabelFixation | undefined) {
        this.id = labelLayout.id;
        this.x1 = labelLayout.x1;
        this.y1 = labelLayout.y1;
        this.x2 = labelLayout.x2;
        this.y2 = labelLayout.y2;
        this.text = labelLayout.text
        if (labelFixation != undefined)
            this.fixationDuration = Label.transFixDuration(labelFixation.fixationDuration);
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

}
