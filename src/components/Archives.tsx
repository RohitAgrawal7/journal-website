import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaBookOpen, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaSearch, FaBook } from 'react-icons/fa';

interface JournalIssue {
  id: number;
  volume: string;
  year: number;
  title: string;
  coverImageUrl: string;
  issueUrl: string;
  description: string;
  publishedDate: string;
  articlesCount: number;
  isCurrentIssue?: boolean;
  pdfUrl: string;
  keywords?: string[];
}

interface JournalArchivesProps {
  journalTitle?: string;
  journalIssn?: string;
  publisher?: string;
}

const JournalArchives: React.FC<JournalArchivesProps> = ({
  journalTitle = "Universal Journal of Green Sci-Tech and Management",
  journalIssn = "3107-9326",
  publisher = "Universal Oneness Research Association (UORA)"
}) => {
  const [activeSection, setActiveSection] = useState('all-issues');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  // local input state to keep typing smooth and debounced update to searchTerm
  const [searchInput, setSearchInput] = useState<string>('');
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [isLoading, setIsLoading] = useState<boolean>(false);

  // Enhanced sample data with more issues and details
  const issues: JournalIssue[] = useMemo(() => [
    {
      id: 1,
      volume: "Volume 1 Issue 1",
      year: 2025,
      title: "Introductory Research in Green SciTech",
      coverImageUrl: "https://image2url.com/r2/default/images/1768496133818-b56adab9-0f39-40eb-acb1-a9c0aefad7b9.png",
      issueUrl: "/issue1",
      pdfUrl: "/issue1",
      description: "Foundational papers on sustainable technology and green innovation across various domains. This inaugural issue sets the tone for groundbreaking research in environmental science and sustainable management practices.",
      publishedDate: "2025-01-15",
      articlesCount: 5,
      isCurrentIssue: false,
      keywords: ["sustainable technology", "green innovation", "environmental science"]
    },
    {
      id: 2,
      volume: "Volume 1 Issue 2",
      year: 2025,
      title: "Advances in Environmental Management",
      coverImageUrl: "https://image2url.com/r2/default/images/1768496219558-902e0e7e-2ec4-46c2-b8d1-5964ea90a868.png",
      issueUrl: "/issue2",
      pdfUrl: "/issue2",
      description: "Focus on eco-friendly management practices, sustainable business models, and environmental conservation strategies. Features case studies from leading organizations implementing green initiatives.",
      publishedDate: "2025-02-15",
      articlesCount: 5,
      keywords: ["eco-friendly", "sustainable business", "conservation"]
    },
    {
      id: 3,
      volume: "Volume 1 Issue 3",
      year: 2025,
      title: "Innovation in Green Technology",
      coverImageUrl: "https://image2url.com/r2/default/images/1768496248789-bb7e38e1-e54e-40f7-b885-61e14f1ca668.png",
      issueUrl: "/issue3",
      pdfUrl: "/issue3",
      description: "Latest innovations and case studies in renewable energy, waste management, and sustainable urban planning. Special section on emerging technologies in environmental monitoring.",
      publishedDate: "2025-03-15",
      articlesCount: 6,
      keywords: ["renewable energy", "waste management", "urban planning"]
    },
    // {
    //   id: 4,
    //   volume: "Volume 1 Issue 4",
    //   year: 2025,
    //   title: "Sustainable Development Strategies",
    //   coverImageUrl: "https://image2url.com/r2/default/images/1768496299652-040dadbb-7cc9-430a-a41c-bb539439b978.png",
    //   issueUrl: "/issue4",
    //   pdfUrl: "/issue4",
    //   description: "Comprehensive strategies for sustainable growth across industrial, agricultural, and urban sectors. Includes policy frameworks and implementation guidelines for developing economies.",
    //   publishedDate: "2025-04-15",
    //   articlesCount: 12,
    //   keywords: ["sustainable growth", "policy frameworks", "agriculture"]
    // },
    // {
    //   id: 5,
    //   volume: "Volume 1 Issue 5",
    //   year: 2026,
    //   title: "Emerging Trends in SciTech",
    //   coverImageUrl: "https://image2url.com/r2/default/images/1768247581446-de26be9e-abeb-48e5-b046-a3c8aea385f3.png",
    //   issueUrl: "/issue5",
    //   pdfUrl: "/issue5",
    //   description: "Analysis of emerging trends and future outlook in green technology and sustainable science. Features predictive modeling and scenario analysis for climate-resilient development.",
    //   publishedDate: "2025-05-15",
    //   articlesCount: 11,
    //   keywords: ["emerging trends", "predictive modeling", "climate resilience"]
    // },
    // {
    //   id: 6,
    //   volume: "Volume 1 Issue 6",
    //   year: 2026,
    //   title: "Case Studies in Green Management",
    //   coverImageUrl: "https://image2url.com/r2/default/images/1768247613930-4fe37e2b-c6f4-4ac4-9c41-c9d343d16ae3.png",
    //   issueUrl: "/issue6",
    //   pdfUrl: "/issue6",
    //   description: "Real-world case studies and applications of sustainable management principles across various industries. Special focus on measurable outcomes and ROI analysis.",
    //   publishedDate: "2025-06-15",
    //   articlesCount: 10,
    //   keywords: ["case studies", "sustainable management", "ROI analysis"]
    // },
    // {
    //   id: 7,
    //   volume: "Volume 1 Issue 7",
    //   year: 2026,
    //   title: "Special Edition on Sustainability",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_259_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/7",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/7",
    //   description: "Special focus on sustainability initiatives, circular economy models, and international collaborations. Includes expert commentaries from global environmental leaders.",
    //   publishedDate: "2025-07-15",
    //   articlesCount: 13,
    //   keywords: ["sustainability initiatives", "circular economy", "international collaborations"]
    // },
    // {
    //   id: 8,
    //   volume: "Volume 1 Issue 8",
    //   year: 2025,
    //   title: "Green Energy Transitions",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_258_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/8",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/8",
    //   description: "Exploring transitions to green energy sources, policy impacts, and technological advancements in energy storage.",
    //   publishedDate: "2025-08-20",
    //   articlesCount: 9,
    //   isCurrentIssue: true,
    //   keywords: ["green energy", "policy impacts", "energy storage"]
    // },
    // {
    //   id: 9,
    //   volume: "Volume 1 Issue 9",
    //   year: 2025,
    //   title: "Biodiversity Conservation Technologies",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_257_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/9",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/9",
    //   description: "Technologies for monitoring and conserving biodiversity, including AI applications and satellite imaging.",
    //   publishedDate: "2025-09-10",
    //   articlesCount: 11,
    //   keywords: ["biodiversity", "AI applications", "satellite imaging"]
    // },
    // {
    //   id: 10,
    //   volume: "Volume 1 Issue 10",
    //   year: 2025,
    //   title: "Sustainable Supply Chain Management",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_256_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/10",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/10",
    //   description: "Strategies for sustainable supply chains, ethical sourcing, and reducing carbon footprints in logistics.",
    //   publishedDate: "2025-10-05",
    //   articlesCount: 8,
    //   keywords: ["supply chain", "ethical sourcing", "carbon footprint"]
    // },
    // {
    //   id: 11,
    //   volume: "Volume 1 Issue 11",
    //   year: 2025,
    //   title: "Water Resource Management",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_255_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/11",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/11",
    //   description: "Innovative approaches to water conservation, purification technologies, and policy for water security.",
    //   publishedDate: "2025-11-15",
    //   articlesCount: 10,
    //   keywords: ["water conservation", "purification", "water security"]
    // },
    // {
    //   id: 12,
    //   volume: "Volume 1 Issue 12",
    //   year: 2025,
    //   title: "Year-End Review: Green Innovations 2025",
    //   coverImageUrl: "https://qtanalytics.in/journals/public/journals/5/cover_issue_254_en_US.jpg",
    //   issueUrl: "https://ujgsm.uorapublications.com/issue/view/12",
    //   pdfUrl: "https://ujgsm.uorapublications.com/issue/download/12",
    //   description: "Comprehensive review of the year's advancements in green science, technology, and management.",
    //   publishedDate: "2025-12-20",
    //   articlesCount: 14,
    //   keywords: ["year review", "green innovations", "advancements"]
    // }
  ], []);

  const [filteredIssues, setFilteredIssues] = useState<JournalIssue[]>(issues);

  const years = useMemo(() =>
    ['all', ...Array.from(new Set(issues.map(i => i.year.toString()))).sort((a, b) => Number(b) - Number(a))]
  , [issues]);

  useEffect(() => {
    setIsLoading(true);
    let filtered = [...issues];
    if (selectedYear !== 'all') {
      filtered = filtered.filter(i => i.year.toString() === selectedYear);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(i =>
        i.volume.toLowerCase().includes(term) ||
        i.title.toLowerCase().includes(term) ||
        i.description.toLowerCase().includes(term) ||
        i.keywords?.some(k => k.toLowerCase().includes(term)) ||
        i.publishedDate.toLowerCase().includes(term)
      );
    }
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedDate).getTime();
      const dateB = new Date(b.publishedDate).getTime();
      return dateB - dateA;
    });
    setTimeout(() => {
      setFilteredIssues(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
  }, [selectedYear, searchTerm, issues]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIssues = filteredIssues.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const sections = ['all-issues'];
      const headerOffset = 100;
      const scrollPosition = window.scrollY + headerOffset;
      let current = activeSection;
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      });
      if (current !== activeSection) {
        setActiveSection(current);
      }
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, debounce]);

  // const debounce = useCallback((func: Function, wait: number) => {
  //    let timeout: ReturnType<typeof setTimeout>;
  //    return (...args: any[]) => {
  //      clearTimeout(timeout);
  //      timeout = setTimeout(() => func(...args), wait);
  //    };
  //  }, []);

