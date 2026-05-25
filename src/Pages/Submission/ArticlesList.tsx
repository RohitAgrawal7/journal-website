import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaEye } from 'react-icons/fa';
import { deleteArticle, listArticles } from '../../api/articles';
import type { Article, ArticleStatus } from '../../types/article';

const ArticlesList: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params: { page: number; limit: number; search?: string; status?: ArticleStatus } = {
        page,
        limit: 10,
      };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const result = await listArticles(params);
      setArticles(result.articles);
      setTotalPages(result.totalPages);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to load articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    if (isAuthenticated) fetchArticles();
  }, [isAuthenticated, fetchArticles]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (loginUser.trim() === 'pawswauora' && loginPass.trim() === 'UoraPublication@1') {
      setIsAuthenticated(true);
      toast.success('Access granted');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this article?')) return;
    setDeletingId(id);
    try {
      await deleteArticle(id);
      toast.success('Article deleted');
      fetchArticles();
    } catch {
      toast.error('Failed to delete article');
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold text-teal-800 mb-4">Articles List</h1>
          {authError && <p className="text-red-600 text-sm mb-3">{authError}</p>}
          <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="Username" className="w-full border rounded-md px-3 py-2 mb-3" />
          <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Password" className="w-full border rounded-md px-3 py-2 mb-4" />
          <button type="submit" className="w-full bg-teal-700 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <ToastContainer position="top-right" />
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-teal-800">Articles</h1>
          <Link to="/articles-form" className="flex items-center gap-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800">
            <FaPlus /> New Article
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[200px]"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as ArticleStatus | 'all'); setPage(1); }}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-teal-700 text-2xl" /></div>
        ) : articles.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No articles found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Slug</th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-teal-800">{a.title}</td>
                    <td className="p-3 capitalize">{a.status}</td>
                    <td className="p-3 text-gray-500">{a.slug}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        {a.status === 'published' && (
                          <Link to={`/article/${a.slug}`} className="p-2 text-teal-600 hover:bg-teal-50 rounded" title="View">
                            <FaEye />
                          </Link>
                        )}
                        <Link to={`/articles-form?id=${a.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                          <FaEdit />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(a.id)}
                          disabled={deletingId === a.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === a.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Prev</button>
            <span className="px-3 py-1">Page {page} / {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
