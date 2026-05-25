import type { Article, ArticleAuthor, ArticleApiPayload, ArticleFormState } from '../types/article';
import {
  CITATION_FORMAT_KEYS,
  DEFAULT_LICENSE_IMAGE_URL,
  DEFAULT_LICENSE_TEXT,
  JOURNAL_NAME,
} from '../types/article';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://journal-backend-production-a363.up.railway.app');

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizePdfUrl(pdfUrl: string): string {
  const trimmed = pdfUrl.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.toLowerCase().endsWith('.pdf') ? withLeading : `${withLeading}.pdf`;
}

export function slugFromPdfUrl(pdfUrl: string): string {
  const normalized = normalizePdfUrl(pdfUrl);
  if (!normalized) return '';
  if (/^https?:\/\//i.test(normalized)) {
    try {
      const parts = new URL(normalized).pathname.split('/').filter(Boolean);
      const base = parts.join('-').replace(/\.pdf$/i, '');
      return base || slugify(normalized);
    } catch {
      return slugify(normalized);
    }
  }
  return normalized.replace(/^\//, '').replace(/\.pdf$/i, '').replace(/\//g, '-');
}

/** Slug used in /article/:slug (API value or derived from pdf/title) */
export function resolveArticleSlug(article: Pick<Article, 'slug' | 'pdfUrl' | 'title'>): string {
  if (article.slug?.trim()) return article.slug.trim();
  if (article.pdfUrl?.trim()) return slugFromPdfUrl(article.pdfUrl);
  return slugify(article.title || 'article');
}

/** POST/PATCH body — exact backend schema (no slug) */
export function formToApiPayload(form: ArticleFormState): ArticleApiPayload {
  return {
    title: form.title.trim(),
    abstract: form.abstract.trim(),
    doi: form.doi?.trim() || undefined,
    volume: form.volume?.trim() || undefined,
    issue: form.issue?.trim() || undefined,
    publicationDate: form.publicationDate?.trim() || undefined,
    keywords: form.keywords,
    authors: form.authors,
    references: form.references,
    pdfUrl: form.pdfUrl?.trim() || undefined,
    coverImageUrl: form.coverImageUrl?.trim() || undefined,
    licenseText: form.licenseText?.trim() || undefined,
    licenseImageUrl: form.licenseImageUrl?.trim() || undefined,
    status: form.status,
  };
}

export function articleDetailPath(pdfUrlOrSlug: string): string {
  const slug = pdfUrlOrSlug.includes('/') ? slugFromPdfUrl(pdfUrlOrSlug) : pdfUrlOrSlug;
  return `/article/${slug}`;
}

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

function normalizeAuthors(value: unknown): ArticleAuthor[] {
  const parsed = parseJsonField<ArticleAuthor[]>(value, []);
  if (Array.isArray(parsed)) {
    return parsed.map((a) => ({
      name: a.name || '',
      affiliation: a.affiliation || '',
      orcid: a.orcid || '',
    }));
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((name) => ({ name: name.trim() }));
  }
  return [];
}

function normalizeStringArray(value: unknown): string[] {
  const parsed = parseJsonField<string[]>(value, []);
  if (Array.isArray(parsed)) {
    return parsed.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function normalizeDoi(doi?: string): string {
  if (!doi?.trim()) return '';
  const d = doi.trim();
  if (d.startsWith('http')) return d;
  return `https://doi.org/${d.replace(/^doi:\s*/i, '')}`;
}

function formatAuthorListApa(authors: ArticleAuthor[]): string {
  if (!authors.length) return '';
  if (authors.length === 1) return authors[0].name;
  const last = authors[authors.length - 1].name;
  const rest = authors.slice(0, -1).map((a) => a.name).join(', ');
  return `${rest}, & ${last}`;
}

/** Generate citation strings from article metadata and DOI */
export function generateCitationsFromArticle(article: Article): Record<string, string> {
  const year = article.publicationDate?.slice(0, 4) || 'n.d.';
  const authorsApa = formatAuthorListApa(article.authors);
  const doi = normalizeDoi(article.doi);
  const volIssue = [article.volume, article.issue].filter(Boolean).join(', ');
  const journal = JOURNAL_NAME;

  const apa = `${authorsApa} (${year}). ${article.title}. ${journal}${volIssue ? `, ${volIssue}` : ''}.${doi ? ` ${doi}` : ''}`;

  const mla = `${authorsApa}. "${article.title}." ${journal}${volIssue ? `, ${volIssue}` : ''}, ${year}.${doi ? ` ${doi}.` : ''}`;

  const chicago = `${authorsApa}. ${year}. "${article.title}." ${journal}${volIssue ? ` ${volIssue}` : ''}.${doi ? ` ${doi}.` : ''}`;

  const ieee = `${article.authors[0]?.name || 'Author'} et al., "${article.title}," ${journal}${article.volume ? `, vol. ${article.volume}` : ''}${year ? `, ${year}` : ''}.${doi ? ` doi: ${doi.replace('https://doi.org/', '')}` : ''}`;

  const harvard = `${authorsApa} (${year}) '${article.title}', ${journal}${volIssue ? `, ${volIssue}` : ''}.${doi ? ` Available at: ${doi}` : ''}`;

  const vancouver = `${article.authors.map((a) => a.name).join(', ')}. ${article.title}. ${journal}. ${year}.${doi ? ` ${doi}` : ''}`;

  return { APA: apa, MLA: mla, Chicago: chicago, IEEE: ieee, Harvard: harvard, Vancouver: vancouver };
}

export function getCitationFormats(article: Article): Record<string, string> {
  const generated = generateCitationsFromArticle(article);
  const out: Record<string, string> = {};
  for (const key of CITATION_FORMAT_KEYS) {
    if (generated[key]) out[key] = generated[key];
  }
  return out;
}

export function normalizeArticle(raw: Record<string, unknown>): Article {
  const publicationDate = raw.publicationDate || raw.publishedDate;
  const volume = raw.volume ?? raw.volumeLabel;
  const issue = raw.issue ?? raw.section ?? 'Articles';
  const pdfUrl = raw.pdfUrl ? String(raw.pdfUrl) : undefined;
  const title = String(raw.title || '');

  const partial = {
    slug: String(raw.slug || ''),
    pdfUrl,
    title,
  };

  return {
    id: Number(raw.id) || 0,
    slug: resolveArticleSlug(partial),
    title,
    status: (raw.status === 'draft' ? 'draft' : 'published') as Article['status'],
    abstract: String(raw.abstract || ''),
    authors: normalizeAuthors(raw.authors),
    keywords: normalizeStringArray(raw.keywords),
    references: normalizeStringArray(raw.references),
    doi: raw.doi ? String(raw.doi) : undefined,
    publicationDate: publicationDate ? String(publicationDate) : undefined,
    volume: volume ? String(volume) : undefined,
    issue: issue ? String(issue) : undefined,
    pdfUrl,
    coverImageUrl: raw.coverImageUrl ? String(raw.coverImageUrl) : undefined,
    licenseText: raw.licenseText ? String(raw.licenseText) : undefined,
    licenseImageUrl: raw.licenseImageUrl ? String(raw.licenseImageUrl) : undefined,
    issueUrl: raw.issueUrl ? String(raw.issueUrl) : undefined,
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
  };
}

export function articleToFormState(article: Article): ArticleFormState {
  return {
    title: article.title,
    slug: resolveArticleSlug(article),
    status: article.status,
    abstract: article.abstract,
    authors: article.authors.length ? article.authors : [{ name: '', affiliation: '', orcid: '' }],
    keywords: article.keywords,
    references: article.references,
    doi: article.doi || '',
    publicationDate: article.publicationDate || '',
    volume: article.volume || '',
    issue: article.issue || 'Articles',
    pdfUrl: article.pdfUrl || '',
    coverImageUrl: article.coverImageUrl || '',
    licenseText: article.licenseText || DEFAULT_LICENSE_TEXT,
    licenseImageUrl: article.licenseImageUrl || DEFAULT_LICENSE_IMAGE_URL,
    issueUrl: article.issueUrl || '',
  };
}

export function splitAbstractParagraphs(abstract: string): string[] {
  return abstract
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export const emptyFormState = (): ArticleFormState => ({
  title: '',
  slug: '',
  status: 'draft',
  abstract: '',
  authors: [{ name: '', affiliation: '', orcid: '' }],
  keywords: [],
  references: [],
  doi: '',
  publicationDate: '',
  volume: '',
  issue: 'Articles',
  pdfUrl: '',
  coverImageUrl: '',
  licenseText: DEFAULT_LICENSE_TEXT,
  licenseImageUrl: DEFAULT_LICENSE_IMAGE_URL,
  issueUrl: '',
});
