import { Paragraph } from "./paragraph";


export enum Corpus {
    grel = "g-REL",
    nq = "Google_NQ"
}


export interface Article {
    name: string,
    corpus: Corpus,
    paragraphs: Paragraph[]
}


/**
 * Represents an article option.
 * @interface ArticleOption
 */
export interface ArticleOption {
    name: string
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
            {name: "g-rel_q075-1_i"},
            {name: "g-rel_q076-1_r"},
            {name: "g-rel_q128-1_r"},
            {name: "g-rel_q085-2_i"},
            {name: "g-rel_q094-2_t"},
            {name: "g-rel_q097-2_t"},
            {name: "g-rel_q103-1_i"},
            {name: "g-rel_q116-1_r"},
            {name: "g-rel_q118-1_r"},
            {name: "g-rel_q122-2_i"},
            {name: "g-rel_q134-3_t"},
            {name: "g-rel_q088-1_t"},
            {name: "g-rel_q088-1_t"}
        ]
    },
    {
        name: "Google_NQ",
        articles: [
            {name: "nq_5p_a0_LTcw"},
            {name: "nq_5p_a0_LTIz"},
            {name: "nq_5p_a2_MTgz"},
            {name: "nq_5p_a3_LTYx"},
            {name: "nq_5p_a4_LTI3"},
            {name: "nq_6p_a1_LTEy"},
            {name: "nq_6p_a3_MzA5"},
            {name: "nq_6p_a4_ODQz"},
            {name: "nq_6p_a5_LTkw"},
            {name: "nq_7p_a1_Mzgy"},
            {name: "nq_7p_a2_LTYz"},
            {name: "nq_7p_a5_NTE0"},
            {name: "nq_7p_a5_NTE0"}
        ]
    }  
]
