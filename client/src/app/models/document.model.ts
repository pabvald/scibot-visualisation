import { IParagraph } from "./paragraph.model";

export interface IDocument {
    user_id: string;
    id: string;
    corpus: string;
    query: string;
    paragraphs: IParagraph[];
}
