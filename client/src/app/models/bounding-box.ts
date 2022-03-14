export interface IBoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
}


export class BoundingBox implements IBoundingBox {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    
    constructor(boundingBoxObject: any) {
        this.x1 = boundingBoxObject.x1;
        this.y1 = boundingBoxObject.y1;
        this.x2 = boundingBoxObject.x2;
        this.y2 = boundingBoxObject.y2;
    }

    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }
}