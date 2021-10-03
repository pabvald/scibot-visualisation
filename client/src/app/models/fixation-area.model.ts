export interface IFixationArea {
    leftMargin: number; 
    rightMargin: number;
}


export class FixationArea implements IFixationArea {
    public leftMargin: number;
    public rightMargin: number; 

    constructor(leftMargin: number, rightMargin: number) {
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
    }
}