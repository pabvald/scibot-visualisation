import { ILabel, Label } from "./label.model";

export interface IParagraph {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    answer: boolean;
    labels: ILabel[];
    isTitle: boolean;
}
  

export class Paragraph implements IParagraph {
    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public answer: boolean;
    public labels: ILabel[];

    constructor(paragraphObject: any) {
        this.id = paragraphObject.id;
        this.x1 = paragraphObject.x1; 
        this.y1 = paragraphObject.y1; 
        this.x2 = paragraphObject.x2; 
        this.y2 = paragraphObject.y2; 
        this.answer = paragraphObject.answer;
        this.labels = paragraphObject.labels.map((lbl: any) => new Label(lbl));
    }

    get isTitle(): boolean {
        return this.id == -1;
    }
}
