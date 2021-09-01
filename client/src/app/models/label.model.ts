export interface ILabel {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    text: string;
}

export class Label implements ILabel {

    public id: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public text: string;

    constructor(id: number, x1: number, y1: number, x2: number,
                y2: number, text: string) {
        this.id = id;
        this.x1 = x1; 
        this.y1 = y1; 
        this.x2 = x2; 
        this.y2 = y2; 
        this.text = text;
    }
}
