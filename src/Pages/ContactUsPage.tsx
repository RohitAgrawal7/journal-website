import React, { useState, useEffect } from 'react';
import { FaBuilding, FaUserTie, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Publisher: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about-uora');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about-uora', 'principal-contacts'];
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
      { id: 'about-uora', title: 'About UORA', icon: FaBuilding },
      { id: 'principal-contacts', title: 'Principal Contacts', icon: FaUserTie },
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
          <h1 className="text-3xl font-merriweather font-bold">Publisher</h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="about-uora" title="About UORA" icon={FaBuilding}>
            <p className="text-gray-700 leading-relaxed">
              The Universal Oneness Research Association (UORA) is the proud publisher of the Universal Journal of Green SciTech & Management (UJGSM). Committed to advancing interdisciplinary research, UORA supports high-quality, open-access publications in science, technology, and management.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Office Address:</strong> E-1/8 Mathura Nagar, N-6, Cidco, Chhatrapati Sambhajinagar, Maharashtra 431003, India<br />
              <strong>Phone:</strong> <a href="tel:+919766930707" className="text--teal-800 hover:underline">+91 97669 30707</a><br />
              <strong>Email:</strong> <a href="mailto:contact@uorapublications.com" className="text--teal-800 hover:underline">contact@uorapublications.com</a>
            </p>
          </ContentSection>

          <ContentSection id="principal-contacts" title="Principal Contacts" icon={FaUserTie}>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="text-lg font-semibold text-vibrant-green mb-2">Editor-in-Chief</h3>
              <p>
                <strong>Prof. Pawan D. Somavanshi (Ph.D. Mechanical)</strong><br />
                Research Scholar, Government College of Engineering, Aurangabad<br />
                <strong>Email:</strong> <a href="mailto:pawansomavanshi.PhD@geca.ac.in" className="text--teal-800 hover:underline">pawansomavanshi.PhD@geca.ac.in</a>, <a href="mailto:pawansomavanshi5jan@gmail.com" className="text--teal-800 hover:underline">pawansomavanshi5jan@gmail.com</a><br />
                <strong>Phone:</strong> <a href="tel:+919096499989" className="text--teal-800 hover:underline">+91 90964 99989</a>
              </p>
              <h3 className="text-lg font-semibold text-vibrant-green mt-4 mb-2">Managing Editor</h3>
              <p>
                <strong>Dr. Swapnil N. Dhole (Ph.D. Mechanical)</strong><br />
                TPO, MSS's College of Engineering and Technology & MBA, Jalna<br />
                <strong>Email:</strong> <a href="mailto:dholeswapnil25@gmail.com" className="text--teal-800 hover:underline">dholeswapnil25@gmail.com</a><br />
                <strong>Phone:</strong> <a href="tel:+918983245607" className="text--teal-800 hover:underline">+91 89832 45607</a>
              </p>
            </div>
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
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9766930707</p>
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

export default Publisher;