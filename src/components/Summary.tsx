import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUnlock, FaClock, FaBook, FaShieldAlt, FaCompass, FaHome, FaBookOpen, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AboutJournal: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'scope', 'peer-review', 'publication-schedule', 'commitment'];
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
      { id: 'overview', title: 'Overview', icon: FaBook },
      { id: 'scope', title: 'Scope & Subject Areas', icon: FaBookOpen },
      { id: 'peer-review', title: 'Peer Review', icon: FaCheckCircle },
      { id: 'publication-schedule', title: 'Publication Schedule', icon: FaClock },
      { id: 'commitment', title: 'Our Commitment', icon: FaShieldAlt },
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
        <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-teal-800 p-6">
          <h1 className="text-3xl font-merriweather font-bold">About the Journal</h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Established – 2025</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="overview" title="Overview" icon={FaBook}>
            <p className="text-gray-700 leading-relaxed">
              Universal Journal of Green SciTech & Management (UJGSM) is a bi-monthly, multidisciplinary, peer-reviewed online journal dedicated to advancing high-quality research across Science, Technology, Management, Arts, Medical Sciences, and allied fields. Launched in 2025, UJGSM is published by Universal Oneness Research Association (UORA), a leading platform committed to promoting ethical scholarly publishing and fostering global knowledge exchange.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The journal provides a platform for researchers, academicians, and practitioners to disseminate original research, review articles, case studies, short communications, and conference proceedings. With a strong emphasis on sustainability, innovation, and interdisciplinary collaboration, UJGSM encourages contributions from diverse disciplines.
            </p>
          </ContentSection>

          <ContentSection id="scope" title="Scope & Subject Areas" icon={FaBookOpen}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM welcomes contributions in the following disciplines:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Science:</strong> Physics, Chemistry, Mathematics, Materials Science, Biotechnology, Environmental Science, Bioinformatics, Life Sciences</li>
              <li><strong>Technology:</strong> Mechanical, Civil, Electrical, Electronics, Computer Science, AI, Data Science, Renewable Energy, Robotics, Nanotechnology, Green Technology</li>
              <li><strong>Management:</strong> Technology Management, Innovation Management, Sustainability Management, Supply Chain, Operations, Entrepreneurship, Project Management</li>
              <li><strong>Allied Fields:</strong> Arts, Medical Sciences, Social Sciences, and other emerging disciplines</li>
            </ul>
          </ContentSection>

          <ContentSection id="peer-review" title="Peer Review" icon={FaCheckCircle}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM follows a <strong>double-blind peer-review process</strong>, ensuring rigorous evaluation of manuscripts by experts from India and abroad. All submissions undergo plagiarism screening using tools such as Turnitin, and authors are required to provide a text similarity report along with a Cover Letter cum Declaration Form.
            </p>
          </ContentSection>

          <ContentSection id="publication-schedule" title="Publication Schedule" icon={FaClock}>
            <p className="text-gray-700 leading-relaxed font-semibold">
              The journal is published <strong>bi-monthly</strong> (six issues per year):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-teal-800">
                    <th className="p-3 text-left font-semibold border-b border-gray-300">Issue</th>
                    <th className="p-3 text-left font-semibold border-b border-gray-300">Publication Date</th>
                    <th className="p-3 text-left font-semibold border-b border-gray-300">Submission Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 1</td>
                    <td className="p-3 border-b border-gray-300">30th August 2025</td>
                    <td className="p-3 border-b border-gray-300">30th July 2025</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 2</td>
                    <td className="p-3 border-b border-gray-300">30th October 2025</td>
                    <td className="p-3 border-b border-gray-300">30th September 2025</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 3</td>
                    <td className="p-3 border-b border-gray-300">30th December 2025</td>
                    <td className="p-3 border-b border-gray-300">30th November 2025</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 4</td>
                    <td className="p-3 border-b border-gray-300">28th February 2026</td>
                    <td className="p-3 border-b border-gray-300">28th January 2026</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 5</td>
                    <td className="p-3 border-b border-gray-300">30th April 2026</td>
                    <td className="p-3 border-b border-gray-300">30th March 2026</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-300">Issue 6</td>
                    <td className="p-3 border-b border-gray-300">30th June 2026</td>
                    <td className="p-3 border-b border-gray-300">30th May 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentSection>

          <ContentSection id="commitment" title="Our Commitment" icon={FaShieldAlt}>
            <p className="text-gray-700 leading-relaxed">
              Committed to academic excellence and ethical publishing, UJGSM adheres to COPE-inspired guidelines, ensuring transparency, originality, and credibility in every publication. The journal aims to foster global collaboration, innovation, and the dissemination of impactful knowledge to researchers, institutions, and the broader scholarly community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              UJGSM is committed to supporting researchers and institutions in generating meaningful contributions, promoting interdisciplinary learning, and advancing global knowledge in science, technology, management, and beyond.
            </p>
          </ContentSection>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">About UJGSM</h3>
            <p>A peer-reviewed, open-access journal publishing quality research across Science, Technology, Management, and allied disciplines.</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Home</a></p>
            <p className="flex items-center mb-2"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Current Issue</a></p>
            <p className="flex items-center mb-2"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Archives</a></p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> <a href="mailto:ujgsmjournal@gmail.com" className="text-white hover:text-eco-gold">ujgsmjournal@gmail.com</a></p>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9733697736</p>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> West Bengal, India</p>
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

export default AboutJournal;