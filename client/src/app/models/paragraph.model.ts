import { ILabel, Label } from "./label.model";
import { IMapping } from "./mapping.model";

export interface IParagraph  extends IMapping {
    id: number;
    answer: boolean;
    labels: ILabel[];
    isTitle: boolean;
    hasLabels: boolean;
}
  

export class Paragraph implements IParagraph {
    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public answer: boolean;
    public labels: ILabel[];
    public avgFixDuration: number;
    public avgForwardSaccadeLength: number;
    public regRatio: number;
    public thoroughReadRatio: number;
    public coherentReadLength: number;

    constructor(paragraphObject: any) {
        this.id = paragraphObject.id;
        this.x1 = paragraphObject.x1; 
        this.y1 = paragraphObject.y1; 
        this.x2 = paragraphObject.x2; 
        this.y2 = paragraphObject.y2; 
        this.answer = paragraphObject.answer;
        this.labels = paragraphObject.labels.map((lbl: any) => new Label(lbl));
        this.avgFixDuration = paragraphObject.avgFixDuration;
        this.avgForwardSaccadeLength = paragraphObject.avgForwardSaccadeLength;
        this.regRatio = paragraphObject.regRatio;
        this.thoroughReadRatio = paragraphObject.thoroughReadRatio;
        this.coherentReadLength = paragraphObject.coherentReadLength;
    }

    get isTitle(): boolean {
        return this.id == -1;
    }

    get hasFeatures(): boolean {
        return this.id >= 0;
    }

    get hasLabels(): boolean {
        return this.labels.length > 0;
    }

    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }
}
