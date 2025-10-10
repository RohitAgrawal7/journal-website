import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaSearch, FaExclamationTriangle, FaFileUpload, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBook } from 'react-icons/fa';

const ReviewerGuidelines: React.FC = () => {
  const [activeSection, setActiveSection] = useState('responsibilities');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['responsibilities', 'review-focus', 'conflict-of-interest', 'submission-process'];
      const scrollPosition = window.scrollY + 100; // Offset for header
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
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
        <div className="bg-teal-800 p-6 rounded-lg shadow-md sticky top-6">
          <h2 className="text-vibrant-green mb-4 flex items-center">
            <FaCompass className="mr-2" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center ${activeSection === item.id ? 'bg-vibrant-green text-white' : 'text-dark-brown hover:bg-gray-100'}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <item.icon className="mr-2" />
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
    <section id={id} className="guideline-section p-6 rounded-lg mb-6 bg-white hover:bg-green-100 transition-all duration-300">
      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
        <Icon className="mr-3 text-teal-800 bg-vibrant-green rounded-full w-10 h-10 flex items-center justify-center" />
        {title}
      </h2>
      {children}
    </section>
  );

  // MainContent Component
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6">
          <h1 className="text-3xl font-merriweather font-bold">Reviewer Guidelines</h1>
         <p className="text-lg mt-2 font-semibold">Universal Journal of Green Sci‑Tech & Management</p>
          <p className="text-sm mt-1">ISSN (Online): To be assigned by ISSN India.</p>
          <p className="text-sm mt-1">Published by Universal Oneness Research Association (UORA) — Updated 2025.</p>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Peer reviewers are essential for maintaining the quality and integrity of manuscripts submitted to the Universal Journal of Green Sci-Tech and Management (UJGSM, ). Reviewers evaluate manuscripts strictly within their area of expertise and provide constructive, respectful, and honest feedback.
          </p>
          <ContentSection id="responsibilities" title="Responsibilities" icon={FaUserCheck}>
            <p className="text-gray-700 leading-relaxed">
              Reviewers assess the manuscript’s originality, completeness, accuracy, and adherence to UJGSM guidelines. They provide suggestions for improvement and advise the Editor-in-Chief on whether the manuscript should be accepted, revised, or rejected. While the final decision rests with the Editor-in-Chief, reviewers play a crucial role in shaping the outcome. All data, ideas, and information from the manuscript must be kept confidential and not used for personal gain (<a href="https://www.elsevier.com/reviewers/role" className="text-teal-800 hover:underline">Ref. Elsevier</a>).
            </p>
          </ContentSection>
          <ContentSection id="review-focus" title="Review Focus" icon={FaSearch}>
            <p className="text-gray-700 leading-relaxed">
              During evaluation, reviewers should consider the manuscript’s content quality and originality, clarity of title, abstract, keywords, introduction, methodology, results, discussion, tables, figures, references, and language. Reviewers should also ensure the manuscript complies with the journal format and ethical standards.
            </p>
          </ContentSection>
          <ContentSection id="conflict-of-interest" title="Conflict of Interest" icon={FaExclamationTriangle}>
            <p className="text-gray-700 leading-relaxed">
              Before accepting a review, reviewers must confirm they have no conflicts of interest with the authors or the subject matter, and that they have adequate time and expertise to conduct a thorough review.
            </p>
          </ContentSection>
          <ContentSection id="submission-process" title="Submission Process" icon={FaFileUpload}>
            <p className="text-gray-700 leading-relaxed mb-2">
              The entire review process is handled electronically. Please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                Access the Form: Only the online process should be used to fill out the reviewer form. You must click the link provided in your review invitation to access and download the designated Reviewer Form 
                <a
                  href="https://uorapublications.com/reviewer-form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-800 hover:underline"
                >
                  [Click link]
                </a>.
              </li>
              <li>Complete Evaluation: Fill out the form completely, providing your assessment of the manuscript's quality, completeness, and originality. UJGSM uses Turnitin and other plagiarism tools to ensure manuscript originality, and reviewers may comment on any ethical concerns.</li>
              <li>Submit the Form: Once finished, email the completed form to the editor at: <a href="mailto:editor@uorapublications.com" className="text-teal-800 hover:underline">editor@uorapublications.com</a>.</li>
            </ol>
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

export default ReviewerGuidelines;