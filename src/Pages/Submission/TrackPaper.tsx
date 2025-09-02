import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaExclamationCircle } from 'react-icons/fa';

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

  // Memoized validation function
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.manuscriptId.trim()) newErrors.manuscriptId = 'Manuscript ID is required';
    if (!formData.manuscriptTitle.trim()) newErrors.manuscriptTitle = 'Manuscript title is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Optimized input change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Optimized form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-eco-gold" />
          Please fill all required fields correctly.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-900/30 text-eco-gold font-montserrat',
        }
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit');
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 text-vibrant-green" />
          Request Submitted! We'll get back to you with your paper status.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-vibrant-green text-teal-800 font-montserrat',
        }
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({ manuscriptId: '', manuscriptTitle: '', name: '', email: '' });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-eco-gold" />
          Submission failed. Please try again or contact support.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-900/30 text-eco-gold font-montserrat',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('track-paper');
      if (element && element.getBoundingClientRect().top <= 100) {
        setActiveSection('track-paper');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 20, behavior: 'smooth' });
    }
  }, []);

  // Memoized Sidebar component
  const Sidebar = useMemo(() => {
    const navItems = [{ id: 'track-paper', title: 'Track Paper', icon: FaSearch }];
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
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center transition-colors ${
                    activeSection === item.id ? 'bg-vibrant-green text-white' : 'text-dark-brown hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <item.icon className="mr-2" />
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-teal-800 rounded-lg">
            <h3 className="text-vibrant-green font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-white">
              Contact us at{" "}
              <a href="mailto:contact@uorapublications.com" className="text-eco-gold hover:underline">
                contact@uorapublications.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }, [activeSection, scrollToSection]);

  const handleReset = useCallback(() => {
    setFormData({ manuscriptId: '', manuscriptTitle: '', name: '', email: '' });
    setErrors({});
  }, []);

  // Memoized MainContent component
  const MainContent = useMemo(() => {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-teal-800 p-6">
            <h1 className="text-3xl font-merriweather font-bold flex items-center">
              <FaSearch className="mr-3" /> Track Your Paper
            </h1>
            <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
            <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – {new Date().getFullYear()}</p>
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
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.manuscriptId ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
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
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.manuscriptTitle ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                      } text-gray-700`}
                      placeholder="Enter your manuscript title"
                    />
                    {errors.manuscriptTitle && (
                      <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.manuscriptTitle}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-dark-brown font-merriweather font-medium mb-2">
                      Your Name <span className="text-eco-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.name ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
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
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.email ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                      } text-gray-700`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className={`flex-1 py-3 px-6 rounded-lg font-montserrat font-medium transition-all ${
                        isSubmitting
                          ? 'bg-gray-600 cursor-not-allowed text-white'
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
                        <span className="flex items-center justify-center">
                          <FaSearch className="mr-2" /> Submit
                        </span>
                      )}
                    </motion.button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-3 px-6 rounded-lg font-montserrat font-medium text-vibrant-green hover:text-eco-gold transition-colors"
                    >
                      Reset
                    </button>
                  </div>  
                </motion.form>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }, [formData, errors, isSubmitting, submitSuccess, handleChange, handleSubmit, handleReset]);

  // Memoized Footer component
  const Footer = useMemo(() => {
    return (
      <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block">About UJGSM</h3>
              <p className="text-sm">A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
            </div>
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block">Quick Links</h3>
              <div className="space-y-2">
                <p className="flex items-center"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Home</a></p>
                <p className="flex items-center"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Current Issue</a></p>
                <p className="flex items-center"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Archives</a></p>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block">Contact Us</h3>
              <div className="space-y-2">
                <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text-eco-gold transition-colors">contact@uorapublications.com</a></p>
                <p className="flex items-center"><FaPhone className="mr-2" /> +91-9766930707</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
              </div>
            </div>
          </div>
          <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
            <p>&copy; {new Date().getFullYear()} Universal Journal of Green SciTech & Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {MainContent}
          {Sidebar}
        </div>
      </main>
      {Footer}
    </div>
  );
};

export default TrackPaper;