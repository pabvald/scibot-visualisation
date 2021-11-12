import { IBoundingBox, BoundingBox } from "./bounding-box";

/**
 * Base label interface.
 */
export interface ILabel {
    id: number;
}

/**
 * Text-and-layout label interface.
 */
export interface ILabelLayout extends ILabel{
    text: string;
    boundingBox: IBoundingBox;
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
    public boundingBox: BoundingBox;
    public text: string;
    public fixationDuration: number = 0.0;

    /**
     * 
     * @param labelLayout text and layout
     * @param labelFixation fixation time
     */
    constructor(labelLayout: ILabelLayout, labelFixation: ILabelFixation | undefined) {
        this.id = labelLayout.id;
        this.boundingBox = new BoundingBox(labelLayout.boundingBox);
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

}
