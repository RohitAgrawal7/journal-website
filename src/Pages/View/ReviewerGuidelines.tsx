import React, { useState, useEffect, useCallback } from 'react';
import { FaUserCheck, FaSearch, FaExclamationTriangle, FaFileUpload, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ReviewerGuidelines: React.FC = () => {
  const [activeSection, setActiveSection] = useState('responsibilities');

  // Debounce function to limit scroll event frequency
  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Scroll handler with improved section detection
  useEffect(() => {
    const handleScroll = debounce(() => {
      const sections = ['responsibilities', 'review-focus', 'conflict-of-interest', 'submission-process'];
      const headerOffset = 60; // Adjust for fixed header height
      const scrollPosition = window.scrollY + headerOffset + 100; // Additional offset for visibility

      let currentSection = activeSection;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
          }
        }
      });
      setActiveSection(currentSection);
    }, 100); // 100ms debounce delay

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Scroll to section with header offset
  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 60; // Adjust for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  // Sidebar Component
  const Sidebar = () => {
    const navItems = [
      { id: 'responsibilities', title: 'Responsibilities', icon: FaUserCheck },
      { id: 'review-focus', title: 'Review Focus', icon: FaSearch },
      { id: 'conflict-of-interest', title: 'Conflict of Interest', icon: FaExclamationTriangle },
      { id: 'submission-process', title: 'Submission Process', icon: FaFileUpload },
    ];

    return (
      <div className="lg:col-span-1">
        <div className="bg-light-green p-6 rounded-lg shadow-md sticky top-6">
          <h2 className="text-vibrant-green text-xl font-merriweather mb-4 flex items-center">
            <FaCompass className="mr-2 text-lg" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center ${activeSection === item.id ? 'bg-vibrant-green text-white' : 'text-dark-brown hover:bg-gray-100 hover:shadow-lg'} transition-all duration-300`}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  aria-label={`Navigate to ${item.title} section`}
                >
                  <item.icon className="mr-2 text-lg" />
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
  const ContentSection: React.FC<{ id: string; title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }> = ({ id, title, icon: Icon, children }) => (
    <section id={id} className={`guideline-section pt-16 px-4 pb-4 rounded-lg mb-4 bg-white hover:bg-light-green transition-all duration-300 ${activeSection === id ? 'border-l-4 border-vibrant-green' : ''}`}>
      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
        <Icon className="mr-3 text-white bg-vibrant-green rounded-full w-10 h-10 p-2 flex items-center justify-center" />
        {title}
      </h2>
      {children}
    </section>
  );

  // MainContent Component
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-white p-8">
          <h1 className="text-4xl font-merriweather font-bold">Reviewer Guidelines</h1>
          <p className="text-lg mt-2 font-montserrat">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm mt-1 font-montserrat">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed font-montserrat">
            Peer reviewers are essential for maintaining the quality and integrity of manuscripts submitted to the Universal Journal of Green SciTech & Management (UJGSM, e-ISSN: XXXX-XXXX). Reviewers evaluate manuscripts strictly within their area of expertise and provide constructive, respectful, and honest feedback.
          </p>
          <ContentSection id="responsibilities" title="Responsibilities" icon={FaUserCheck}>
            <p className="text-gray-700 leading-relaxed font-montserrat">
              Reviewers assess the manuscript’s originality, completeness, accuracy, and adherence to UJGSM guidelines. They provide suggestions for improvement and advise the Editor-in-Chief on whether the manuscript should be accepted, revised, or rejected. While the final decision rests with the Editor-in-Chief, reviewers play a crucial role in shaping the outcome. All data, ideas, and information from the manuscript must be kept confidential and not used for personal gain (<a href="https://www.elsevier.com/reviewers/role" className="text-eco-gold hover:underline" target="_blank" rel="noopener noreferrer">Ref. Elsevier</a>).
            </p>
          </ContentSection>
          <ContentSection id="review-focus" title="Review Focus" icon={FaSearch}>
            <p className="text-gray-700 leading-relaxed font-montserrat">
              During evaluation, reviewers should consider the manuscript’s content quality and originality, clarity of title, abstract, keywords, introduction, methodology, results, discussion, tables, figures, references, and language. Reviewers should also ensure the manuscript complies with the journal format and ethical standards.
            </p>
          </ContentSection>
          <ContentSection id="conflict-of-interest" title="Conflict of Interest" icon={FaExclamationTriangle}>
            <p className="text-gray-700 leading-relaxed font-montserrat">
              Before accepting a review, reviewers must confirm they have no conflicts of interest with the authors or the subject matter, and that they have adequate time and expertise to conduct a thorough review.
            </p>
          </ContentSection>
          <ContentSection id="submission-process" title="Submission Process" icon={FaFileUpload}>
            <p className="text-gray-700 leading-relaxed mb-2 font-montserrat">
              The entire review process is handled electronically. Please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed font-montserrat">
              <li>
                Access the Form: Use the online process to fill out the reviewer form. Click the link provided in your review invitation to download the designated Reviewer Form&nbsp;
                <a
                  href="https://ujgsm.uorapublications.com/reviewer-form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-eco-gold hover:underline"
                >
                  [Click link]
                </a>.
              </li>
              <li>Complete Evaluation: Fill out the form completely, providing your assessment of the manuscript's quality, completeness, and originality. UJGSM uses Turnitin and other plagiarism tools to ensure manuscript originality, and reviewers may comment on any ethical concerns.</li>
              <li>Submit the Form: Email the completed form to the editor at: <a href="mailto:editor@uorapublications.com" className="text-eco-gold hover:underline">editor@uorapublications.com</a>.</li>
            </ol>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-r from-deep-green to-vibrant-green text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl font-merriweather mb-5 border-b-2 border-eco-gold pb-2 inline-block">About UJGSM</h3>
            <p className="font-montserrat">A peer-reviewed, open-access journal publishing quality research across Science, Technology, and Management.</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-merriweather mb-5 border-b-2 border-eco-gold pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2 font-montserrat"><FaHome className="mr-2" /> <a href="/" className="text-white hover:text-eco-gold">Home</a></p>
            <p className="flex items-center mb-2 font-montserrat"><FaBook className="mr-2" /> <a href="/current" className="text-white hover:text-eco-gold">Current Issue</a></p>
            <p className="flex items-center mb-2 font-montserrat"><FaArchive className="mr-2" /> <a href="/archives" className="text-white hover:text-eco-gold">Archives</a></p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-merriweather mb-5 border-b-2 border-eco-gold pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2 font-montserrat"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text-eco-gold">contact@uorapublications.com</a></p>
            <p className="flex items-center mb-2 font-montserrat"><FaPhone className="mr-2" /> +91 9766930707</p>
            <p className="flex items-center mb-2 font-montserrat"><FaMapMarkerAlt className="mr-2" /> E-1/8 Mathura Nagar, N-6, Cidco, Chhatrapati Sambhajinagar, Maharashtra 431003, India</p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80 font-montserrat">
          <p>&copy; 2025 Universal Journal of Green SciTech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

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

export default React.memo(ReviewerGuidelines);