// debounced updater for the actual searchTerm used by the filtering effect
  const debouncedSetSearchTerm = useMemo(
    () => debounce((val: string) => setSearchTerm(val), 300),
    [debounce]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: position - headerOffset,
        behavior: 'smooth'
      });
    }
  }, []);

  

  const handlePdfDownload = useCallback((issue: JournalIssue) => {
    if (!issue.pdfUrl) {
      alert(`PDF download is not available for ${issue.volume}. Please try the View Issue option.`);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      window.open(issue.pdfUrl, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 500);
  }, []);

    const resolveImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder-cover.jpg';
    try {
      // Google Drive: /file/d/FILE_ID/view
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      // Google Drive: open?id=FILE_ID or ?id=...
      const qMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (qMatch && qMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${qMatch[1]}`;
      }
      // fallback: return provided URL
      return url;
    } catch (e) {
      return url;
    }
  };  

  const Sidebar = useMemo(() => {
    const navItems = [
      { id: 'all-issues', title: 'All Issues', icon: FaBook },
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
                <span className="font-semibold">{issues.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Year:</span>
                <span className="font-semibold">2025</span>
              </div>
              <div className="flex justify-between">
                <span>Articles:</span>
                <span className="font-semibold">{issues.reduce((sum, i) => sum + i.articlesCount, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [activeSection, scrollToSection, issues]);

  const IssueCard: React.FC<{ issue: JournalIssue }> = ({ issue }) => (
    <div
      className="mb-6 p-5 rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-300 hover:bg-green-100 "
    >
      <div className="flex flex-col md:flex-row gap-6 items-start ">
        <div className="flex-shrink-0">
          <img
            src={resolveImageUrl(issue.coverImageUrl)}
            alt={issue.volume}
            className="w-64 h-auto rounded-lg shadow-md border border-teal-200 transition-transform duration-300 hover:scale-105"
           onError={(e) => {
              // fallback to local placeholder
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
            <a
              href={issue.issueUrl}
              // target="_blank"
              rel="noopener noreferrer"
            >
             {issue.volume} - {issue.year}
            </a>
          </h3>
          {/* <div className="text-gray-600 italic mb-3">{issue.volume} - {issue.year}</div> */}
          {/* <div className="text-sm text-gray-500 mb-4 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-2"></span>
            Pages/Articles: {issue.articlesCount}
          </div> */}
          {/* <p className="text-gray-700 mb-4">{issue.description}</p>
          {issue.keywords && (
            <div className="flex flex-wrap gap-2 mb-4">
              {issue.keywords.map((kw, index) => (
                <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm transition-colors duration-300 hover:bg-green-100 hover:text-green-800">
                  {kw}
                </span>
              ))}
            </div> */}
          {/* )} */}
          <div className="flex flex-wrap gap-3">
            {/* <a
              href={issue.pdfUrl}
              className="flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 bg-gradient-to-r from-teal-500 to-green-500 shadow-sm hover:from-teal-600 hover:to-green-600 hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf className="mr-2" /> PDF
            </a> */}
            <a
              href={issue.issueUrl}
              className="flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 shadow-sm hover:from-blue-600 hover:to-teal-600 hover:shadow-md"
              // target="_blank"
              rel="noopener noreferrer"
            >
              <FaBookOpen className="mr-2" /> View Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const MainContent = useMemo(() => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 ">
          <h1 className="text-3xl font-bold">Journal Archives</h1>
          <p className="text-lg mt-2 opacity-90">{journalTitle} – Volume Overview</p>
          <p className="text-sm mt-1">ISSN (Online): {journalIssn}</p>
          <p className="text-sm opacity-80 mt-1">Publisher: <strong>{publisher}</strong></p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 ">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Filter by Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full border border-teal-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Search</label>
              <div className="relative">
               <input
                 type="text"
                 placeholder="Search by title, description, keywords..."
// -                value={searchTerm}
// -                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setSearchInput(v);
                  debouncedSetSearchTerm(v);
                }}
                onKeyDown={(e) => {
                  // prevent Enter from submitting any parent form / reloading page
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                 className="w-full border border-teal-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
               />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading issues...</p>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No issues found matching your criteria.
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-md disabled:opacity-50 transition-all duration-300 hover:bg-teal-200"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-md disabled:opacity-50 transition-all duration-300 hover:bg-teal-200"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ), [selectedYear, searchTerm, filteredIssues, paginatedIssues, isLoading, years, currentPage, totalPages, handlePageChange, handlePdfDownload]);

  const Footer = useMemo(() => (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-500 pb-2 inline-block">About UJGSM</h3>
            <p className="text-teal-100">A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-500 pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaHome className="mr-2" /> <a href="#" className="text-teal-100 hover:text-teal-300 transition-colors duration-300">Home</a>
            </p>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaBook className="mr-2" /> <a href="#" className="text-teal-100 hover:text-teal-300 transition-colors duration-300">Current Issue</a>
            </p>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaArchive className="mr-2" /> <a href="#" className="text-teal-100 hover:text-teal-300 transition-colors duration-300">Archives</a>
            </p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-500 pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-teal-100 hover:text-teal-300 transition-colors duration-300">contact@uorapublications.com</a>
            </p>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaPhone className="mr-2" /> +91-9766930707
            </p>
            <p className="flex items-center mb-2 text-teal-100 hover:text-teal-300 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India
            </p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-teal-700 text-sm opacity-80">
          <p>&copy; 2025 Universal Journal of Green Sci-Tech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  ), []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {MainContent}
          {Sidebar}
        </div>
      </main>
      {Footer}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalArchives;