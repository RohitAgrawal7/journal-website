import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaBookOpen, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaFilePdf, FaSyncAlt, FaCalendarAlt } from 'react-icons/fa';

const JournalIssue4 = () => {
  const [activeSection, setActiveSection] = useState('cover');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Setup Intersection Observer for section tracking
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref && observer.current) observer.current.observe(ref);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sidebar Component
  const Sidebar = () => {
    const navItems = [
      { id: 'cover', title: 'Issue Cover', icon: FaBook },
      { id: 'articles', title: 'Articles', icon: FaBookOpen },
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
        </div>
      </div>
    );
  };

  // ContentSection Component
  type ContentSectionProps = {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  };

  const ContentSection: React.FC<ContentSectionProps> = ({ id, title, icon: Icon, children }) => (
    <section 
      id={id}
      ref={el => { sectionRefs.current[id] = el; }}
      className="p-6 rounded-lg mb-6 bg-white transition-all duration-300"
    >
      <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
        <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <Icon className="text-lg" />
        </div>
        {title}
      </h2>
      {children}
    </section>
  );

  // Article Item Component
  type ArticleItemProps = {
    id: string;
    title: string;
    authors: string;
    pages: string;
    pdfLink: string;
    updateLink: string;
  };

  const ArticleItem: React.FC<ArticleItemProps> = ({ id, title, authors, pages, pdfLink, updateLink }) => (
    <div 
      className="mb-6 p-5 rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <h3 className="text-lg font-semibold text-teal-800 mb-2">
        <a
          href={pdfLink}
          className="hover:text-teal-600 hover:underline transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View article: ${title}`}
        >
          {title}
        </a>
      </h3>
      <div className="text-gray-600 italic mb-3">By {authors}</div>
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-2"></span>
        Pages: {pages}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={pdfLink}
          className={`flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
            hoveredItem === id 
              ? 'bg-gradient-to-r from-teal-600 to-green-600 shadow-md' 
              : 'bg-gradient-to-r from-teal-500 to-green-500 shadow-sm'
          }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download PDF for ${title}`}
        >
          <FaFilePdf className="mr-2" /> PDF
        </a>
        <a
          href={updateLink}
          className={`flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
            hoveredItem === id 
              ? 'bg-gradient-to-r from-blue-600 to-teal-600 shadow-md' 
              : 'bg-gradient-to-r from-blue-500 to-teal-500 shadow-sm'
          }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Check updates for ${title}`}
        >
          <FaSyncAlt className="mr-2" /> Check for Updates
        </a>
      </div>
    </div>
  );

  // MainContent Component
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
          <h1 className="text-3xl font-bold">Table of Contents</h1>
          <p className="text-lg mt-2 opacity-90">Universal Journal of Green Sci-Tech and Management  – Volume 48, 2025</p>
          <p className="text-sm mt-1">ISSN (Online):  3107-9326</p>
          <p className="text-sm opacity-80 mt-1">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> </p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="cover" title="Issue Cover" icon={FaBook}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src=" https://image2url.com/r2/default/images/1774632236661-23c327da-f619-43b1-8480-2fbc8d05ee5e.png"
                  alt="Journal Cover Vol. 48 (2025)"
                  className="w-64 h-auto rounded-lg shadow-md border border-teal-200"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center text-teal-700 mb-4">
                  <FaCalendarAlt className="mr-2 text-teal-600" />
                  <span className="font-medium">Published: 2026-02-15</span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  This issue features cutting-edge research across various disciplines including Engineering, Applied Science, and Management.
                </p>
                {/* <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg shadow-inner border border-teal-200">
                  <h3 className="text-lg font-semibold text-teal-800 mb-2 flex items-center">
                    <FaDownload className="mr-2 text-teal-600" /> Full Issue Download
                  </h3>
                  <a
                    href="https://ujgsm.uorapublications.com/issue/view/259/114"
                    className="inline-flex items-center py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download full issue PDF"
                  >
                    <FaFilePdf className="mr-2" /> Download Full Issue (PDF)
                  </a>
                </div> */}
              </div>
            </div>
          </ContentSection>
          <ContentSection id="articles" title="Articles" icon={FaBookOpen}>
            <div className="space-y-6">
              <ArticleItem
                id="5239"
                title="Socio-Economic Profile and Participation of Local Communities in the Implementation of
the Biological Diversity Act"
                authors="Rohit Yadav"
                pages="168-180"
                pdfLink="/volume1-issue4/article2.pdf"
                updateLink="/upcoming-content"
              />
              <ArticleItem
                id="5240"
                title="Clinical Evaluation of Individualized Homoeopathic Medicines as Add-On Therapy in
Acute Uncomplicated Lower Urinary Tract Infection in Females: A Prospective Single-Arm Study"
                authors="Jayapriya Beniwal, Sunil Kumar"
                pages="181-192"
                pdfLink="/volume1-issue4/article1.pdf"
                updateLink="/upcoming-content"
              />
               <ArticleItem
                id="5243"
               title="Legal Analysis of Forensic DNA Profiling: Issues and Challenges in India"
                authors="Vaishnavi Yadav, Jyotsna Singh"
                pages="192-208"
                pdfLink="/volume1-issue4/article3.pdf"
                updateLink="/upcoming-content"
              />
              {/* <ArticleItem
                id="5244"
                title="Experimental Investigation and Optimization of WEDM Parameters for Titanium
Alloy Considering MRR"
                authors="Mohammed Aakef Farooqui, Ravindra Karvande & Mohammad Irfan"
                pages="137-148"
                pdfLink="/volume1-issue3/article4.pdf"
                updateLink="/upcoming-content"
              />
              <ArticleItem
                id="5245"
                title="A Comprehensive Review of Wire Electrical Discharge Machining: Principles,
Parameters, Performance Measures, and Optimization Techniques"
                authors="Gajanan Khose, Shantisagar Biradar & Mohammad Irfan"
                pages="149-157"
                pdfLink="/volume1-issue3/article5.pdf"
                updateLink="/upcoming-content"
              />
              <ArticleItem
                id="5245"
                title="A Review on Polyester Powder Coatings: Materials, Deposition Techniques, Wear
Mechanisms, and Nanofiller-Based Performance Enhancement"
                authors="Chandrakant Sawant, Ravindra Karvande & Vilas Jadhav"

                pages="158-167"
                pdfLink="/volume1-issue3/article6.pdf"
                updateLink="/upcoming-content"
              /> */}
            </div>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // Footer Component
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
              <p className="flex items-center mb-2"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text--teal-800">Home</a></p>
              <p className="flex items-center mb-2"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text--teal-800">Current Issue</a></p>
              <p className="flex items-center mb-2"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text--teal-800">Archives</a></p>
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
          <MainContent />
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JournalIssue4;