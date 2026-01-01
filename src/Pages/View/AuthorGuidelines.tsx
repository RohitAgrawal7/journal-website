import React, { useState, useEffect } from 'react';
import { FaBook, FaFileAlt, FaFont, FaHeading, FaListAlt, FaTable, FaShieldAlt, FaDatabase, FaEdit, FaCopyright, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AuthorGuidelines: React.FC = () => {
  const [activeSection, setActiveSection] = useState('submission-process');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'submission-process', 'page-setup', 'font-spacing', 'title-page', 'abstract-keywords',
        'main-text-structure', 'references', 'ethical-considerations', 'data-availability',
        'revisions', 'copyright-licensing'
      ];
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
      { id: 'submission-process', title: 'Submission Process', icon: FaBook },
      { id: 'page-setup', title: 'Page Setup', icon: FaFileAlt },
      { id: 'font-spacing', title: 'Font & Spacing', icon: FaFont },
      { id: 'title-page', title: 'Title Page', icon: FaHeading },
      { id: 'abstract-keywords', title: 'Abstract & Keywords', icon: FaListAlt },
      { id: 'main-text-structure', title: 'Main Text Structure', icon: FaTable },
      { id: 'references', title: 'References', icon: FaBook },
      { id: 'ethical-considerations', title: 'Ethical Considerations', icon: FaShieldAlt },
      { id: 'data-availability', title: 'Data Availability', icon: FaDatabase },
      { id: 'revisions', title: 'Revisions', icon: FaEdit },
      { id: 'copyright-licensing', title: 'Copyright & Licensing', icon: FaCopyright },
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
          <h1 className="text-3xl font-merriweather font-bold">Author & Style Guidelines</h1>
         <p className="text-lg mt-2 font-semibold">Universal Journal of Green Sci‑Tech & Management</p>
          <p className="text-sm mt-1">ISSN (Online):  3107-9326</p>
          <p className="text-sm mt-1">Published by Universal Oneness Research Association (UORA) — Updated 2025.</p>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Welcome to the Universal Journal of Green Sci-Tech and Management . To ensure a smooth submission process and that your manuscript meets our standards, please follow these guidelines carefully:
          </p>
          <ContentSection id="submission-process" title="Submission Process" icon={FaBook}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>Manuscripts must be submitted online via the UJGSM submission portal. If any issue occurs while submitting the manuscript, please contact us at <a href="mailto:contact@uorapublications.com" className="text--teal-800 hover:underline">contact@uorapublications.com</a>.</li>
              <li>Authors must ensure their work adheres to the journal’s formatting and ethical guidelines before submission.</li>
            </ol>
          </ContentSection>
          <ContentSection id="page-setup" title="Page Setup" icon={FaFileAlt}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Page Size:</strong> A4
              </li>
              <li>
                <strong>Margins:</strong> Top 2cm | Bottom 2cm | Left 1.5cm | Right 1.5cm
              </li>
              <li>
                <strong>Header:</strong> 0.5cm from top
              </li>
              <li>
                <strong>Footer:</strong> 0.5cm from bottom
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="font-spacing" title="Font & Spacing" icon={FaFont}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Font:</strong> Times New Roman, size 12
              </li>
              <li>
                <strong>Line Spacing:</strong> Single (1.15)
              </li>
              <li>
                <strong>Paragraph Spacing:</strong> 12 pt before and after each paragraph
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="title-page" title="Title Page" icon={FaHeading}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Title:</strong> Bold, centered, font size 14
              </li>
              <li>
                <strong>Authors & Affiliations:</strong> Bold, centered, font size 11
              </li>
              <li>
                <strong>Corresponding Author:</strong> Marked with an asterisk (*) and provide full contact details (email, mobile number, institution).
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="abstract-keywords" title="Abstract & Keywords" icon={FaListAlt}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Abstract:</strong> 200–250 words summarizing objectives, methodology, results, and conclusions. (Times New Roman, size 11, italicized)
              </li>
              <li>
                <strong>Keywords:</strong> 3–5 relevant terms. (Times New Roman, size 11, italicized)
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="main-text-structure" title="Main Text Structure" icon={FaTable}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Headings:</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Major sections (e.g., INTRODUCTION, METHODOLOGY, RESULTS, DISCUSSION, CONCLUSION): Bold, uppercase, size 12</li>
                  <li>Subheadings: Bold, size 12</li>
                  <li>Regular text: Size 12</li>
                </ul>
              </li>
              <li>
                <strong>Figures & Tables:</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Place figures and tables near the first mention in the text.</li>
                  <li>Ensure high resolution and clarity.</li>
                  <li>Provide descriptive captions.</li>
                  <li>Figure Captions: Placed below the figure, Times New Roman, size 11, italicized.</li>
                  <li>Table Captions: Placed above the table, Times New Roman, size 11, italicized.</li>
                </ul>
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="references" title="References" icon={FaBook}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Citation Style:</strong> Numeric (e.g., 1, 2, 3…)
              </li>
              <li>
                <strong>Format:</strong> APA style for references. All references must be complete and accurate.
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="ethical-considerations" title="Ethical Considerations" icon={FaShieldAlt}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                <strong>Ethical Approval:</strong> Required for research involving humans or animals.
              </li>
              <li>
                <strong>Conflict of Interest:</strong> Authors must declare any conflicts.
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="data-availability" title="Data Availability" icon={FaDatabase}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                Provide a data availability statement.
              </li>
              <li>
                If datasets are publicly available, include links. If not, explain why.
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="revisions" title="Revisions" icon={FaEdit}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                Revised manuscripts must address all reviewers’ comments.
              </li>
              <li>
                Authors should submit a detailed response letter with revisions.
              </li>
            </ol>
          </ContentSection>
          <ContentSection id="copyright-licensing" title="Copyright & Licensing" icon={FaCopyright}>
            <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
              <li>
                All articles in UJGSM are published under the <a href="https://creativecommons.org/licenses/by/4.0/" className="text--teal-800 hover:underline">Creative Commons Attribution License (CC BY 4.0)</a>.
              </li>
              <li>
                This permits unrestricted use, sharing, and reproduction, provided the original work is properly cited.
              </li>
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
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91 90964 99989</p>
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

export default AuthorGuidelines;