import { ILabel, Label } from "./label.model";
import { IBoundingBox } from "./bounding-box.model";


/**
 * Paragraph interface.
 */
export interface IParagraph  extends IBoundingBox {
    id: number;
    systemRelevance: boolean;
    perceivedRelevance: boolean;
    predictedRelevance: [number, boolean];
    labels: ILabel[];
    isTitle: boolean;
    hasLabels: boolean;
    hasFeatures: boolean;
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
    public systemRelevance: boolean;
    public perceivedRelevance: boolean;
    public predictedRelevance: [number, boolean];
    public labels: ILabel[];
    public features: Object;

    /**
     * @param paragraphObject a paragraph JSON object
     */
    constructor(paragraphObject: any) {
        this.id = paragraphObject.id;
        this.x1 = paragraphObject.x1; 
        this.y1 = paragraphObject.y1; 
        this.x2 = paragraphObject.x2; 
        this.y2 = paragraphObject.y2; 
        this.systemRelevance = paragraphObject.systemRelevance;
        this.perceivedRelevance = paragraphObject.perceivedRelevance;
        this.predictedRelevance = paragraphObject.predictedRelevance;
        this.labels = paragraphObject.labels.map((lbl: any) => new Label(lbl));
        this.features = paragraphObject.features;
    }

    get isTitle(): boolean {
        return this.id == -1;
    }

    get hasFeatures(): boolean {
        return this.id >= 0 && Object.keys(this.features).length > 0;
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
        Object.entries(this.features).forEach(
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
    transform: number;
    units: string;
    enabled: boolean; 
}
