import { ILabel, Label } from "./label.model";
import { IMapping } from "./mapping.model";


/**
 * Paragraph interface.
 */
export interface IParagraph  extends IMapping {
    id: number;
    answer: boolean;
    labels: ILabel[];
    isTitle: boolean;
    hasLabels: boolean;
    getFeatureById(id: string): any;
}
  

/**
 * Paragraph representation.
 */
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

    /**
     * @param paragraphObject a paragraph JSON object
     */
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

    getFeatureById(id: string) {
        let value = null;
        Object.entries(this).forEach(
            ([key, v]) => {
                if (key == id) { value = v; }
            }
          );
        return value;
    }
}

/** 
 * Paragraph feature interface.
 */
 export interface IParagraphFeatureConf {
    id: string;     
    name: string;
    enabled: boolean; 
}

export const paragraphFeatures: IParagraphFeatureConf[] = [
    {
        id: "avgFixDuration", 
        name: "Avg. fixation duration", 
        enabled: true
    },

    {
        id: "avgForwardSaccadeLength", 
        name: "Avg. forward saccade length", 
        enabled: true
    },

    {
        id: "regRatio", 
        name: "Regression ratio", 
        enabled: false
    },

    {
        id: "thoroughReadRatio", 
        name: "Thorough read ratio", 
        enabled: false
    },

    {
        id: "coherentReadLength", 
        name: "Coherent read length", 
        enabled: false
    },

];
