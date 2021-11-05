export interface ILayout {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
}


export class Layout implements ILayout {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    
    constructor(layoutObject: any) {
        this.x1 = layoutObject.x1;
        this.y1 = layoutObject.y1;
        this.x2 = layoutObject.x2;
        this.y2 = layoutObject.y2;
    }

    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }
}