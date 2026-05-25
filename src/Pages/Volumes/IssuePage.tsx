import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaBook, FaBookOpen, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt,
} from 'react-icons/fa';
import { listArticles } from '../../api/articles';
import { getIssueCatalog, mergeIssueArticles } from '../../data/issueArticles';
import type { Article } from '../../types/article';
import IssueArticleItem from '../../components/IssueArticleItem';

interface IssuePageProps {
  issueKey: string;
}

const IssuePage: React.FC<IssuePageProps> = ({ issueKey }) => {
  const catalogIssue = getIssueCatalog(issueKey);
  const [apiArticles, setApiArticles] = useState<Article[]>([]);
  const [activeSection, setActiveSection] = useState('cover');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const issue = useMemo(
    () => (catalogIssue ? mergeIssueArticles(catalogIssue, apiArticles) : undefined),
    [catalogIssue, apiArticles]
  );

  useEffect(() => {
    let isMounted = true;

    listArticles({ status: 'published', limit: 1000 })
      .then((response) => {
        if (isMounted) setApiArticles(response.articles);
      })
      .catch(() => {
        if (isMounted) setApiArticles([]);
      });

    return () => {
      isMounted = false;
    };
  }, [issueKey]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref && observer.current) observer.current.observe(ref);
    });
    return () => observer.current?.disconnect();
  }, [issue]);

  if (!issue) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <p className="text-lg text-gray-700 mb-4">Issue not found.</p>
        <Link to="/archives" className="text-teal-700 hover:underline">Back to Archives</Link>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'cover', title: 'Issue Cover', icon: FaBook },
    { id: 'articles', title: 'Articles', icon: FaBookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
                <h1 className="text-3xl font-bold">Table of Contents</h1>
                <p className="text-lg mt-2 opacity-90">{issue.headerSubtitle}</p>
                <p className="text-sm mt-1">ISSN (Online): 3107-9326</p>
                <p className="text-sm opacity-80 mt-1">
                  Publisher: <strong>Universal Oneness Research Association (UORA)</strong>
                </p>
              </div>
              <div className="p-6 space-y-6">
                <section
                  id="cover"
                  ref={(el) => { sectionRefs.current.cover = el; }}
                  className="p-6 rounded-lg mb-6 bg-white"
                >
                  <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                    <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                      <FaBook className="text-lg" />
                    </div>
                    Issue Cover
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <img
                        src={issue.coverImage}
                        alt={`Journal Cover ${issue.volumeLabel}`}
                        className="w-64 h-auto rounded-lg shadow-md border border-teal-200"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center text-teal-700 mb-4">
                        <FaCalendarAlt className="mr-2 text-teal-600" />
                        <span className="font-medium">Published: {issue.publishedDate}</span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        This issue features peer-reviewed research across Engineering, Applied Science, and Management.
                        Click an article title for the full record; use PDF to download the file.
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  id="articles"
                  ref={(el) => { sectionRefs.current.articles = el; }}
                  className="p-6 rounded-lg mb-6 bg-white"
                >
                  <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                    <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                      <FaBookOpen className="text-lg" />
                    </div>
                    Articles
                  </h2>
                  <div className="space-y-6">
                    {issue.articles.map((article) => (
                      <IssueArticleItem
                        key={`${article.pdfUrl}-${article.id}`}
                        article={article}
                        hoveredId={hoveredItem}
                        onHover={setHoveredItem}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-teal-800 to-teal-900 p-6 rounded-lg shadow-lg sticky top-6 border border-teal-700">
              <h2 className="text-teal-300 font-semibold mb-4 flex items-center">
                <FaCompass className="mr-2 text-teal-200" /> Quick Navigation
              </h2>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`w-full text-left py-3 px-4 rounded-md flex items-center transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md'
                          : 'text-teal-100 hover:bg-teal-700/50'
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <item.icon className="mr-3" />
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-10 mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">About UJGSM</h3>
              <p>A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
            </div>
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Quick Links</h3>
              <p className="flex items-center mb-2"><FaHome className="mr-2" /><Link to="/" className="text-white hover:text-green-300">Home</Link></p>
              <p className="flex items-center mb-2"><FaBook className="mr-2" /><Link to="/current" className="text-white hover:text-green-300">Current Issue</Link></p>
              <p className="flex items-center mb-2"><FaArchive className="mr-2" /><Link to="/archives" className="text-white hover:text-green-300">Archives</Link></p>
            </div>
            <div>
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Contact Us</h3>
              <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /><a href="mailto:contact@uorapublications.com" className="text-white hover:text-green-300">contact@uorapublications.com</a></p>
              <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9766930707</p>
              <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
            </div>
          </div>
          <div className="text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
            <p>&copy; 2025 Universal Journal of Green Sci-Tech & Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/** Resolves `/archives/:issueId` — issueId must be `issue1`, `issue2`, etc. */
export const IssuePageRoute: React.FC = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const issueKey = issueId && getIssueCatalog(issueId) ? issueId : 'issue1';
  return <IssuePage issueKey={issueKey} />;
};

export default IssuePage;
