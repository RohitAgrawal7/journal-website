import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface CurrentJournalIssue {
  id: number;
  volume: string;
  year: number;
  title: string;
  coverImageUrl: string;
  issueUrl: string;
  description: string;
  publishedDate: string;
  articlesCount: number;
  isCurrentIssue: boolean;
  keywords: string[];
}

const CurrentIssue: React.FC = () => {
  const [activeSection, setActiveSection] = useState('current-issue');

  const currentIssue: CurrentJournalIssue = useMemo(() => ({
    id: 4,
    volume: 'Volume 1 Issue 4',
    year: 2026,
    title: 'Sustainable Development Strategies',
    coverImageUrl: 'https://image2url.com/r2/default/images/1774632236661-23c327da-f619-43b1-8480-2fbc8d05ee5e.png',
    issueUrl: '/issue4',
    description: 'Comprehensive strategies for sustainable growth across industrial, agricultural, and urban sectors.',
    publishedDate: '2026-02-28',
    articlesCount: 12,
    isCurrentIssue: true,
    keywords: ['sustainable growth', 'policy frameworks', 'agriculture'],
  }), []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: position - headerOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  const resolveImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder-cover.jpg';
    try {
      const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (driveFileMatch && driveFileMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
      }
      const driveQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (driveQueryMatch && driveQueryMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${driveQueryMatch[1]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const Sidebar = useMemo(() => {
    const navItems = [
      { id: 'current-issue', title: 'Current Issue', icon: FaBook },
    ];

    return (
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-b from-teal-800 to-teal-900 p-6 rounded-lg shadow-lg sticky top-6 border border-teal-700">
          <h2 className="text-teal-300 font-semibold mb-4 flex items-center">
            <FaCompass className="mr-2 text-teal-200" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
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
          <div className="mt-8 pt-6 border-t border-teal-700">
            <h3 className="text-teal-200 text-sm font-medium mb-3">Journal Statistics</h3>
            <div className="space-y-2 text-teal-100">
              <div className="flex justify-between">
                <span>Total Issues:</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span>Current Year:</span>
                <span className="font-semibold">{currentIssue.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Articles:</span>
                <span className="font-semibold">{currentIssue.articlesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [activeSection, currentIssue, scrollToSection]);

  const IssueCard: React.FC<{ issue: CurrentJournalIssue }> = ({ issue }) => (
    <div className="mb-6 p-5 rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-300 hover:bg-green-100">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative flex-shrink-0">
          <img
            src={resolveImageUrl(issue.coverImageUrl)}
            alt={issue.volume}
            className="w-64 h-auto rounded-lg shadow-md border border-teal-200 transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = '/images/placeholder-cover.jpg';
            }}
          />
          {issue.isCurrentIssue && (
            <span className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Current
            </span>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-teal-800 mb-2 transition-colors duration-300 hover:text-green-600">
            <Link to={issue.issueUrl}>
              {issue.volume} - {issue.year}
            </Link>
          </h3>
          <p className="text-gray-700 mb-4">{issue.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {issue.keywords.map((keyword) => (
              <span key={keyword} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm transition-colors duration-300 hover:bg-green-100 hover:text-green-800">
                {keyword}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={issue.issueUrl}
              className="flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 shadow-sm hover:from-blue-600 hover:to-teal-600 hover:shadow-md"
            >
              <FaBookOpen className="mr-2" /> View Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">About UJGSM</h3>
            <p>A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2"><FaHome className="mr-2" /> <Link to="/" className="text-white hover:text--teal-800">Home</Link></p>
            <p className="flex items-center mb-2"><FaBook className="mr-2" /> <Link to="/current" className="text-white hover:text--teal-800">Current Issue</Link></p>
            <p className="flex items-center mb-2"><FaArchive className="mr-2" /> <Link to="/archives" className="text-white hover:text--teal-800">Archives</Link></p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text--teal-800">contact@uorapublications.com</a></p>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9766930707</p>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
          <p>&copy; 2025 Universal Journal of Green Sci-Tech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
                <h1 className="text-3xl font-bold">Current Issue</h1>
                <p className="text-lg mt-2 opacity-90">Universal Journal of Green Sci-Tech and Management - Latest Issue</p>
                <p className="text-sm mt-1">ISSN (Online): 3107-9326</p>
                <p className="text-sm opacity-80 mt-1">Publisher: <strong>Universal Oneness Research Association (UORA)</strong></p>
              </div>
              <div id="current-issue" className="p-6 space-y-6">
                <IssueCard issue={currentIssue} />
              </div>
            </div>
          </div>
          {Sidebar}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurrentIssue;
