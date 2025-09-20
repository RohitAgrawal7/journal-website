import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaBookOpen, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaFilePdf, FaSyncAlt, FaCalendarAlt, FaDownload } from 'react-icons/fa';

const JournalIssueTOC = () => {
  const [activeSection, setActiveSection] = useState('cover');
  const [hoveredItem, setHoveredItem] = useState(null);
  const observer = useRef(null);
  const sectionRefs = useRef({});

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
      if (ref) observer.current.observe(ref);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
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
  const ContentSection = ({ id, title, icon: Icon, children }) => (
    <section 
      id={id}
      ref={el => sectionRefs.current[id] = el}
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
  const ArticleItem = ({ id, title, authors, pages, pdfLink, updateLink }) => (
    <div 
      className="mb-6 p-5 rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <h3 className="text-lg font-semibold text-teal-800 mb-2">
        <a
          href={`https://ujgsm.uorapublications.com/article/view/${id}`}
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
          <p className="text-lg mt-2 opacity-90">Universal Journal of Green SciTech & Management (UJGSM) – Volume 48, 2025</p>
          <p className="text-sm opacity-80 mt-1">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | e-ISSN: XXXX-XXXX</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="cover" title="Issue Cover" icon={FaBook}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://qtanalytics.in/journals/public/journals/5/cover_issue_259_en_US.jpg"
                  alt="Journal Cover Vol. 48 (2025)"
                  className="w-64 h-auto rounded-lg shadow-md border border-teal-200"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center text-teal-700 mb-4">
                  <FaCalendarAlt className="mr-2 text-teal-600" />
                  <span className="font-medium">Published: 2025-08-30</span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  This issue features cutting-edge research across various disciplines including medical research, environmental studies, agriculture, materials science, and management.
                </p>
                <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg shadow-inner border border-teal-200">
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
                </div>
              </div>
            </div>
          </ContentSection>
          <ContentSection id="articles" title="Articles" icon={FaBookOpen}>
            <div className="space-y-6">
              <ArticleItem
                id="5239"
                title="Decoding the HPV-Positive HNSCC Paradox: Suppression of Oncogenic Drivers and Inflammatory Signalling Creates a Distinct Tumor Microenvironment"
                authors="Madhab Mondal, Divyadarshi Rai, Pratiksha Chhetri, Prerna Rai, Akash Baglari, Purandar Sarkar"
                pages="01-13"
                pdfLink="https://ujgsm.uorapublications.com/article/view/5239/2589"
                updateLink="https://ujgsm.uorapublications.com/article/view/5239/2590"
              />
              <ArticleItem
                id="5240"
                title="Nephroprotective Role of Ichnocarpus frutescens Leaf Extract Against Cisplatin-Induced Renal Injury: Evidence from Rat and HK-2 Cell Models via Nrf2–HO-1–GPX4 Axis Modulation"
                authors="Arbind Kumar Choudhary, Kamala Kanta Parhi, Shridhar Jayagopalan"
                pages="14-21"
                pdfLink="https://ujgsm.uorapublications.com/article/view/5240/2591"
                updateLink="https://ujgsm.uorapublications.com/article/view/5240/2592"
              />
              <ArticleItem
                id="5243"
                title="Ecological Insights into Butterfly Diversity and Habitat Preference: A Study from Acharya Prafulla Chandra College Campus"
                authors="Goutam Biswas, Sarthak Ranjan Sarkar, Rajarshi Nath, Diptak Chakraborty, Bhanumati Sarkar"
                pages="22-32"
                pdfLink="https://ujgsm.uorapublications.com/article/view/5243/2595"
                updateLink="https://ujgsm.uorapublications.com/article/view/5243/2596"
              />
              <ArticleItem
                id="5244"
                title="Fish Consumption Pattern and Nutritional Awareness Among the Population of Sitamarhi District of Bihar, India"
                authors="Ved Prakash Dubey, Sunny Raj"
                pages="33-41"
                pdfLink="https://ujgsm.uorapublications.com/article/view/5244/2597"
                updateLink="https://ujgsm.uorapublications.com/article/view/5244/2598"
              />
              <ArticleItem
                id="5245"
                title="Implementation of Enterprise Resource Planning (ERP) System in Manufacturing Companies: Effect on User Satisfaction and Organizational Performance"
                authors="Polavarapu Venkata Krishna Kishore, Sudha Vemaraju, Nagaraju Ellaturu, T. Lavanya Kumari"
                pages="42-50"
                pdfLink="https://ujgsm.uorapublications.com/article/view/5245/2599"
                updateLink="https://ujgsm.uorapublications.com/article/view/5245/2600"
              />
            </div>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
          <p>&copy; 2025 Universal Journal of Green SciTech & Management. All rights reserved.</p>
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

export default JournalIssueTOC;