import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaArrowRight, FaInfoCircle, FaUpload, FaBook, FaCompass, FaHome, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AuthorsGuideline: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'submission', 'details'];
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

  // Header Component
  const Header = () => (
    <header className="bg-gradient-to-r from-deep-green to-vibrant-green text-white shadow-lg sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <div className="logo flex items-center">
          <FaBookOpen className="text-xl mr-2" />
          <span className="font-merriweather font-bold text-lg">IJERR Home</span>
        </div>
        <div className="journal-info text-sm opacity-90 hidden lg:block">
          International Journal of Experimental Research and Review
        </div>
      </div>
    </header>
  );

  // Breadcrumb Component
  const Breadcrumb = () => (
    <div className="breadcrumb bg-light-green p-3 mb-5">
      <div className="container mx-auto max-w-6xl">
        <nav className="cmp_breadcrumbs flex text-sm" role="navigation" aria-label="You are here:">
          <a href="https://qtanalytics.in/journals/index.php/IJERR/index" className="text-vibrant-green hover:underline flex items-center">
            <FaHome className="mr-1" /> Home
          </a>
          <span className="separator mx-2 text-gray-600">/</span>
          <span className="current text-dark-brown" aria-current="page">Home Content</span>
        </nav>
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => {
    const navItems = [
      { id: 'overview', title: 'Overview', icon: FaInfoCircle },
      { id: 'submission', title: 'Submission', icon: FaUpload },
      { id: 'details', title: 'Journal Details', icon: FaBook },
    ];

    return (
      <div className="lg:col-span-1">
        <div className="bg-light-green p-6 rounded-lg shadow-md sticky top-6">
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
    <section id={id} className="guideline-section p-6 rounded-lg mb-6 bg-white hover:bg-light-green transition-all duration-300">
      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
        <Icon className="mr-3 text-white bg-vibrant-green rounded-full w-10 h-10 flex items-center justify-center" />
        {title}
      </h2>
      {children}
    </section>
  );

  // MainContent Component
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-white p-6">
          <h1 className="text-3xl font-merriweather font-bold">Home</h1>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="overview" title="Journal Overview" icon={FaInfoCircle}>
            <div className="wp-block-buttons flex justify-end space-x-4 mb-6">
              <div className="wp-block-button">
                <a
                  className="wp-block-button__link bg-teal-800 text-white font-medium py-4 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                  href="https://qtanalytics.in/journals/index.php/IJERR/issue/current"
                >
                  Current
                </a>
              </div>
              <div className="wp-block-button">
                <a
                  className="wp-block-button__link bg-teal-800 text-white font-medium py-4 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                  href="https://qtanalytics.in/journals/index.php/IJERR/issue/archive"
                >
                  Archive
                </a>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              For promoting scientific research and science communication among the researchers and enhancing the knowledge base encompassing the latest trends and developments in various disciplines of International Journal of Experimental Research and Review (IJERR) encourages author(s) to submit manuscripts from Basic Sciences (Physics, Chemistry, Mathematics, Earth Science, Astronomy & Life Sciences), Applied Sciences (Engineering, Medicine, Agriculture & Environmental Science) and Allied Disciplines including Computer, Technology, Management, Health and Medical Sciences, Nutrition, Botany, Zoology, Forestry, Fishery, Sericulture, Apiculture, Pharmacology, Bioinformatics, Geography, Educational Statistics and Social Sciences (Psychology, Sociology, Economics, Anthropology).
            </p>
            <p className="text-gray-700 leading-relaxed">
              International Journal of Experimental Research and Review i.e., IJERR (e-ISSN: 2455-4855; <a href="https://www.iaph.in" className="text-eco-gold hover:underline">www.iaph.in</a>) is a tri-annual multidisciplinary online journal. The journal is published tri-annually and follows double-blind peer-review strategy. The journal accepts good-quality original research articles, review articles, short communications, conference proceedings, seminar papers etc. International Academic Publishing House (IAPH) also publishes theme-based special issues from time to time. IAPH is committed to maintaining ethical standards at all stages of the publication process. Submitted manuscripts are assessed and reviewed by qualified editorial board members and invited expert reviewers (at least one from India and one from abroad each) from the relevant subject area. When submitting the manuscript to the online journal system, it is necessary to provide a Cover letter cum Declaration Form in which the author should focus on the subjects and mention specific research fields. This input is extremely helpful because it enables editors to simplify their responsibility of ensuring appropriate expertise. From a variety of sources and subject-matter experience, editors search for relevant possible reviewer names. Recommendations from subject-matter experts often guide editors in determining whether a submission should be accepted, revised, or rejected. Reviewers could provide significant advice on these decisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              IJERR is not a registered member of the Committee of Publication Ethics (COPE). However, it follows the best practices as defined by COPE and is open to the views and opinions of authors, reviewers and editorial board members. The journal adheres to the highest academic integrity standards as advocated by COPE (<a href="https://publicationethics.org/guidance/Guidelines" className="text-eco-gold hover:underline">https://publicationethics.org/guidance/Guidelines</a>) and upholds the standards of ethical behaviour at all stages of the publication process.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From 2021, the IJERR editorial office strictly monitors technical issues including fabrication, falsification, and plagiarism. The journal requests a write-up from the author(s) in the form of percentages of text similarity. Editorial office also checks such similarities with the help of Turnitin software. IJERR's Statement on Publication Ethics & Malpractice thoroughly explains all other important points relating to numerous malpractice categories.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The journal sets quality standards for the acceptance of appropriate manuscripts. IJERR welcomes the views and suggestions from author and editorial board members at all times to maintain and improve the overall standard. IJERR's team follows a set of processes, which encourage the accuracy and clarity of manuscripts, including editorial services, if required. All such processing is carried out by a team of experts, including the Co-Editors-in-Chief, Associate Editors and Editorial Members, whose is binding and final.
            </p>
          </ContentSection>

          <ContentSection id="submission" title="Submission Guidelines" icon={FaUpload}>
            <p className="text-gray-700 leading-relaxed">
              <strong>Subject areas for Publication:</strong> IJERR encourages author(s) to submit manuscripts from Basic Sciences (Physics, Chemistry, Mathematics, Earth Science, Astronomy & Life Sciences), Applied Sciences (Engineering, Medicine, Agriculture & Environmental Science) and Allied Disciplines including Computer, Technology, Management, Health and Medical Sciences, Nutrition, Botany, Zoology, Forestry, Fishery, Sericulture, Apiculture, Pharmacology, Bioinformatics, Geography, Educational Statistics and Social Sciences (Psychology, Sociology, Economics, Anthropology).
            </p>
          </ContentSection>

          <ContentSection id="details" title="Journal Details" icon={FaBook}>
            <div className="journal-info space-y-4">
              <p className="text-gray-700">
                <strong>Journal Title:</strong> <strong className="text-vibrant-green">International Journal of Experimental Research and Review</strong><br />
                <strong>ISSN:</strong> 2455-4855<br />
                <strong>Website:</strong> <a href="http://www.iaph.in/" className="text-eco-gold hover:underline">www.iaph.in</a><br />
                <strong>Publisher:</strong> International Academic Publishing House (IAPH)<br />
                <strong>Copyright:</strong> International Academic Publishing House (IAPH)<br />
                <strong>Starting Year:</strong> 2015<br />
                <strong>Subject:</strong> Multidisciplinary<br />
                <strong>Language:</strong> English<br />
                <strong>Publication Format:</strong><br />
                <a href="https://qtanalytics.in/journals/index.php/IJERR/online-submission-procedure" className="text-eco-gold hover:underline">https://qtanalytics.in/journals/index.php/IJERR/online-submission-procedure</a><br />
                <strong>Phone No:</strong> +91-9733697736
              </p>

              <p className="text-gray-700">
                <strong>Co-Editor-in-Chief</strong><br />
                <strong>Shubhadeep Roychoudhury,</strong> Ph.D., Habil.<br />
                Associate Professor, Department of Life Science & Bioinformatics<br />
                Assam University, Silchar, India<br />
                E-mail: shubhadeep1@gmail.com<br />
                <a href="https://orcid.org/0000-0003-4174-1852" className="text-eco-gold hover:underline"><strong>https://orcid.org/0000-0003-4174-1852</strong></a><br />
                <a href="https://www.scopus.com/authid/detail.uri?authorId=24067583200" className="text-eco-gold hover:underline"><strong>https://www.scopus.com/authid/detail.uri?authorId=24067583200</strong></a><br />
                <a href="https://www.researchgate.net/profile/Shubhadeep_Roychoudhury" className="text-eco-gold hover:underline"><strong>https://www.researchgate.net/profile/Shubhadeep_Roychoudhury</strong></a>
              </p>

              <p className="text-gray-700">
                <strong>Co-Editor-in-Chief</strong><br />
                <strong>Nithar Ranjan Madhu,</strong> Ph.D.<br />
                Associate Professor, Department of Zoology<br />
                Acharya Prafulla Chandra College, New Barrackpore, North 24 Parganas, Kolkata, India<br />
                E-mail: chiefeditoriaph@gmail.com, nithar@apccollege.ac.in<br />
                <a href="https://orcid.org/0000-0003-4198-5048" className="text-eco-gold hover:underline"><strong>https://orcid.org/0000-0003-4198-5048</strong></a><br />
                <a href="https://www.scopus.com/authid/detail.uri?authorId=36178099100" className="text-eco-gold hover:underline"><strong>https://www.scopus.com/authid/detail.uri?authorId=36178099100</strong></a>
              </p>

              <p className="text-gray-700">
                <strong>Regular Volumes:</strong><br />
                (A) Date of Publishing: 30<sup>th</sup> April (Submission Deadline: 20th March)<br />
                (B) Date of Publishing: 30<sup>th</sup> August (Submission Deadline: 20th July)<br />
                (C) Date of Publishing: 30<sup>th</sup> December (Submission Deadline: 20th November)
              </p>

              <p className="text-gray-700">
                <strong>Special Volumes:</strong> Based on the needs<br />
                (*) Acknowledgement of received information: Within Seven (7) days<br />
                (**) Final Decision (Accepted/ Rejected): Approx. 25+ days from the date of submission of the manuscript
              </p>

              <p className="text-gray-700">
                <strong>Address-1:</strong> Village & Post.: Chikanpara, Thakurnagar, P.S. Gaighata, Dist. North 24 Parganas, West Bengal 743287, India
              </p>

              <p className="text-gray-700">
                <strong>Address-2:</strong> Sarada Sarani, Nibedita Park, Post Office: Hridaypur, Dist- North 24 Parganas, Kolkata, Pin – 700127, West Bengal, India. E-mail: iaphjournal@gmail.com
              </p>

              <p className="text-gray-700">
                <strong>Address-3 (International):</strong> 91 Victoria Road, Swindon, SN13BD, ENGLAND, E-mail: publisher@iaph.co.in
              </p>
            </div>
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
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">About IJERR</h3>
            <p>A peer-reviewed, open-access journal publishing quality research across multiple disciplines.</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Quick Links</h3>
            <p className="flex items-center mb-2"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Home</a></p>
            <p className="flex items-center mb-2"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Current Issue</a></p>
            <p className="flex items-center mb-2"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold">Archives</a></p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">Contact Us</h3>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> iaphjournal@gmail.com</p>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9733697736</p>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> West Bengal, India</p>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
          <p>&copy; 2023 International Journal of Experimental Research and Review. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Breadcrumb />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar />
          <MainContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorsGuideline;