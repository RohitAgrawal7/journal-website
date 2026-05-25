import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSave, FaPlus, FaTrash, FaEye, FaList, FaSpinner } from 'react-icons/fa';
import { createArticle, getArticleById, updateArticle } from '../../api/articles';
import type { ArticleAuthor, ArticleFormState, ArticleStatus } from '../../types/article';
import { DEFAULT_LICENSE_IMAGE_URL, DEFAULT_LICENSE_TEXT, JOURNAL_SHORT } from '../../types/article';
import { findArticleByPdfUrl } from '../../data/issueArticles';
import {
  emptyFormState,
  formToApiPayload,
  resolveArticleSlug,
  slugFromPdfUrl,
  normalizePdfUrl,
  generateCitationsFromArticle,
  articleToFormState,
} from '../../utils/articleHelpers';
import type { Article } from '../../types/article';

const ArticlesForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [form, setForm] = useState<ArticleFormState>(emptyFormState());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [keywordsText, setKeywordsText] = useState('');
  const [referencesText, setReferencesText] = useState('');

  const citationPreview = useMemo(() => {
    const preview: Article = {
      id: 0,
      slug: form.slug,
      status: form.status,
      title: form.title,
      abstract: form.abstract,
      authors: form.authors.filter((a) => a.name.trim()),
      keywords: keywordsText.split(',').map((k) => k.trim()).filter(Boolean),
      references: [],
      doi: form.doi,
      publicationDate: form.publicationDate,
      volume: form.volume,
      issue: form.issue,
    };
    return generateCitationsFromArticle(preview).APA;
  }, [form, keywordsText]);

  const loadArticle = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const article = await getArticleById(Number(id));
      setForm(articleToFormState(article));
      setKeywordsText(article.keywords.join(', '));
      setReferencesText(article.references.join('\n'));
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to load article');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && editId) loadArticle(editId);
  }, [isAuthenticated, editId, loadArticle]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (loginUser.trim() === 'pawswauora' && loginPass.trim() === 'UoraPublication@1') {
      setIsAuthenticated(true);
      toast.success('Access granted');
    } else {
      setAuthError('Invalid username or password');
      toast.error('Invalid credentials');
    }
  };

  const updateAuthor = (index: number, field: keyof ArticleAuthor, value: string) => {
    setForm((prev) => {
      const authors = [...prev.authors];
      authors[index] = { ...authors[index], [field]: value };
      return { ...prev, authors };
    });
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title }));
  };

  const handlePdfUrlChange = (pdfUrl: string) => {
    const normalized = normalizePdfUrl(pdfUrl);
    const catalogRow = findArticleByPdfUrl(normalized);
    setForm((prev) => ({
      ...prev,
      pdfUrl: normalized,
      slug: slugFromPdfUrl(normalized),
      ...(catalogRow && !editId
        ? {
            title: prev.title || catalogRow.title,
            volume: prev.volume || catalogRow.issue.volumeLabel,
            issue: prev.issue || 'Articles',
            publicationDate: prev.publicationDate || catalogRow.issue.publishedDate,
            coverImageUrl: prev.coverImageUrl || catalogRow.issue.coverImage,
            issueUrl: prev.issueUrl || catalogRow.issue.issueUrl,
            authors: prev.authors[0]?.name
              ? prev.authors
              : catalogRow.authors.split(/,|&/).map((name) => ({
                  name: name.trim(),
                  affiliation: '',
                  orcid: '',
                })),
          }
        : {}),
    }));
  };

  const prefillFromCatalog = () => {
    const row = findArticleByPdfUrl(form.pdfUrl || '');
    if (!row) {
      toast.info('No matching issue article. Use e.g. /volume1-issue1/article1.pdf');
      return;
    }
    setForm((prev) => ({
      ...prev,
      title: row.title,
      slug: row.slug,
      pdfUrl: row.pdfUrl,
      volume: row.issue.volumeLabel,
      issue: 'Articles',
      publicationDate: row.issue.publishedDate,
      coverImageUrl: row.issue.coverImage,
      issueUrl: row.issue.issueUrl,
      authors: row.authors.split(/,|&/).map((name) => ({
        name: name.trim(),
        affiliation: '',
        orcid: '',
      })),
    }));
    toast.success('Prefilled from issue catalog');
  };

  const buildFormState = (): ArticleFormState => ({
    ...form,
    keywords: keywordsText.split(',').map((k) => k.trim()).filter(Boolean),
    references: referencesText.split('\n').map((r) => r.trim()).filter(Boolean),
    authors: form.authors.filter((a) => a.name.trim()),
    licenseText: form.licenseText?.trim() || DEFAULT_LICENSE_TEXT,
    licenseImageUrl: form.licenseImageUrl?.trim() || DEFAULT_LICENSE_IMAGE_URL,
    slug: slugFromPdfUrl(form.pdfUrl || '') || form.slug,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const state = buildFormState();
    const apiPayload = formToApiPayload(state);
    if (!apiPayload.title) return toast.error('Title is required');
    if (!apiPayload.abstract) return toast.error('Abstract is required');
    if (!apiPayload.authors.length) return toast.error('At least one author is required');
    if (!apiPayload.pdfUrl) return toast.error('PDF URL is required');

    setSaving(true);
    try {
      let saved;
      if (editId) {
        saved = await updateArticle(Number(editId), apiPayload);
        toast.success('Article updated');
      } else {
        saved = await createArticle(apiPayload);
        toast.success('Article created');
      }
      navigate(`/article/${resolveArticleSlug(saved)}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <ToastContainer position="top-right" />
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold text-teal-800 mb-4">Articles Admin</h1>
          {authError && <p className="text-red-600 text-sm mb-3">{authError}</p>}
          <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="Username" className="w-full border rounded-md px-3 py-2 mb-3" />
          <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Password" className="w-full border rounded-md px-3 py-2 mb-4" />
          <button type="submit" className="w-full bg-teal-700 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-teal-700 text-3xl" />
      </div>
    );
  }

  const fieldClass = 'w-full border border-gray-300 rounded-md px-3 py-2';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer position="top-right" />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold text-teal-800">{editId ? 'Edit Article' : 'Create Article'}</h1>
          <div className="flex gap-2">
            <Link to="/articles-list" className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300">
              <FaList /> All Articles
            </Link>
            {form.pdfUrl && form.status === 'published' && (
              <Link to={`/article/${resolveArticleSlug(form)}`} className="flex items-center gap-1 text-sm bg-teal-100 text-teal-800 px-3 py-2 rounded-md">
                <FaEye /> Preview
              </Link>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 border-b pb-3">
            Matches API body: title, abstract, doi, volume, issue, publicationDate, keywords, authors, references, pdfUrl, coverImageUrl, licenseText, licenseImageUrl, status.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Publishing</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ArticleStatus }))} className={fieldClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Page URL slug (auto)</label>
                <input type="text" readOnly value={form.pdfUrl ? slugFromPdfUrl(form.pdfUrl) : form.slug} className={`${fieldClass} bg-gray-50`} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Title *</h2>
            <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={fieldClass} required />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Abstract *</h2>
            <textarea value={form.abstract} onChange={(e) => setForm((p) => ({ ...p, abstract: e.target.value }))} rows={8} className={fieldClass} placeholder="Blank lines separate paragraphs" required />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">DOI</h2>
            <input type="text" value={form.doi} onChange={(e) => setForm((p) => ({ ...p, doi: e.target.value }))} className={fieldClass} placeholder="10.xxxx/xxxx or full https://doi.org/..." />
            {form.doi && (
              <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded border">
                <span className="font-semibold">Citation preview (APA):</span> {citationPreview}
              </p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Volume & Issue</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Volume</label>
                <input type="text" value={form.volume} onChange={(e) => setForm((p) => ({ ...p, volume: e.target.value }))} className={fieldClass} placeholder="Volume 1 (2025)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue / Section</label>
                <input type="text" value={form.issue} onChange={(e) => setForm((p) => ({ ...p, issue: e.target.value }))} className={fieldClass} placeholder="Issue 1 / Articles" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Publication date</h2>
            <input type="date" value={form.publicationDate?.slice(0, 10) || ''} onChange={(e) => setForm((p) => ({ ...p, publicationDate: e.target.value }))} className={fieldClass} />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Keywords</h2>
            <input type="text" value={keywordsText} onChange={(e) => setKeywordsText(e.target.value)} className={fieldClass} placeholder="Comma-separated" />
          </section>

          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-teal-800">Authors *</h2>
              <button type="button" onClick={() => setForm((p) => ({ ...p, authors: [...p.authors, { name: '', affiliation: '', orcid: '' }] }))} className="text-sm text-teal-700 flex items-center gap-1">
                <FaPlus /> Add author
              </button>
            </div>
            <div className="space-y-4">
              {form.authors.map((author, i) => (
                <div key={i} className="border border-gray-200 rounded-md p-4 relative">
                  {form.authors.length > 1 && (
                    <button type="button" onClick={() => setForm((p) => ({ ...p, authors: p.authors.filter((_, j) => j !== i) }))} className="absolute top-2 right-2 text-red-500"><FaTrash /></button>
                  )}
                  <input type="text" placeholder="Name *" value={author.name} onChange={(e) => updateAuthor(i, 'name', e.target.value)} className={`${fieldClass} mb-2`} />
                  <input type="text" placeholder="Affiliation" value={author.affiliation || ''} onChange={(e) => updateAuthor(i, 'affiliation', e.target.value)} className={`${fieldClass} mb-2`} />
                  <input type="url" placeholder="ORCID URL" value={author.orcid || ''} onChange={(e) => updateAuthor(i, 'orcid', e.target.value)} className={fieldClass} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">References</h2>
            <textarea value={referencesText} onChange={(e) => setReferencesText(e.target.value)} rows={10} className={`${fieldClass} font-mono text-sm`} placeholder="One reference per line" />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">PDF URL *</h2>
            <input type="text" value={form.pdfUrl} onChange={(e) => handlePdfUrlChange(e.target.value)} className={fieldClass} placeholder="/volume1-issue1/article1.pdf or https://..." required />
            <button type="button" onClick={prefillFromCatalog} className="mt-2 text-xs text-teal-700 hover:underline">Prefill from issue catalog</button>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">Cover image URL</h2>
            <input type="text" value={form.coverImageUrl} onChange={(e) => setForm((p) => ({ ...p, coverImageUrl: e.target.value }))} className={fieldClass} placeholder="./cover.png or https://..." />
            {form.coverImageUrl && (
              <img src={form.coverImageUrl} alt="Cover preview" className="mt-3 max-w-xs rounded border border-gray-200" />
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-teal-800 mb-3">License</h2>
            <label className="block text-sm font-medium mb-1">License text</label>
            <textarea value={form.licenseText} onChange={(e) => setForm((p) => ({ ...p, licenseText: e.target.value }))} rows={4} className={`${fieldClass} mb-4`} />
            <label className="block text-sm font-medium mb-1">License image URL</label>
            <input
              type="url"
              value={form.licenseImageUrl}
              onChange={(e) => setForm((p) => ({ ...p, licenseImageUrl: e.target.value }))}
              className={fieldClass}
              placeholder={DEFAULT_LICENSE_IMAGE_URL}
            />
            {form.licenseImageUrl && (
              <img src={form.licenseImageUrl} alt="License badge" className="mt-3 h-8" />
            )}
          </section>

          <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 disabled:opacity-60">
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {editId ? 'Update Article' : 'Create Article'}
          </button>
        </form>
      </main>
      <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-8 mt-6 text-center text-sm opacity-80">
        <p>© 2025 {JOURNAL_SHORT}. Article admin.</p>
      </footer>
    </div>
  );
};

export default ArticlesForm;
