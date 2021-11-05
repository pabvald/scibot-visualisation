import { IParagraphFeatures, IParagraphFixation, IParagraphLayout, IParagraphRelevance, Paragraph } from "./paragraph.model";

/**
 * Base document interface.
 */
interface IDocument {
    userId: string;
    id: string;
    query: string;
}

/**
 * Text-and-layout document interface
 */
export interface IDocumentLayout extends IDocument {
    paragraphs: IParagraphLayout[];
}

/**
 * Paragraph-feature document interface
 */
export interface IDocumentFeatures extends IDocument {
    paragraphs: IParagraphFeatures[];
}

/**
 * Paragraph-relevance document interface
 */
export interface IDocumentRelevance extends IDocument {
    paragraphs: IParagraphRelevance[];
}

/**
 * Fixation-time-per-token document interface
 */
export interface IDocumentFixation extends IDocument {
    paragraphs: IParagraphFixation[];
}

/**
 * Document representation.
 */
export class Document implements IDocumentLayout, IDocumentFeatures,
                                    IDocumentRelevance, IDocumentFixation {
    userId: string;
    id: string;
    query: string;
    paragraphs: Paragraph[];
    
    /**
     * 
     * @param docLayout text and layout
     * @param docFeatures paragraph features
     * @param docRelevance paragraph relevance
     * @param docFixation fixation times
     */
    constructor (docLayout: IDocumentLayout, docFeatures: IDocumentFeatures, 
            docRelevance: IDocumentRelevance, docFixation: IDocumentFixation) {
        this.userId = docLayout.userId;
        this.id = docLayout.id;
        this.query = docLayout.query;
        this.paragraphs = docLayout.paragraphs.map((par_layout: any) => {
            let par_id = par_layout.id;
            let par_features = docFeatures.paragraphs.find((par: any) => par.id === par_id);
            let par_relevance = docRelevance.paragraphs.find((par:any) => par.id === par_id);
            let par_fixation = docFixation.paragraphs.find((par:any) => par.id === par_id);

            return new Paragraph(par_layout, par_features, par_relevance, par_fixation);
        });
    }
}