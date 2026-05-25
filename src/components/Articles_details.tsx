import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaBook, FaShieldAlt, FaHome, FaArchive,
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload, FaFilePdf,
  FaUser, FaTag, FaAlignLeft, FaCalendarAlt, FaListOl,
  FaExternalLinkAlt, FaQuoteRight, FaLink, FaSpinner,
} from 'react-icons/fa';
import { getArticleBySlug, listArticles } from '../api/articles';
import { catalogEntryToArticle, findArticleBySlug, issueKeyFromArticle } from '../data/issueArticles';
import type { Article } from '../types/article';
import { CITATION_FORMAT_KEYS, JOURNAL_NAME, JOURNAL_SHORT } from '../types/article';
import {
  getCitationFormats,
  normalizeDoi,
  resolveArticleSlug,
  slugFromPdfUrl,
  splitAbstractParagraphs,
} from '../utils/articleHelpers';

const Section: React.FC<{
  id?: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}> = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="p-5 rounded-lg mb-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <h2 className="text-base font-bold text-teal-800 mb-4 flex items-center border-b border-teal-50 pb-3">
      <span className="bg-teal-700 text-white rounded-md p-2 mr-3 flex items-center justify-center shrink-0">
        <Icon className="text-sm" />
      </span>
      {title}
    </h2>
    {children}
  </section>
);

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCatalog, setFromCatalog] = useState(false);
  const [citationFormat, setCitationFormat] = useState<string>('APA');
  const [showCitationDropdown, setShowCitationDropdown] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError('Article not found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setFromCatalog(false);

    const loadArticle = async () => {
      try {
        const data = await getArticleBySlug(slug);
        if (data.status !== 'published') {
          setError('This article is not published yet.');
          setArticle(null);
        } else {
          setArticle(data);
        }
        return;
      } catch {
        try {
          const response = await listArticles({ status: 'published', limit: 1000 });
          const data = response.articles.find((item) => (
            resolveArticleSlug(item) === slug ||
            (item.pdfUrl ? slugFromPdfUrl(item.pdfUrl) === slug : false)
          ));
          if (data) {
            setArticle(data);
            return;
          }
        } catch {
          // Fall through to the static catalog fallback.
        }

        const catalogRow = findArticleBySlug(slug);
        if (catalogRow) {
          setArticle(catalogEntryToArticle(catalogRow));
          setFromCatalog(true);
        } else {
          setError('Article not found');
          setArticle(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-teal-700 text-3xl" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <p className="text-lg text-gray-700 mb-4">{error || 'Article not found'}</p>
        <Link to="/archives" className="text-teal-700 hover:underline flex items-center gap-1">
          <FaArchive /> Back to Archives
        </Link>
      </div>
    );
  }

  const citationFormats = getCitationFormats(article);
  const citationKeys = CITATION_FORMAT_KEYS.filter((k) => citationFormats[k]);
  const abstractParagraphs = splitAbstractParagraphs(article.abstract);
  const doiUrl = normalizeDoi(article.doi);
  const derivedIssueKey = issueKeyFromArticle(article);
  const issueLink = article.issueUrl || (derivedIssueKey ? `/${derivedIssueKey}` : '/archives');
  const breadcrumbLabel = article.volume || 'Archives';

  const MainEntry = () => (
    <div className="lg:col-span-3 space-y-0">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-teal-700 to-green-600 text-white p-6">
          <p className="text-xs uppercase tracking-widest text-green-200 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            {' / '}
            <Link to="/archives" className="hover:text-white">Archives</Link>
            {article.volume && (
              <>
                {' / '}
                <Link to={issueLink} className="hover:text-white">{breadcrumbLabel}</Link>
              </>
            )}
            {' / '}
            {article.issue || 'Articles'}
          </p>
          <h1 className="text-xl font-bold leading-snug">{article.title}</h1>
          {article.publicationDate && (
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-green-100">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-xs" /> Published: {article.publicationDate.slice(0, 10)}
              </span>
              {article.volume && (
                <span className="flex items-center gap-1">
                  <FaBook className="text-xs" /> {article.volume}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {article.authors.length > 0 && (
        <Section id="authors" title="Authors" icon={FaUser}>
          <ul className="divide-y divide-gray-100">
            {article.authors.map((a, i) => (
              <li key={i} className="py-3 first:pt-0 last:pb-0">
                <p className="font-semibold text-teal-800 text-sm">{a.name}</p>
                {a.affiliation && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{a.affiliation}</p>}
                {a.orcid && (
                  <a href={a.orcid} target="_blank" rel="noreferrer" className="text-xs text-green-600 hover:underline mt-1 flex items-center gap-1">
                    <FaLink className="text-xs" /> ORCID
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {article.doi && (
        <section className="px-5 py-3 rounded-lg mb-5 bg-white border border-gray-100 shadow-sm flex items-start gap-3 text-sm">
          <span className="font-bold text-teal-800 shrink-0">DOI:</span>
          <a href={doiUrl} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline flex items-center gap-1 break-all">
            {article.doi}
            <FaExternalLinkAlt className="text-xs shrink-0" />
          </a>
        </section>
      )}

      {article.keywords.length > 0 && (
        <Section id="keywords" title="Keywords" icon={FaTag}>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((kw, i) => (
              <span key={i} className="bg-teal-50 text-teal-800 border border-teal-200 text-sm px-3 py-1 rounded-full font-medium">
                {kw}
              </span>
            ))}
          </div>
        </Section>
      )}

      {abstractParagraphs.length > 0 && (
        <Section id="abstract" title="Abstract" icon={FaAlignLeft}>
          {abstractParagraphs.map((para, i) => (
            <p key={i} className={`text-gray-700 leading-relaxed text-sm ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
          ))}
        </Section>
      )}

      {article.references.length > 0 && (
        <Section id="references" title="References" icon={FaListOl}>
          <ol className="space-y-3">
            {article.references.map((ref, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="shrink-0 text-teal-700 font-bold w-6 text-right">{i + 1}.</span>
                <span>{ref}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}
    </div>
  );

  const EntryDetails = () => (
    <div className="lg:col-span-1 space-y-5">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <Link to={issueLink} className="block">
          {article.coverImageUrl ? (
            <img src={article.coverImageUrl} alt={`${JOURNAL_SHORT} cover`} className="w-full h-44 object-cover" />
          ) : (
            <div className="bg-gradient-to-br from-teal-700 to-green-600 h-44 flex flex-col items-center justify-center p-4 text-center">
              <FaBook className="text-white text-4xl mb-2 opacity-80" />
              <p className="text-white font-bold text-sm">{JOURNAL_SHORT}</p>
            </div>
          )}
        </Link>
      </div>

      {article.pdfUrl && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-teal-700 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center text-sm uppercase tracking-wider">
              <FaDownload className="mr-2" /> Downloads
            </h3>
          </div>
          <div className="p-4">
            <a
              href={article.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              <FaFilePdf className="text-base" /> PDF
            </a>
          </div>
        </div>
      )}

      {article.publicationDate && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-teal-700 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center text-sm uppercase tracking-wider">
              <FaCalendarAlt className="mr-2" /> Published
            </h3>
          </div>
          <div className="p-4">
            <p className="text-teal-800 font-semibold text-sm">{article.publicationDate.slice(0, 10)}</p>
          </div>
        </div>
      )}

      {(article.doi || citationKeys.length > 0) && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-teal-700 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center text-sm uppercase tracking-wider">
              <FaQuoteRight className="mr-2" /> How to Cite
            </h3>
          </div>
          <div className="p-4">
            <div className="relative mb-3">
              <button
                type="button"
                onClick={() => setShowCitationDropdown(!showCitationDropdown)}
                className="w-full flex items-center justify-between text-xs bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span>{citationFormat}</span>
                <span className="text-gray-400">{showCitationDropdown ? '▲' : '▼'}</span>
              </button>
              {showCitationDropdown && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {citationKeys.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => { setCitationFormat(fmt); setShowCitationDropdown(false); }}
                      className={`w-full text-left text-xs px-3 py-2 hover:bg-teal-50 ${citationFormat === fmt ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-700'}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-md p-3 border border-gray-100">
              {citationFormats[citationFormat]}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="bg-teal-700 px-4 py-3">
          <h3 className="text-white font-semibold flex items-center text-sm uppercase tracking-wider">
            <FaBook className="mr-2" /> Issue
          </h3>
        </div>
        <div className="p-4 space-y-2 text-sm">
          {article.volume && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Volume</p>
              <Link to={issueLink} className="text-teal-700 font-semibold hover:underline">{article.volume}</Link>
            </div>
          )}
          {article.issue && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Section</p>
              <p className="text-gray-700">{article.issue}</p>
            </div>
          )}
        </div>
      </div>

      {(article.licenseText || article.licenseImageUrl) && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-teal-700 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center text-sm uppercase tracking-wider">
              <FaShieldAlt className="mr-2" /> License
            </h3>
          </div>
          <div className="p-4 text-xs text-gray-600 leading-relaxed space-y-2">
            {article.licenseImageUrl && (
              <img src={article.licenseImageUrl} alt="License" className="mb-2" />
            )}
            {article.licenseText && (
              <p className="whitespace-pre-wrap">{article.licenseText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        {fromCatalog && (
          <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            Showing catalog metadata. Complete the form at{' '}
            <Link to="/articles-form" className="font-semibold underline">Articles Admin</Link>
            {' '}with PDF <code className="bg-amber-100 px-1 rounded">{article.pdfUrl}</code> and slug{' '}
            <code className="bg-amber-100 px-1 rounded">{article.slug}</code>.
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MainEntry />
          <EntryDetails />
        </div>
      </main>
      <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-10 mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">About {JOURNAL_SHORT}</h3>
              <p className="text-sm text-green-100">A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management.</p>
            </div>
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Quick Links</h3>
              <p className="flex items-center mb-2 text-sm"><FaHome className="mr-2" /><Link to="/" className="text-white hover:text-green-300">Home</Link></p>
              <p className="flex items-center mb-2 text-sm"><FaBook className="mr-2" /><Link to="/current" className="text-white hover:text-green-300">Current Issue</Link></p>
              <p className="flex items-center mb-2 text-sm"><FaArchive className="mr-2" /><Link to="/archives" className="text-white hover:text-green-300">Archives</Link></p>
            </div>
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Contact Us</h3>
              <p className="flex items-center mb-2 text-sm"><FaEnvelope className="mr-2" /><a href="mailto:contact@uorapublications.com" className="text-white hover:text-green-300">contact@uorapublications.com</a></p>
              <p className="flex items-center mb-2 text-sm"><FaPhone className="mr-2" />+91-9766930707</p>
              <p className="flex items-center mb-2 text-sm"><FaMapMarkerAlt className="mr-2" />Chhatrapati Sambhajinagar, Maharashtra, India</p>
            </div>
          </div>
          <div className="text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
            <p>© 2025 {JOURNAL_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;
