import React, { useState, useEffect } from 'react';
import { FaBook, FaBookOpen, FaGlobe, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AimsObjectivesScope: React.FC = () => {
  const [activeSection, setActiveSection] = useState('aims');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['aims', 'objectives', 'scope'];
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
      { id: 'aims', title: 'Aims', icon: FaBook },
      { id: 'objectives', title: 'Objectives', icon: FaBookOpen },
      { id: 'scope', title: 'Scope', icon: FaGlobe },
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
          <h1 className="text-3xl font-merriweather font-bold">Aims, Objectives & Scope</h1>
         <p className="text-lg mt-2 font-semibold">Universal Journal of Green Sci‑Tech & Management</p>
          <p className="text-sm mt-1">ISSN (Online):  3107-9326</p>
          <p className="text-sm mt-1">Published by Universal Oneness Research Association (UORA) — Updated 2025.</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="aims" title="Aims" icon={FaBook}>
            <p className="text-gray-700 leading-relaxed">
              The Universal Journal of Green Sci-Tech and Management  aims to bridge the gap between research and practice by promoting and publishing original, high-quality studies across Science and Management disciplines. The journal welcomes contributions in:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Science:</strong> Physics, Chemistry, Mathematics, Materials Science, Biotechnology, Environmental Science, Life Sciences, Bioinformatics</li>
              <li><strong>Management:</strong> Technology Management, Innovation Management, Sustainability Management, Supply Chain, Operations, Entrepreneurship, Project Management</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              UJGSM publishes peer-reviewed, open-access articles to develop both theoretical and experimental knowledge, encourage national and international collaborations, and present interdisciplinary perspectives. The journal publishes six regular issues and special issues per year to foster global communication among researchers.
            </p>
          </ContentSection>

          <ContentSection id="objectives" title="Objectives" icon={FaBookOpen}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Provide a dynamic multidisciplinary platform to connect research with practical applications.</li>
              <li>Promote the dissemination of new research findings addressing local and global challenges.</li>
              <li>Encourage interdisciplinary collaboration and idea-sharing among researchers and practitioners.</li>
              <li>Support knowledge creation that offers practical solutions to policy, societal, and economic problems.</li>
              <li>Ensure open-access availability of peer-reviewed research to scholars, professionals, and the general public.</li>
            </ul>
          </ContentSection>

          <ContentSection id="scope" title="Scope" icon={FaGlobe}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM aims to create a platform that fosters research collaboration, innovation, and knowledge sharing. The journal:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Encourages contributions that advance Science and Management.</li>
              <li>Provides a forum for experts to exchange ideas, methodologies, and results.</li>
              <li>Publishes work that can address underrepresented areas of knowledge at the national and international level.</li>
              <li>Serves as a resource for scholars and practitioners to disseminate findings that impact society, economy, and the global research community.</li>
            </ul>
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

export default AimsObjectivesScope;