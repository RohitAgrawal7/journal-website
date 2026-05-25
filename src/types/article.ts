export type ArticleStatus = 'draft' | 'published';

export interface ArticleAuthor {
  name: string;
  affiliation?: string;
  orcid?: string;
}

/** Body for POST /articles and PATCH /articles/:id (matches backend schema) */
export interface ArticleApiPayload {
  title: string;
  abstract: string;
  doi?: string;
  volume?: string;
  issue?: string;
  publicationDate?: string;
  keywords: string[];
  authors: ArticleAuthor[];
  references: string[];
  pdfUrl?: string;
  coverImageUrl?: string;
  licenseText?: string;
  licenseImageUrl?: string;
  status: ArticleStatus;
}

export interface ArticleContentFields extends ArticleApiPayload {}

export interface Article extends ArticleContentFields {
  id: number;
  /** From API or derived from pdfUrl for /article/:slug routing */
  slug: string;
  issueUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Admin form state (API fields + routing helpers) */
export interface ArticleFormState extends ArticleApiPayload {
  slug: string;
  issueUrl?: string;
}

export interface ArticlesListParams {
  page?: number;
  limit?: number;
  status?: ArticleStatus;
  search?: string;
}

export interface ArticlesListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const JOURNAL_NAME = 'Universal Journal of Green Sci-Tech & Management';
export const JOURNAL_SHORT = 'UJGSM';

export const DEFAULT_LICENSE_TEXT =
  'This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.';

export const DEFAULT_LICENSE_IMAGE_URL =
  'https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png';

export const CITATION_FORMAT_KEYS = ['APA', 'MLA', 'Chicago', 'IEEE', 'Harvard', 'Vancouver'] as const;
