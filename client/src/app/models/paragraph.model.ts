import { ILabelFixation, ILabelLayout, Label } from "./label.model";
import { ILayout, Layout } from "./layout.model";

/**
 * Base paragraph interface
 */
interface IParagraph {
    id: number;
}

/**
 * Text-and-layout paragraph interface.
 */
export interface IParagraphLayout extends IParagraph {
    isTitle: boolean;
    labels: ILabelLayout[];
    layout: ILayout;
    hasLabels: boolean;
}

/**
 * Paragraph-feature paragraph interface.
 */
export interface IParagraphFeatures extends IParagraph {
    features: Object;
    hasFeatures: boolean;
    getFeatureById(id: string): any;
}

/**
 * Paragraph-relevance paragraph interface.
 */
export interface IParagraphRelevance extends IParagraph {
    systemRelevance: boolean;
    perceivedRelevance: boolean;
    predictedRelevance: [number, boolean];
}

/**
 * Fixation-time-per-token paragraph interface.
 */
export interface IParagraphFixation extends IParagraph {
    labels: ILabelFixation[];
}


/**
 * Paragraph representation.
 */
export class Paragraph implements IParagraphLayout, IParagraphFeatures, 
                        IParagraphRelevance, IParagraphFixation {
    public id: number;
    public layout: ILayout;
    public systemRelevance: boolean = false;
    public perceivedRelevance: boolean = false;
    public predictedRelevance: [number, boolean] = [-1, false];
    public labels: Label[] = [];
    public features: Object = {};

    /**
     * 
     * @param parLayout text and layout
     * @param parFeatures paragraph features
     * @param parRelevance paragraph relevance
     * @param parFixation fixation times
     */
    constructor (parLayout: IParagraphLayout, parFeatures: IParagraphFeatures | undefined, 
                    parRelevance: IParagraphRelevance | undefined, parFixation: IParagraphFixation | undefined) {
        this.id = parLayout.id;
        this.layout = new Layout(parLayout.layout);   
        if (parFeatures != undefined) {
            this.features = parFeatures.features; 
        }
        if (parRelevance != undefined) {
            this.systemRelevance = parRelevance.systemRelevance;
            this.perceivedRelevance = parRelevance.perceivedRelevance;
            this.predictedRelevance = parRelevance.predictedRelevance;
        }      
        if (parFixation != undefined) {
            this.labels = parLayout.labels.map((label_layout: any) => {
                let label_id = label_layout.id;
                let label_fixation = parFixation.labels.find((label:any) => label.id === label_id);
                return new Label(label_layout, label_fixation);
            });
        }          
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

    getFeatureById(id: string) {
        let value = -1;
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
 export interface ParagraphFeatureConf {
    id: string;     
    name: string;
    transform: number;
    units: string;
    enabled: boolean; 
}
