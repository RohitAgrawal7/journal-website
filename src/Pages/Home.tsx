import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaInfoCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import TrackPaper from './Submission/TrackPaper';
import { ConferenceTicker } from '../components/ConferenceTicker';

const archives = [
  {
    title: 'Make in India',
    image: 'https://imgs.search.brave.com/5QtG9t4eQnqhm0DofIYuJxU1kfGo4XyDg49yC1DZfSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZlLzky/LzJkLzZlOTIyZGQx/M2JmMThhYzdlODIx/OTY1OGI0MDFmNjdm/LmpwZw',
    number: 'UDYAM : UDYAM-MH-04-0237577',
    link: '#make-in-india',
  },
  {
    title: 'Digital India',
    image: 'https://imgs.search.brave.com/MtbCbFG1qBJyvomIqAyE3B48yInC0fvYq30VvaX8B94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQwLzEy/L2UwLzQwMTJlMGVh/ZTdmOGI4MjMxZmVi/N2E2ZmE0MDNiMWFi/LmpwZw',
    number: 'GSTN: 27AAIFU8304M1ZO',
    link: '#digital-india',
  },
  {
    title: 'Startup India',
    image: 'http://imgs.search.brave.com/_gFVcnfwz9eYFcZz6GZb7PWXsQnrMmBNElwXJJbXklw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ5LzEvc3RhcnR1/cC1pbmRpYS1odWIt/bG9nby1wbmdfc2Vl/a2xvZ28tNDk2Njkz/LnBuZw',
    number: 'Shop Act Number: 2541500320009408',
    link: '#startup-india',
  },
];

