import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaSearch, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface FormData {
  manuscriptId: string;
  manuscriptTitle: string;
  name: string;
  email: string;
}

interface FormErrors {
  manuscriptId?: string;
  manuscriptTitle?: string;
  name?: string;
  email?: string;
}

const TrackPaper: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    manuscriptId: '',
    manuscriptTitle: '',
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('track-paper');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.manuscriptId.trim()) {
      newErrors.manuscriptId = 'Manuscript ID is required';
    }
    
    if (!formData.manuscriptTitle.trim()) {
      newErrors.manuscriptTitle = 'Manuscript title is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        setTimeout(() => {
          setFormData({
            manuscriptId: '',
            manuscriptTitle: '',
            name: '',
            email: '',
          });
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('track-paper');
      if (element && element.offsetTop <= window.scrollY + 100) {
        setActiveSection('track-paper');
      }
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
      { id: 'track-paper', title: 'Track Paper', icon: FaSearch },
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

  // MainContent Component
  const MainContent = () => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-teal-800 p-6">
          <h1 className="text-3xl font-merriweather font-bold flex items-center">
            <FaSearch className="mr-3" /> Track Your Paper
          </h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
        </div>
        <div className="p-6">
          <section id="track-paper" className="guideline-section p-6 rounded-lg bg-white hover:bg-green-100 transition-all duration-300">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-teal-800/30 border border-eco-gold/20 rounded-xl text-center"
              >
                <FaCheckCircle className="text-4xl text-vibrant-green mb-4" />
                <h3 className="text-xl font-merriweather font-semibold text-vibrant-green mb-2">Request Submitted!</h3>
                <p className="text-gray-700 font-montserrat">
                  Thank you for your submission. We'll get back to you with your paper status shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="manuscriptId" className="block text-dark-brown font-merriweather font-medium mb-2">
                    Unique Manuscript ID <span className="text-eco-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="manuscriptId"
                    name="manuscriptId"
                    value={formData.manuscriptId}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
                      errors.manuscriptId ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
                    } text-gray-700`}
                    placeholder="Enter your manuscript ID"
                  />
                  {errors.manuscriptId && (
                    <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.manuscriptId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="manuscriptTitle" className="block text-dark-brown font-merriweather font-medium mb-2">
                    Manuscript Title <span className="text-eco-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="manuscriptTitle"
                    name="manuscriptTitle"
                    value={formData.manuscriptTitle}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
                      errors.manuscriptTitle ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
                    } text-gray-700`}
                    placeholder="Enter your manuscript title"
                  />
                  {errors.manuscriptTitle && (
                    <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.manuscriptTitle}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="block text-dark-brown font-merriweather font-medium mb-2">
                    Name <span className="text-eco-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
                      errors.name ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
                    } text-gray-700`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-dark-brown font-merriweather font-medium mb-2">
                    Email Address <span className="text-eco-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
                      errors.email ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
                    } text-gray-700`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.email}</p>
                  )}
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg font-montserrat font-medium transition-all ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-vibrant-green hover:bg-eco-gold text-teal-800 hover:text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </section>
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
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text-eco-gold">contact@uorapublications.com</a></p>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +91-9766930707</p>
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

export default TrackPaper;