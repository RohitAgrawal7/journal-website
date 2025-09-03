import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaPaperPlane, FaFileAlt, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const PeerReviewProcess: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'review-process', 'post-acceptance'];
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
      { id: 'overview', title: 'Overview', icon: FaCheckCircle },
      { id: 'review-process', title: 'Review Process', icon: FaPaperPlane },
      { id: 'post-acceptance', title: 'Post-Acceptance', icon: FaFileAlt },
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
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-teal-800 p-6">
          <h1 className="text-3xl font-merriweather font-bold">Peer Review Process</h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="overview" title="Overview" icon={FaCheckCircle}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM follows a <strong>double-blind peer-review system</strong>, ensuring fairness, quality, and scientific rigor. Authors’ identities are hidden from reviewers, and reviewers remain anonymous. The peer-review process is thorough, objective, and designed to maintain the journal’s reputation for high-quality publications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              UJGSM maintains neutrality on all topics and evaluates manuscripts solely based on scientific merit.
            </p>
          </ContentSection>

          <ContentSection id="review-process" title="Review Process" icon={FaPaperPlane}>
            <p className="text-gray-700 leading-relaxed font-semibold">
              The peer-review process includes the following steps:
            </p>
            <ul className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>The editorial team performs an initial screening for completeness, formatting, adherence to guidelines, and similarity index. Incomplete or non-compliant manuscripts are rejected immediately.</li>
              <li>Suitable manuscripts are sent to at least two subject experts for evaluation. Reviewers access the anonymized manuscript and an evaluation form through the online system.</li>
              <li>Reviewers submit feedback within 2–3 weeks, providing suggestions for improvement and assessing the manuscript’s suitability for publication.</li>
              <li>The editorial team compiles reviewers’ comments and communicates them to the corresponding author. Authors may revise the manuscript and submit a response detailing changes.</li>
              <li>Revised manuscripts may be re-evaluated by the same or new reviewers if necessary.</li>
              <li>The Editor-in-Chief and editorial team make the final decision: accept, request further revisions, or reject.</li>
            </ul>
          </ContentSection>

          <ContentSection id="post-acceptance" title="Post-Acceptance" icon={FaFileAlt}>
            <p className="text-gray-700 leading-relaxed font-semibold">
              After acceptance, the following steps are taken:
            </p>
            <ul className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>Authors provide the Declaration Form after acceptance.</li>
              <li>The manuscript is formatted according to UJGSM style by the technical team.</li>
              <li>Copyright transfer and Article Processing Charges (APC) are collected.</li>
              <li>The corresponding author reviews the final version before online publication.</li>
              <li>The article is assigned a DOI and indexed online.</li>
            </ul>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-r from--teal-800 to-teal-800 text-white p-10 mt-10">
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
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91 90964 99989</p>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
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

export default PeerReviewProcess;