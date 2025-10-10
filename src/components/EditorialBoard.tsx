import React, { useState, useEffect } from 'react';
import { FaUserTie, FaUsers, FaUserGraduate, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';

const EditorBoards: React.FC = () => {
  const [activeSection, setActiveSection] = useState('editor-in-chief');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['editor-in-chief', 'managing-editor', 'editorial-board'];
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
      { id: 'editor-in-chief', title: 'Editor-in-Chief', icon: FaUserTie },
      { id: 'managing-editor', title: 'Managing Editor', icon: FaUsers },
      { id: 'editorial-board', title: 'Editorial Board Members', icon: FaUserGraduate },
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
          <h1 className="text-3xl font-merriweather font-bold">Editor Boards</h1>
          <p className="text-lg mt-2 font-semibold">Universal Journal of Green Sci‑Tech & Management</p>
          <p className="text-sm mt-1">ISSN (Online): To be assigned by ISSN India.</p>
          <p className="text-sm mt-1">Published by Universal Oneness Research Association (UORA) — Updated 2025.</p>
        </div>
        <div className="p-6 space-y-6">
          <ContentSection id="editor-in-chief" title="Editor-in-Chief" icon={FaUserTie}>
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img src="./pawan_1.jpeg" alt="Editor-in-Chief" className="w-40 h-40 rounded-full shadow-md object-cover" />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Name:</strong> Prof. Pawan Dhanraj Somavanshi (Ph.D. Mechanical)<ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                  <strong>Affiliation:</strong> Research Scholar, Government College of Engineering, Aurangabad<br />
                  <strong>Email:</strong> <a href="mailto:pawansomavanshi.PhD@geca.ac.in" className="text--teal-800 hover:underline">pawansomavanshi.PhD@geca.ac.in</a>, <a href="mailto:pawansomavanshi5jan@gmail.com" className="text--teal-800 hover:underline">pawansomavanshi5jan@gmail.com</a><br />
                  <strong>Mobile:</strong> <a href="tel:+919096499989" className="text--teal-800 hover:underline">+91 90964 99989</a>
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection id="managing-editor" title="Managing Editor" icon={FaUsers}>
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img src="./Swapnil.jpeg" alt="Managing Editor" className="w-40 h-40 rounded-full shadow-md object-cover" />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Name:</strong> Dr. Swapnil Narayan Dhole (Ph.D. Mechanical)<ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /> <br />
                  <strong>Affiliation:</strong> TPO, MSS's College of Engineering and Technology & MBA, Jalna<br />
                  <strong>Email:</strong> <a href="mailto:dholeswapnil25@gmail.com" className="text--teal-800 hover:underline">dholeswapnil25@gmail.com</a><br />
                  <strong>Mobile:</strong> <a href="tel:+918983245607" className="text--teal-800 hover:underline">+91 89832 45607</a>
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection id="editorial-board" title="Editorial Board Members" icon={FaUserGraduate}>
            <div className="flex flex-col md:flex-row md:gap-6">
              {/* <div className="md:w-1/3 mb-4 md:mb-0">
                <img src="/images/editorial-board.jpg" alt="Editorial Board" className="w-40 h-40 rounded-full shadow-md object-cover" />
              </div> */}
              <div className="md:w-2/3">
                <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Dr. Satish B Bhalerao</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Sr. Manager (Research and Development), Siemens Limited, Aurangabad<br />
                    <strong>Contact:</strong> <a href="mailto:satish.bhalerao@siemens.com" className="text--teal-800 hover:underline">satish.bhalerao@siemens.com</a>, <a href="tel:+919096792217" className="text--teal-800 hover:underline">+91 9096792217</a>
                  </li>
                  <li>
                    <strong>Dr. Vaibhav V. Nemane</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    MEMS, Indian Institute of Technology (IIT), Bombay<br />
                    <strong>Contact:</strong> <a href="mailto:vaibhavn@iitb.ac.in" className="text--teal-800 hover:underline">vaibhavn@iitb.ac.in</a>, <a href="tel:+919623474818" className="text--teal-800 hover:underline">+91 9623474818</a>
                  </li>
                  <li>
                    <strong>Dr. Rohit R. Garbade</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Manager Metallurgy (Research and Development), Varroc Engineering Limited, Aurangabad<br />
                    <strong>Contact:</strong> <a href="mailto:Rohit.Garbade@varroc.com" className="text--teal-800 hover:underline">Rohit.Garbade@varroc.com</a>, <a href="tel:+917020818373" className="text--teal-800 hover:underline">+91 7020818373</a>
                  </li>
                  <li>
                    <strong>Dr. Umeshkumar H. Chavan</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    TPO, Marathwada Institute of Technology, Rotegaon, Chhatrapati Sambhajinagar, Maharashtra<br />
                    
                    <strong>Contact:</strong> <a href="mailto:umeshkumar.chavan@mit.asia" className="text--teal-800 hover:underline">umeshkumar.chavan@mit.asia</a>, <a href="tel:+918888526181" className="text--teal-800 hover:underline">+91 8888526181</a>
                  </li>
                  <li>
                    <strong>Dr. Manohar S Wankhade</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Principal, Siddharth Library & Information Science College, Chhatrapati Sambhajinagar<br />
                    
                    <strong>Contact:</strong> <a href="mailto:manoharwankhade@gmail.com" className="text--teal-800 hover:underline">manoharwankhade@gmail.com</a>, <a href="tel:+919850141764" className="text--teal-800 hover:underline">+91 9850141764</a>
                  </li>
                    <li>
                    <strong>Dr. Vikram Bhutekar</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Associate Professor, Sant Dnyaneshwar College of Arts and Science, Soygaon<br />
                    
                    <strong>Contact:</strong> <a href="mailto:vikrambhutekar55@gmail.com" className="text--teal-800 hover:underline">vikrambhutekar55@gmail.com</a>, <a href="tel:+919404001055" className="text--teal-800 hover:underline">+91 9404001055</a>
                    </li>
                    <li>
                    <strong>Dr. Amogh Sambare</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Assistant Professor, Deen Dayal Upadhyay KAUSHAL Kendra, Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar<br />
                    <strong>Contact:</strong> <a href="mailto:asambare.ddukk@bamu.ac.in" className="text--teal-800 hover:underline">asambare.ddukk@bamu.ac.in</a>, <a href="tel:+919420056178" className="text--teal-800 hover:underline">+91 94200 56178</a>
                    </li>
                    <li>
                    <strong>Dr. Prashant Arun Jadhav</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Assistant Professor, CSMSS Chhatrapati Shahu College of Engineering, Aurangabad<br />
                    <strong>Contact:</strong> <a href="mailto:pajadhav@csmssengg.org" className="text--teal-800 hover:underline">pajadhav@csmssengg.org</a>, <a href="tel:+918149985704" className="text--teal-800 hover:underline">+91 81499 85704</a>
                    </li>
                    <li>
                    <strong>Mr. Sayyed Rehan Ali</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Mechanical Piping QC Engineer, China Energy Engineering Corporation (CEEC)<br />
                    <strong>Contact:</strong> <a href="mailto:sayyed@gedi.com.cn" className="text--teal-800 hover:underline">sayyed@gedi.com.cn</a>, <a href="tel:+966507630254" className="text--teal-800 hover:underline">+966 50 763 0254</a>
                    </li>
                    <li>
                    <strong>Prof. Amarsingh Mali</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    TPO MSP Mandal, Deogiri Institute of Engineering and Management Studies, Aurangabad<br />
                    <strong>Contact:</strong> <a href="mailto:amarmali@dietms.org" className="text--teal-800 hover:underline">amarmali@dietms.org</a>, <a href="tel:+919860844233" className="text--teal-800 hover:underline">+91 98608 44233</a>
                    </li>
                   {/* <li>
                    <strong><span className="inline-flex items-center">Gaurav Pandey <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px', marginLeft: '8px' }} /></span></strong><br />
                    Food and Beverage Executive, JKS Restaurant Ltd., Westminster, London, United Kingdom<br />
                    <strong>Contact:</strong> <a href="mailto:ggaurav.uk@gmail.com" className="text--teal-800 hover:underline">ggaurav.uk@gmail.com</a>, <a href="tel:+447361568115" className="text--teal-800 hover:underline">+44 7361568115</a>
                  </li> */}
                  <li>
                    <strong>Dr. Kartik Sheshrao Gawande</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Professor & HOD, History Dept, Karmayogi Ankushrao Tope College Arts, Commerce and Science<br />
                    
                    <strong>Contact:</strong> <a href="mailto:kartikgawande111@gmail.com" className="text--teal-800 hover:underline">kartikgawande111@gmail.com</a>, <a href="tel:+919422721459" className="text--teal-800 hover:underline">+91 9422721459</a>
                  </li>
                  <li>
                    <strong>Dr. Manoj Dnyanba Mate</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    CSMSS CSCOE, Central Training and Placement Coordinator<br />
                   
                    <strong>Contact:</strong> <a href="mailto:mdmate@csmssengg.org" className="text--teal-800 hover:underline">mdmate@csmssengg.org</a>, <a href="tel:+919423745212" className="text--teal-800 hover:underline">+91 9423745212</a>
                  </li>
                  <li>
                    <strong><span className="inline-flex items-center">Sourabh Rudwar <ReactCountryFlag countryCode="SG" svg style={{ width: '24px', height: '24px', marginLeft: '8px' }} /></span></strong><br />
                    Principal Lead Developer, London Stock Exchange Group, Singapore<br />
                    <strong>Contact:</strong> <a href="mailto:Sourabh.Rudrawar@lseg.com" className="text--teal-800 hover:underline">Sourabh.Rudrawar@lseg.com</a>, <a href="tel:+6598353151" className="text--teal-800 hover:underline">+65 98353151</a>
                  </li>
                  <li>
                    <strong>Dr. Gopnarayan Ramesh Shilvant</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Assistant Professor, Siddharth Library & Information Science College, Padegaon, Chhatrapati Sambhajinagar<br />
                    
                    <strong>Contact:</strong> <a href="mailto:shilvantgopnarayan@rediffmail.com" className="text--teal-800 hover:underline">shilvantgopnarayan@rediffmail.com</a>, <a href="tel:+919527368431" className="text--teal-800 hover:underline">+91 9527368431</a> / <a href="tel:+917028280218" className="text--teal-800 hover:underline">+91 7028280218</a>
                  </li>
                  <li>
                    <strong>Dr. Pramod Herode</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Principal, Dr. Ambedkar College of Law, Chhatrapati Sambhajinagar<br />
                   
                    <strong>Contact:</strong> <a href="mailto:pramod.herode@gmail.com" className="text--teal-800 hover:underline">pramod.herode@gmail.com</a>, <a href="tel:+919403629469" className="text--teal-800 hover:underline">+91 9403629469</a>
                  </li>
                  <li>
                    <strong>Dr. Milind Athawale</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Assistant Professor, Master in Mass Communication & Journalism (MAMCJ), Siddharth Library & Information Science College, Chhatrapati Sambhajinagar<br />
                   
                    <strong>Contact:</strong> <a href="mailto:drmilindathawale@gmail.com" className="text--teal-800 hover:underline">drmilindathawale@gmail.com</a>, <a href="tel:+919404478565" className="text--teal-800 hover:underline">+91 9404478565</a>
                  </li>
                  <li>
                    <strong><span className="inline-flex items-center">Durgasingh Balaji Kabre <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px', marginLeft: '8px' }} /></span></strong><br />
                    Process Engineer, Amphenol Ltd, Whitstable, Kent, United Kingdom<br />
                    <strong>Contact:</strong> <a href="mailto:Durgasinghkabre@amphenol.co.uk" className="text--teal-800 hover:underline">Durgasinghkabre@amphenol.co.uk</a>, <a href="tel:+447867043129" className="text--teal-800 hover:underline">+44 7867043129</a>
                  </li>
                  <li>
                    <strong>Dr. Shantisagar K Biradar</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Principal, Matsyodari Shikshan Sanstha’s College of Engineering & Technology, Jalna<br />
                   
                    <strong>Contact:</strong> <a href="mailto:shantisagarbiradar@gmail.com" className="text--teal-800 hover:underline">shantisagarbiradar@gmail.com</a>, <a href="tel:+919822628679" className="text--teal-800 hover:underline">+91 9822628679</a>
                  </li>
                  <li>
                    <strong>Dr. Yuvraj Dhabadge</strong><ReactCountryFlag countryCode="IN" svg style={{ width: '24px', height: '24px', marginRight: '8px',marginLeft: '8px' }} /><br />
                    Professor, Dagdujirao Deshmukh Arts, Commerce & Science College, Waluj, Chhatrapati Sambhajinagar<br />
                    
                    <strong>Contact:</strong> <a href="mailto:yuvrajdhabadge@gmail.com" className="text--teal-800 hover:underline">yuvrajdhabadge@gmail.com</a>, <a href="tel:+919823208074" className="text--teal-800 hover:underline">+91 9823208074</a>
                  </li>

                  <li>
                    <strong><span className="inline-flex items-center">Amol Gangaji <ReactCountryFlag countryCode="AE" svg style={{ width: '24px', height: '24px', marginLeft: '8px' }} /></span></strong><br />
                    Deputy Manager – Continuous Improvement (Business Excellence Lead), Sobha Group, Dubai, United Arab Emirates<br />
                    <strong>Contact:</strong> <a href="mailto:amol.gangaji@sobhaconst.com" className="text--teal-800 hover:underline">amol.gangaji@sobhaconst.com</a>, <a href="tel:+971569962583" className="text--teal-800 hover:underline">+971 569962583</a>
                  </li>
                </ol>
              </div>
            </div>
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

export default EditorBoards;