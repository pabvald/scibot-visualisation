import { ILabel } from "./label.model";

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
   
