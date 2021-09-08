import { IParagraph, Paragraph } from "./paragraph.model";

export interface IDocument {
    userId: string;
    id: string;
    corpus: string;
    query: string;
    paragraphs: IParagraph[];
}

export class Document implements IDocument {
    userId: string;
    id: string;
    corpus: string;
    query: string;
    paragraphs: IParagraph[];

    constructor(documentObject: any) {
        this.userId = documentObject.userId;
        this.id = documentObject.id;
        this.corpus = documentObject.corpus;
        this.query = documentObject.query;
        this.paragraphs = documentObject.paragraphs.map((p: any) => new Paragraph(p));
    }
}