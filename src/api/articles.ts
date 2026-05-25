import axios from 'axios';
import type { Article, ArticleApiPayload, ArticlesListParams, ArticlesListResponse } from '../types/article';
import { API_URL, normalizeArticle, resolveArticleSlug } from '../utils/articleHelpers';

const DEV_ARTICLES_STORAGE_KEY = 'ujgsm.dev.articles';

function extractArticle(data: unknown): Article {
  const body = data as Record<string, unknown>;
  const raw = (body.article ?? body.data ?? body) as Record<string, unknown>;
  return normalizeArticle(raw);
}

function extractList(data: unknown): ArticlesListResponse {
  const body = data as Record<string, unknown>;
  let items: unknown[] = [];
  let total = 0;
  let page = 1;
  let limit = 10;

  if (Array.isArray(body)) {
    items = body;
    total = body.length;
  } else if (Array.isArray(body.articles)) {
    items = body.articles;
    total = Number(body.total ?? body.articles.length);
    page = Number(body.page ?? 1);
    limit = Number(body.limit ?? 10);
  } else if (Array.isArray(body.data)) {
    items = body.data;
    total = Number(body.total ?? body.count ?? body.data.length);
    page = Number(body.page ?? 1);
    limit = Number(body.limit ?? 10);
  }

  const articles = items.map((item) => normalizeArticle(item as Record<string, unknown>));
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { articles, total, page, limit, totalPages };
}

function shouldUseDevFallback(err: unknown): boolean {
  if (!import.meta.env.DEV) return false;
  if (!axios.isAxiosError(err)) return false;

  const message = (err.response?.data as { message?: string } | undefined)?.message || '';
  return !err.response || err.response.status === 404 || message.toLowerCase().includes('application not found');
}

function readDevArticles(): Article[] {
  if (!import.meta.env.DEV) return [];
  try {
    const raw = window.localStorage.getItem(DEV_ARTICLES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.map((item) => normalizeArticle(item as Record<string, unknown>))
      : [];
  } catch {
    return [];
  }
}

function writeDevArticles(articles: Article[]) {
  window.localStorage.setItem(DEV_ARTICLES_STORAGE_KEY, JSON.stringify(articles));
}

function filterDevArticles(articles: Article[], params: ArticlesListParams): Article[] {
  const search = params.search?.trim().toLowerCase();
  return articles.filter((article) => {
    if (params.status && article.status !== params.status) return false;
    if (!search) return true;
    return [
      article.title,
      article.abstract,
      article.volume,
      article.issue,
      article.authors.map((author) => author.name).join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(search);
  });
}

function listDevArticles(params: ArticlesListParams = {}): ArticlesListResponse {
  const page = Number(params.page || 1);
  const limit = Number(params.limit || 10);
  const filtered = filterDevArticles(readDevArticles(), params);
  const start = (page - 1) * limit;
  const articles = filtered.slice(start, start + limit);
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  return { articles, total: filtered.length, page, limit, totalPages };
}

function saveDevArticle(payload: ArticleApiPayload, id?: number): Article {
  const articles = readDevArticles();
  const now = new Date().toISOString();
  const existingIndex = id ? articles.findIndex((article) => article.id === id) : -1;
  const existing = existingIndex >= 0 ? articles[existingIndex] : undefined;
  const article = normalizeArticle({
    ...existing,
    ...payload,
    id: existing?.id || Date.now(),
    slug: existing?.slug || resolveArticleSlug({ title: payload.title, pdfUrl: payload.pdfUrl, slug: '' }),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  });

  if (existingIndex >= 0) {
    articles[existingIndex] = article;
  } else {
    articles.unshift(article);
  }

  writeDevArticles(articles);
  return article;
}

export async function listArticles(params: ArticlesListParams = {}): Promise<ArticlesListResponse> {
  try {
    const response = await axios.get(`${API_URL}/articles`, { params });
    return extractList(response.data);
  } catch (err) {
    if (shouldUseDevFallback(err)) return listDevArticles(params);
    throw err;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const response = await axios.get(`${API_URL}/articles/slug/${encodeURIComponent(slug)}`);
    return extractArticle(response.data);
  } catch (err) {
    if (shouldUseDevFallback(err)) {
      const article = readDevArticles().find((item) => resolveArticleSlug(item) === slug);
      if (article) return article;
    }
    throw err;
  }
}

export async function getArticleById(id: number): Promise<Article> {
  try {
    const response = await axios.get(`${API_URL}/articles/${id}`);
    return extractArticle(response.data);
  } catch (err) {
    if (shouldUseDevFallback(err)) {
      const article = readDevArticles().find((item) => item.id === id);
      if (article) return article;
    }
    throw err;
  }
}

export async function createArticle(payload: ArticleApiPayload): Promise<Article> {
  try {
    const response = await axios.post(`${API_URL}/articles`, payload);
    return extractArticle(response.data);
  } catch (err) {
    if (shouldUseDevFallback(err)) return saveDevArticle(payload);
    throw err;
  }
}

export async function updateArticle(id: number, payload: Partial<ArticleApiPayload>): Promise<Article> {
  try {
    const response = await axios.patch(`${API_URL}/articles/${id}`, payload);
    return extractArticle(response.data);
  } catch (err) {
    if (shouldUseDevFallback(err)) {
      const existing = readDevArticles().find((article) => article.id === id);
      if (existing) return saveDevArticle({ ...existing, ...payload }, id);
    }
    throw err;
  }
}

export async function deleteArticle(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/articles/${id}`);
  } catch (err) {
    if (shouldUseDevFallback(err)) {
      writeDevArticles(readDevArticles().filter((article) => article.id !== id));
      return;
    }
    throw err;
  }
}
