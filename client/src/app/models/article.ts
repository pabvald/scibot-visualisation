import { Paragraph } from "./paragraph";


export enum Corpus {
    grel = "g-REL",
    nq = "Google_NQ"
}


export interface Article {
    id: string,
    corpus: Corpus,
    paragraphs: Paragraph[]
}


/**
 * Represents an article option.
 * @interface ArticleOption
 */
export interface ArticleOption {
    id: string
}

export interface ArticleOptionGroup {
    name: string,
    articles: ArticleOption[]
}

/** List of all available stimulus */
export const articleGroups = [
    {
        name: "g-REL",
        articles: [
            {id: "g-rel_q075-1_i"},
            {id: "g-rel_q076-1_r"},
            {id: "g-rel_q128-1_r"},
            {id: "g-rel_q085-2_i"},
            {id: "g-rel_q094-2_t"},
            {id: "g-rel_q097-2_t"},
            {id: "g-rel_q103-1_i"},
            {id: "g-rel_q116-1_r"},
            {id: "g-rel_q118-1_r"},
            {id: "g-rel_q122-2_i"},
            {id: "g-rel_q134-3_t"},
            {id: "g-rel_q088-1_t"},
            {id: "g-rel_q088-1_t"}
        ]
    },
    {
        name: "Google_NQ",
        articles: [
            {id: "nq_5p_a0_LTcw"},
            {id: "nq_5p_a0_LTIz"},
            {id: "nq_5p_a2_MTgz"},
            {id: "nq_5p_a3_LTYx"},
            {id: "nq_5p_a4_LTI3"},
            {id: "nq_6p_a1_LTEy"},
            {id: "nq_6p_a3_MzA5"},
            {id: "nq_6p_a4_ODQz"},
            {id: "nq_6p_a5_LTkw"},
            {id: "nq_7p_a1_Mzgy"},
            {id: "nq_7p_a2_LTYz"},
            {id: "nq_7p_a5_NTE0"},
            {id: "nq_7p_a5_NTE0"}
        ]
    }  
]