// ── Indexing entries shown in the sidebar ──────────────────────────────────────
// Images stored in /public/indexing/ — filenames exactly as saved:
//   ae.png | CR_doi.png | CU.png | EP.png | GS.png | iA.png
const indexingLinks = [
  {
    title: 'Academia.edu',
    // href: 'https://wbsubregistration.academia.edu/InternationalJournalofExperimentalResearchandReviewIAPH',
    imgSrc: '/indexing/ae.png',
    imgAlt: 'Academia.edu',
    borderColor: '#5b9bd5',
    textColor: '#2e7bc4',
    bgText: '#e8f4ff',
    bgLogo: '#1b3a5c',
  },
  {
    title: 'DOI & CrossRef',
    // href: 'https://search.crossref.org/?q=2455-4855&from_ui=yes',
    imgSrc: '/indexing/CR_doi.png',
    imgAlt: 'DOI and CrossRef',
    borderColor: '#222222',
    textColor: '#f5a800',
    bgText: '#fff8e6',
    bgLogo: '#fff5e0',
  },
  {
    title: 'Check for Updates',
    // href: 'https://qtanalytics.in/journals/index.php/IJERR/crossmarkpolicy',
    imgSrc: '/indexing/CU.png',
    imgAlt: 'Check for Updates',
    borderColor: '#f5a800',
    textColor: '#5b9bd5',
    bgText: '#fff9e6',
    bgLogo: '#ffffff',
    outlineColor: '#5b9bd5',
  },
  {
    title: 'EuroPub',
    // href: 'https://europub.co.uk/journals/international-journal-of-experimental-research-and-review-J-29269',
    imgSrc: '/indexing/EP.png',
    imgAlt: 'EuroPub',
    borderColor: '#4caf50',
    textColor: '#4caf50',
    bgText: '#f0fff0',
    bgLogo: '#f3fff3',
  },
  {
    title: 'Google Scholar',
    // href: 'https://scholar.google.com/citations?hl=en&user=C_RSGo8AAAAJ',
    imgSrc: '/indexing/GS.png',
    imgAlt: 'Google Scholar',
    borderColor: '#e88888',
    textColor: '#f5a800',
    bgText: '#fff8e8',
    bgLogo: '#fff8f0',
    outlineColor: '#f5a800',
  },
  {
    title: 'Internet Archive',
    // href: 'https://archive.org/details/@international_journal_of_experimental_research_and_review',
    imgSrc: '/indexing/iA.png',
    imgAlt: 'Internet Archive',
    borderColor: '#222222',
    textColor: '#111111',
    bgText: '#ffffff',
    bgLogo: '#f5f5f5',
  },
  {
    title: 'INDEX COPERNICUS',
    // href: 'https://journals.indexcopernicus.com/search/journal/issue?issueId=all&journalId=122825',
    imgSrc: '',           // no image — text-only layout
    imgAlt: 'Index Copernicus',
    isIndexCopernicus: true,
    borderColor: '#c0392b',
    outlineColor: '#8b0000',
  },
];

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['welcome', 'journal-particulars', 'registration-and-compliance'];
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = () => {
    const navItems = [
      { id: 'welcome', title: 'Welcome', icon: FaBookOpen },
      { id: 'journal-particulars', title: 'Journal Particulars', icon: FaInfoCircle },
      { id: 'registration-and-compliance', title: 'Registration & Compliance', icon: FaCompass },
    ];

    return (
      <div className="lg:col-span-1">
        {/* ── Sticky wrapper: both cards scroll together and stick ── */}
        <div className="sticky top-6 flex flex-col gap-5" style={{ maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>

        {/* ── Card 1 : Quick Navigation ── */}
        <div className="bg-teal-800 p-5 rounded-xl shadow-md">
          <h2 className="text-vibrant-green mb-4 flex items-center text-base font-semibold">
            <FaCompass className="mr-2" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center ${
                    activeSection === item.id
                      ? 'bg-vibrant-green text-white'
                      : 'text-dark-brown hover:bg-gray-100'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <item.icon className="mr-2" />
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Card 2 : Indexing / Database panel ── */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4">
          {/* Section heading */}
          <div className="bg-teal-800 rounded-lg px-3 py-2 mb-4 text-center">
            <p className="text-white text-xs font-semibold tracking-wide underline underline-offset-2">
              Click to view us on the world&apos;s database
            </p>
          </div>

          {/* Buttons — full image as clickable button, "Click here to visit us" text below */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {indexingLinks.map((entry) => {

              /* Index Copernicus — text-only, no image */
              if (entry.isIndexCopernicus) {
                return (
                  <a
                    key={entry.title}
                    // href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={entry.title}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: `2.5px solid ${entry.borderColor}`,
                      outline: `2px solid ${entry.outlineColor}`,
                      outlineOffset: '0px',
                      borderRadius: '6px',
                      background: '#fff',
                      textDecoration: 'none',
                      padding: '10px 14px',
                      minHeight: '64px',
                    }}
                  >
                    <span style={{ color: '#c0392b', fontSize: '12px', display: 'block', marginBottom: '2px', fontStyle: 'italic' }}>
                      Click here for
                    </span>
                    <span style={{ color: '#111', fontSize: '16px', fontWeight: 700, letterSpacing: '0.4px', display: 'block' }}>
                      INDEX COPERNICUS
                    </span>
                  </a>
                );
              }

              /* All other entries — full-width image fills the button */
              return (
                <a
                  key={entry.title}
                  // href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={entry.title}
                  style={{
                    // display: 'block',
                    // // border: `2.5px solid ${entry.borderColor}`,
                    // ...(entry.outlineColor
                    //   ? { outline: `2px solid ${entry.outlineColor}`, outlineOffset: '0px' }
                    //   : {}),
                    // borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#fff',
                    textDecoration: 'none',
                    width: '100%',
                  }}
                >
                  {/* Full-width image — replaces the old logo box */}
                  <img
                    src={entry.imgSrc}
                    alt={entry.imgAlt}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '50px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      background: '#fff',
                      // padding: '6px',
                    }}
                  />
                  {/* Click text bar below image */}
                  {/* <div
                    style={{
                      background: entry.bgText,
                      textAlign: 'center',
                      padding: '6px 8px',
                      borderTop: `1.5px solid ${entry.borderColor}`,
                    }}
                  >
                    <span
                      style={{
                        color: entry.textColor,
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: 1.3,
                        display: 'block',
                      }}
                    >
                      Click here to visit us
                    </span>
                  </div> */}
                </a>
              );
            })}
          </div>
          {/* ── End Indexing Buttons ── */}
        </div>

        </div>{/* ── End sticky wrapper ── */}
      </div>
    );
  };

  // ── ContentSection ─────────────────────────────────────────────────────────
  const ContentSection: React.FC<{
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }> = ({ id, title, icon: Icon, children }) => (
    <section
      id={id}
      className="guideline-section p-6 rounded-lg mb-6 bg-white hover:bg-green-100 transition-all duration-300"
    >
      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
        <Icon className="mr-3 text-teal-800 bg-vibrant-green rounded-full w-10 h-10 flex items-center justify-center" />
        {title}
      </h2>
      {children}
    </section>
  );

  // ── InitiativeCard ─────────────────────────────────────────────────────────
  const InitiativeCard: React.FC<{
    title: string;
    image: string;
    number: string;
    link: string;
  }> = ({ title, image, number, link }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center space-y-3 hover:bg-light-green transition-all duration-300">
      <img src={image} alt={`${title} logo`} className="w-full h-32 object-contain rounded-md" />
      <h4 className="text-lg font-semibold text-vibrant-green text-center">{title}</h4>
      <p className="text-gray-700 text-center">
        <strong>{number}</strong>
      </p>
      <a href={link} className="text--teal-800 hover:underline font-montserrat font-medium">
        Learn More
      </a>
    </div>
  );

  // ── MainContent ────────────────────────────────────────────────────────────
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-8">
          <h1 className="text-4xl font-merriweather font-bold">Welcome to UJGSM</h1>
          <p className="text-lg mt-4 max-w-2xl">
            Universal Journal of Green Sci-Tech and Management is a bi-monthly, peer-reviewed, and
            open-access online journal dedicated to publishing original, high-quality research across
            various disciplines.
          </p>
          <Link
            to="/submit-paper"
            className="mt-6 inline-block bg-vibrant-green text-teal-800 font-semibold py-3 px-6 rounded-lg hover:bg--teal-800 hover:text-white transition-all duration-300"
          >
            Submit Your Manuscript
          </Link>

          <Link
            to="/track-paper"
            className="mt-6 inline-block bg-vibrant-green text-teal-800 font-semibold py-3 px-6 rounded-lg hover:bg--teal-800 hover:text-white transition-all duration-300"
          >
            Track Paper
          </Link>

          <Link
            to="/apply-as-reviewer"
            className="mt-6 inline-block bg-vibrant-green text-teal-800 font-semibold py-3 px-6 rounded-lg hover:bg--teal-800 hover:text-white transition-all duration-300"
          >
            Apply As Reviewer
          </Link>
        </div>

        <div className="p-6 space-y-6">
          <ContentSection id="welcome" title="About UJGSM" icon={FaBookOpen}>
            <p className="text-gray-700 leading-relaxed">
              Launched in 2025 by the Universal Oneness Research Association (UORA), the Universal
              Journal of Green Sci-Tech and Management focuses on bridging the gap between research
              and practice in science, technology, and management. Our mission is to foster
              interdisciplinary research that advances knowledge and addresses global challenges
              through innovative and sustainable solutions.
            </p>
          </ContentSection>

          <ContentSection id="journal-particulars" title="Journal Particulars" icon={FaInfoCircle}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li><strong>Journal Name:</strong> Universal Journal of Green Sci-Tech and Management</li>
              <li><strong>Frequency:</strong> Bi-monthly (6 issues per year)</li>
              <li><strong>e-ISSN:</strong> 3107-9326</li>
              <li><strong>Publisher:</strong> Universal Oneness Research Association (UORA)</li>
              <li><strong>Chief-in-Editor:</strong> Prof. Pawan Dhanraj Somavanshi</li>
              <li><strong>Managing-Editor:</strong> Dr. Swapnil Narayan Dhole</li>
              <li><strong>Starting Year:</strong> 2025</li>
              <li><strong>Subject:</strong> Science, Technology, and Management</li>
              <li><strong>Language:</strong> English</li>
              <li><strong>Publication Format:</strong> Online</li>
              <li><strong>Copyright:</strong> Authors retain copyright</li>
              <li>
                <strong>License:</strong>{' '}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  className="text--teal-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Commons Attribution 4.0 International Licence (CC BY 4.0)
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a
                  href="https://ujgsm.UORApublications.com"
                  className="text--teal-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ujgsm.UORApublications.com
                </a>
              </li>
              <li>
                <strong>Registered Address:</strong> E-1/8 Mathura Nagar, N-6, Cidco, Chhatrapati
                Sambhajinagar, Maharashtra 431003, India
              </li>
              <li>
                <strong>Contact Number:</strong>{' '}
                <a href="tel:+919766930707" className="text--teal-800 hover:underline">
                  +91 9766930707
                </a>
              </li>
              <li>
                <strong>Email ID:</strong>{' '}
                <a href="mailto:contact@uorapublications.com" className="text--teal-800 hover:underline">
                  contact@uorapublications.com
                </a>
              </li>
            </ol>
          </ContentSection>

          <ContentSection id="registration-and-compliance" title="Registration & Compliance" icon={FaCompass}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {archives.map((item) => (
                <InitiativeCard
                  key={item.title}
                  title={item.title}
                  image={item.image}
                  number={item.number}
                  link={item.link}
                />
              ))}
            </div>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // ── Footer ─────────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">About UJGSM</h3>
            <p>
              A peer-reviewed, open-access journal publishing quality research across Engineering,
              Applied Science, and Management
            </p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2">
              <FaHome className="mr-2" />
              <Link to="./home" className="text-white hover:text--teal-800">Home</Link>
            </p>
            <p className="flex items-center mb-2">
              <FaBook className="mr-2" />
              <Link to="./current" className="text-white hover:text--teal-800">Current Issue</Link>
            </p>
            <p className="flex items-center mb-2">
              <FaArchive className="mr-2" />
              <Link to="./archives" className="text-white hover:text--teal-800">Archives</Link>
            </p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              <a href="mailto:contact@uorapublications.com" className="text-white hover:text--teal-800">
                contact@uorapublications.com
              </a>
            </p>
            <p className="flex items-center mb-2">
              <FaPhone className="mr-2" /> +91-9766930707
            </p>
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India
            </p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
          <p>&copy; 2025 Universal Journal of Green Sci-Tech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // ── Page Root ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MainContent />
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;