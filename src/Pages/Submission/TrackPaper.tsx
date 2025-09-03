import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

interface FormData {
  manuscriptId: string;
  manuscriptTitle: string;
  name: string;
  email: string;
}

interface TrackData {
  id: number;
  manuscriptId: string;
  manuscriptTitle: string;
  name: string;
  email: string;
  status: string;
  remarks: string;
  createdAt: string;
  updatedAt: string;
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

  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('track-paper');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const fetchTrackStatus = useCallback(async () => {
    if (!formData.manuscriptId || !formData.email) return;
    try {
      const response = await axios.get<TrackData>(
        `${API_URL}/submission/manuscript/${formData.manuscriptId}/${encodeURIComponent(formData.email)}`
      );
      setTrackData(response.data);
      setSubmitSuccess(true);
    } catch (error: any) {
      setTrackData(null);
      if (error.response?.status !== 404) {
        toast.error(
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2 text-red-600" />
            {error.response?.data?.message || 'Failed to fetch tracking status'}
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'bg-red-100 text-teal-800 font-montserrat',
          }
        );
      }
    }
  }, [formData.manuscriptId, formData.email, API_URL]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-600" />
          Please fill all required fields correctly.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-100 text-teal-800 font-montserrat',
        }
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post<{ message: string; track: TrackData }>(
        `${API_URL}/submission`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTrackData(response.data.track);
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          {response.data.message}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-green-100 text-teal-800 font-montserrat',
        }
      );
      setSubmitSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to submit track request. Please try again.';
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-600" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-100 text-teal-800 font-montserrat',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, API_URL]);

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

  const Sidebar = useMemo(() => {
    const navItems = [{ id: 'track-paper', title: 'Track Paper', icon: FaSearch }];
    return (
      <div className="lg:col-span-1">
        <div className="bg-teal-800 p-6 rounded-lg shadow-md sticky top-6">
          <h2 className="text-green-400 mb-4 flex items-center">
            <FaCompass className="mr-2" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center transition-colors ${
                    activeSection === item.id ? 'bg-green-500 text-white' : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <item.icon className="mr-2" />
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-teal-900 rounded-lg">
            <h3 className="text-green-400 font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-white">
              Contact us at{" "}
              <a href="mailto:contact@uorapublications.com" className="text-green-400 hover:underline">
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
    setTrackData(null);
    setSubmitSuccess(false);
  }, []);

  const MainContent = useMemo(() => {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6">
            <h1 className="text-3xl font-merriweather font-bold flex items-center">
              <FaSearch className="mr-3" /> Track Your Paper
            </h1>
            <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
            <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – September 2025</p>
          </div>
          <div className="p-6">
            <section id="track-paper" className="guideline-section p-6 rounded-lg bg-white hover:bg-green-50 transition-all duration-300">
              {submitSuccess && trackData ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-teal-100 border border-teal-200 rounded-xl text-center"
                >
                  <FaCheckCircle className="text-4xl text-green-500 mb-4" />
                  <h3 className="text-xl font-merriweather fontlaw-semibold text-green-500 mb-2">Track Request Status</h3>
                  <p className="text-gray-700 font-montserrat mb-2">
                    Manuscript ID: <strong>{trackData.id}</strong>
                  </p>
                  <p className="text-gray-700 font-montserrat mb-2">
                    Title: <strong>{trackData.manuscriptTitle}</strong>
                  </p>
                  <p className="text-gray-700 font-montserrat mb-2">
                    Status: <strong className={
                      trackData.status === 'Received' ? 'text-green-500' :
                      trackData.status === 'Rejected' ? 'text-red-600' :
                      trackData.status === 'Revision' ? 'text-yellow-500' :
                      trackData.status === 'Correction' ? 'text-orange-500' :
                      trackData.status === "Under Review" ? 'text-shadow-sky-600' :
                      'text-blue-500'
                    }>{trackData.status}</strong>
                  </p>
                  {trackData.remarks && (
                    <p className="text-gray-700 font-montserrat mb-2">
                      Admin Remarks: <strong>{trackData.remarks}</strong>
                    </p>
                  )}
                  <p className="text-gray-700 font-montserrat">
                    Last Updated: <strong>{new Date(trackData.updatedAt).toLocaleDateString()}</strong>
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 py-2 px-4 rounded-lg font-montserrat font-medium text-green-500 hover:text-teal-800 transition-colors"
                  >
                    Track Another Paper
                  </button>
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
                    <label htmlFor="manuscriptId" className="block text-teal-800 font-merriweather font-medium mb-2">
                      Unique Manuscript ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="manuscriptId"
                      name="manuscriptId"
                      value={formData.manuscriptId}
                      onChange={handleChange}
                      onBlur={fetchTrackStatus}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.manuscriptId ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                      } text-gray-700`}
                      placeholder="Enter your manuscript ID"
                      disabled={isSubmitting}
                    />
                    {errors.manuscriptId && (
                      <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.manuscriptId}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="manuscriptTitle" className="block text-teal-800 font-merriweather font-medium mb-2">
                      Manuscript Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="manuscriptTitle"
                      name="manuscriptTitle"
                      value={formData.manuscriptTitle}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.manuscriptTitle ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                      } text-gray-700`}
                      placeholder="Enter your manuscript title"
                      disabled={isSubmitting}
                    />
                    {errors.manuscriptTitle && (
                      <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.manuscriptTitle}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-teal-800 font-merriweather font-medium mb-2">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.name ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                      } text-gray-700`}
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-teal-800 font-merriweather font-medium mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={fetchTrackStatus}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.email ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                      } text-gray-700`}
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.email}</p>
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
                          : 'bg-green-500 hover:bg-teal-800 text-white'
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
                      className="flex-1 py-3 px-6 rounded-lg font-montserrat font-medium text-green-500 hover:text-teal-800 transition-colors"
                      disabled={isSubmitting}
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
  }, [formData, errors, isSubmitting, submitSuccess, trackData, handleChange, handleSubmit, handleReset, fetchTrackStatus]);

  const Footer = useMemo(() => {
    return (
      <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-10 mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">About UJGSM</h3>
              <p className="text-sm">A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
            </div>
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Quick Links</h3>
              <div className="space-y-2">
                <p className="flex items-center"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text-green-400 transition-colors">Home</a></p>
                <p className="flex items-center"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text-green-400 transition-colors">Current Issue</a></p>
                <p className="flex items-center"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text-green-400 transition-colors">Archives</a></p>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="text-xl mb-5 border-b-2 border-green-400 pb-2 inline-block">Contact Us</h3>
              <div className="space-y-2">
                <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text-green-400 transition-colors">contact@uorapublications.com</a></p>
                <p className="flex items-center"><FaPhone className="mr-2" /> +91-9766930707</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
              </div>
            </div>
          </div>
          <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
            <p>&copy; 2025 Universal Journal of Green SciTech & Management. All rights reserved.</p>
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