import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUnlock, FaClock, FaBook, FaPaperPlane, FaFileAlt, FaShieldAlt, FaBookOpen, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaCompass, FaHome } from 'react-icons/fa';

const AuthorsGuidelines: React.FC = () => {
  const [activeSection, setActiveSection] = useState('peer-review');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['peer-review', 'open-access', 'frequency', 'scope', 'submission', 'manuscript', 'ethics', 'references', 'reprints', 'fees', 'contact'];
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
      { id: 'peer-review', title: 'Peer Review', icon: FaCheckCircle },
      { id: 'open-access', title: 'Open Access', icon: FaUnlock },
      { id: 'frequency', title: 'Frequency of Publication', icon: FaClock },
      { id: 'scope', title: 'Scope & Subject Areas', icon: FaBook },
      { id: 'submission', title: 'Submission Process', icon: FaPaperPlane },
      { id: 'manuscript', title: 'Manuscript Preparation', icon: FaFileAlt },
      { id: 'ethics', title: 'Ethical Compliance', icon: FaShieldAlt },
      { id: 'references', title: 'References', icon: FaBookOpen },
      { id: 'reprints', title: 'Reprints & Archive', icon: FaArchive },
      { id: 'fees', title: 'Article Processing Charges', icon: FaMoneyBillWave },
      { id: 'contact', title: 'Contact', icon: FaEnvelope },
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
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white  p-6">
          <h1 className="text-3xl font-merriweather font-bold">Authors’ Guidelines</h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated Guidelines – 2025</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="peer-review" title="Peer Review" icon={FaCheckCircle}>
            <p className="text-gray-700 leading-relaxed">
              All submitted manuscripts undergo a <strong>double-blind peer-review process</strong> by experts from India and abroad to ensure <strong>fairness</strong>, <strong>quality</strong>, and <strong>scientific rigor</strong>. Reviewers remain anonymous, and authors’ identities are hidden from reviewers.
            </p>
          </ContentSection>

          <ContentSection id="open-access" title="Open Access" icon={FaUnlock}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM is a <strong>bi-monthly</strong>, <strong>peer-reviewed</strong>, <strong>open-access journal</strong>, promoting free and unrestricted access to research in <strong>Science</strong> and <strong>Management</strong>.
            </p>
          </ContentSection>

          <ContentSection id="frequency" title="Frequency of Publication" icon={FaClock}>
            <p className="text-gray-700 leading-relaxed font-semibold">
              UJGSM is published <strong>bi-monthly</strong> (six issues per year):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-teal-800 ">
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

          <ContentSection id="scope" title="Scope & Subject Areas" icon={FaBook}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM welcomes contributions in the following disciplines:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Science:</strong> Physics, Chemistry, Mathematics, Materials Science, Biotechnology, Environmental Science, Life Sciences</li>
              <li><strong>Management:</strong> Technology Management, Innovation Management, Sustainability Management, Operations, Supply Chain, Entrepreneurship, Project Management</li>
            </ul>
          </ContentSection>

          <ContentSection id="submission" title="Submission Process" icon={FaPaperPlane}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Direct Online Submission:</strong> Authors can submit manuscripts via the <strong>UJGSM submission portal</strong>.</li>
              <li><strong>Originality:</strong> Manuscripts must be original, unpublished work.</li>
              <li><strong>Template:</strong> Manuscripts should follow the UJGSM template (author details included within the manuscript).</li>
              <li><strong>Declaration Form:</strong> Required only after manuscript acceptance for publication.</li>
            </ul>
          </ContentSection>

          <ContentSection id="manuscript" title="Manuscript Preparation Guidelines" icon={FaFileAlt}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Page Size:</strong> A4, Portrait</li>
              <li><strong>Margins:</strong> 1 inch all sides</li>
              <li><strong>Font:</strong> Times New Roman, Size 12</li>
              <li><strong>Line Spacing:</strong> 1.15</li>
              <li><strong>Alignment:</strong> Justified, first-line indent for paragraphs</li>
              <li><strong>Title:</strong> Short, bold, capitalize each word; italics for scientific names</li>
              <li><strong>Abstract:</strong> Maximum 200–250 words</li>
              <li><strong>Keywords:</strong> Maximum 6, alphabetical order, first letter capitalized</li>
              <li><strong>Length:</strong> 6–30 pages (including tables, figures, references, acknowledgment, conflict of interest)</li>
            </ul>
          </ContentSection>

          <ContentSection id="ethics" title="Ethical Compliance" icon={FaShieldAlt}>
            <p className="text-gray-700 leading-relaxed">
              UJGSM upholds the <strong>highest ethical standards</strong>. Authors must adhere to the following:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Originality:</strong> Submit only original, unpublished work with proper citations.</li>
              <li><strong>Authorship:</strong> Ensure all authors contributed and approved the manuscript; changes require written consent.</li>
              <li><strong>Conflict of Interest:</strong> Declare any financial or personal conflicts, or state: “The authors declare no conflict of interest.”</li>
              <li><strong>Copyright:</strong> Obtain permission for any material not created by the authors.</li>
              <li><strong>Data Integrity:</strong> Report data accurately; fabrication or falsification is prohibited.</li>
            </ul>
          </ContentSection>

          <ContentSection id="references" title="References" icon={FaBookOpen}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Style:</strong> APA (American Psychological Association)</li>
              <li><strong>Arrangement:</strong> Alphabetically arranged</li>
              <li><strong>DOI:</strong> Inclusion encouraged</li>
              <li><strong>Examples:</strong> Provided for books, journal articles, patents, and multiple authors</li>
            </ul>
          </ContentSection>

          <ContentSection id="reprints" title="Reprints & Archive" icon={FaArchive}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Authors receive a <strong>PDF</strong> of the published article via email.</li>
              <li>Articles are archived on the <strong>UJGSM website</strong> and in recognized <strong>academic repositories</strong>.</li>
            </ul>
          </ContentSection>

          <ContentSection id="fees" title="Article Processing Charges (APC)" icon={FaMoneyBillWave}>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li><strong>Indian Authors:</strong> ₹15,000</li>
              <li><strong>Foreign Authors:</strong> $25 USD</li>
              <li><strong>Payment Timing:</strong> APC payable after acceptance, before publication</li>
              <li><strong>Payment Methods:</strong> NEFT, RTGS, PayPal, or Online Transfer</li>
              <li><strong>Waivers/Discounts:</strong> Available for authors from low-income and lower-middle-income countries on request via <a href="mailto:contact@uora.com" className="text--teal-800 hover:underline">contact@uora.com</a></li>
            </ul>
          </ContentSection>

          <ContentSection id="contact" title="Contact" icon={FaEnvelope}>
            <p className="text-gray-700 leading-relaxed">
              <strong>Publisher:</strong> Universal Oneness Research Association (UORA)
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Office Address:</strong> E-1/8 Mathura Nagar, N-6, Cidco, Chhatrapati Sambhajinagar, Maharashtra 431003, India
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Phone:</strong> +91 9766930707
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Email:</strong> <a href="mailto:contact@uora.com" className="text--teal-800 hover:underline">contact@uora.com</a>
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

export default AuthorsGuidelines;