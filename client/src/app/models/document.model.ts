import { IParagraph } from "./paragraph.model";

export interface IDocument {
    id: string;
    corpus: string;
    paragraphs: IParagraph[];
}
