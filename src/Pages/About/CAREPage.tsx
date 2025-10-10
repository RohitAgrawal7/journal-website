import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaUsers, FaRegFileAlt, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const CARE: React.FC = () => {
  const [activeSection, setActiveSection] = useState('ugc-care');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['ugc-care', 'peer-review', 'ugc-regulation'];
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
      { id: 'ugc-care', title: 'UGC CARE & Ethical Compliance', icon: FaFileAlt },
      { id: 'peer-review', title: 'Peer Review Process', icon: FaUsers },
      { id: 'ugc-regulation', title: 'Latest UGC Regulation', icon: FaRegFileAlt },
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
          <h1 className="text-3xl font-merriweather font-bold">UGC CARE and Ethical Compliance</h1>
         <p className="text-lg mt-2 font-semibold">Universal Journal of Green Sci‑Tech & Management</p>
          <p className="text-sm mt-1">ISSN (Online): To be assigned by ISSN India.</p>
          <p className="text-sm mt-1">Published by Universal Oneness Research Association (UORA) — Updated 2025.</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="ugc-care" title="UGC CARE & Ethical Compliance" icon={FaFileAlt}>
            <p className="text-gray-700 leading-relaxed">
              The University Grants Commission (UGC), India (<a href="https://www.ugc.ac.in" className="text--teal-800 hover:underline" target="_blank" rel="noopener noreferrer">www.ugc.ac.in</a>) has established the UGC-CARE List (Consortium for Academic and Research Ethics) to maintain academic and research integrity and uphold publication ethics. The initiative is supported by an executive board consisting of eminent research scientists and academicians. <a href="https://ugccare.unipune.ac.in/apps1/home/index" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">[Reference]</a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Since 2021, the Journal’s Executive Members have strictly monitored ethical issues such as fabrication, falsification, and plagiarism. Authors are required to provide a text similarity report (in percentage) at the time of submission. In addition, all manuscripts are double-checked using the Journal’s licensed Turnitin plagiarism detection software.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Journal follows a Statement on Publication Ethics & Malpractice, which outlines categories of academic misconduct and the measures taken for prevention.
            </p>
          </ContentSection>

          <ContentSection id="peer-review" title="Peer Review Process" icon={FaUsers}>
            <p className="text-gray-700 leading-relaxed">
              The Journal employs a double-blind peer-review system to ensure:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Highest quality of research evaluation</li>
              <li>Fairness and transparency in publication decisions</li>
              <li>Strict avoidance of plagiarism</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              Every submitted article is evaluated by two expert reviewers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>One reviewer from India</li>
              <li>One reviewer from abroad</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              This process ensures academic rigor and international research standards.
            </p>
          </ContentSection>

          <ContentSection id="ugc-regulation" title="Latest UGC Regulation" icon={FaRegFileAlt}>
            <p className="text-gray-700 leading-relaxed">
              As per the latest memorandum:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>F. No.:</strong> 1-1/2018(CARE/JOURNAL)</li>
              <li><strong>Date:</strong> 16th July 2025</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              This regulation provides the latest updates on ethical compliance and journal evaluation criteria under UGC-CARE. <a href="https://acrobat.adobe.com/id/urn:aaid:sc:ap:405a17c1-3a88-4228-86d5-246663b7bea7" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">[Link]</a>
            </p>
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

export default CARE;