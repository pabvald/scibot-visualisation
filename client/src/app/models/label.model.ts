import { IMapping } from "./mapping.model";

export interface ILabel extends IMapping {
    id: number;
    text: string;
    fixationDuration: number;
}

export class Label implements ILabel {

    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public text: string;
    public fixationDuration: number;

    constructor(labelObject: any) {
        this.id = labelObject.id;
        this.x1 = labelObject.x1; 
        this.y1 = labelObject.y1; 
        this.x2 = labelObject.x2; 
        this.y2 = labelObject.y2; 
        this.text = labelObject.text;
        this.fixationDuration = labelObject.fixationDuration;
    }

    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }
}
