import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
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
  adminRemarks: string;
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
  const [isLoading, setIsLoading] = useState(false);
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
    
    setIsLoading(true);
    try {
      // First try to find by manuscript ID and email
      const response = await axios.get<TrackData[]>(
        `${API_URL}/submission?manuscriptId=${formData.manuscriptId}&email=${encodeURIComponent(formData.email)}`
      );
      
      if (response.data && response.data.length > 0) {
        setTrackData(response.data[0]);
        setSubmitSuccess(true);
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="mr-2 text-green-500" />
            Tracking information found!
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            className: 'bg-green-100 text-teal-800 font-montserrat',
          }
        );
      } else {
        // If not found, try with just the manuscript ID (for older submissions)
        const altResponse = await axios.get<TrackData>(
          `${API_URL}/submission/${formData.manuscriptId}`
        ).catch(() => null);
        
        if (altResponse && altResponse.data) {
          setTrackData(altResponse.data);
          setSubmitSuccess(true);
          toast.success(
            <div className="flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" />
              Tracking information found!
            </div>,
            {
              position: 'top-right',
              autoClose: 3000,
              className: 'bg-green-100 text-teal-800 font-montserrat',
            }
          );
        } else {
          setTrackData(null);
          toast.error(
            <div className="flex items-center">
              <FaExclamationCircle className="mr-2 text-red-600" />
              No submission found with these details
            </div>,
            {
              position: 'top-right',
              autoClose: 3000,
              className: 'bg-red-100 text-teal-800 font-montserrat',
            }
          );
        }
      }
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
            className: 'bg-red-100 text-teal-800 font-montserrat',
          }
        );
      }
    } finally {
      setIsLoading(false);
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
          className: 'bg-red-100 text-teal-800 font-montserrat',
        }
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      await fetchTrackStatus();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to track manuscript. Please try again.';
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-600" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          className: 'bg-red-100 text-teal-800 font-montserrat',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, fetchTrackStatus]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600';
      case 'under_review': return 'text-yellow-600';
      case 'revision_required': return 'text-orange-600';
      case 'accepted': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'revision_required': return 'Revision Required';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

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
                  className="p-6 bg-teal-100 border border-teal-200 rounded-xl"
                >
                  <div className="text-center mb-4">
                    <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-2" />
                    <h3 className="text-xl font-merriweather font-semibold text-green-500">Manuscript Tracking Status</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Manuscript ID:</span> UJGSM-{trackData.id.toString().padStart(3, '0')}
                      </p>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Title:</span> {trackData.manuscriptTitle}
                      </p>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Author:</span> {trackData.name}
                      </p>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Email:</span> {trackData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Status:</span>{" "}
                        <span className={`font-bold ${getStatusColor(trackData.status)}`}>
                          {getStatusText(trackData.status)}
                        </span>
                      </p>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Submitted:</span> {new Date(trackData.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-semibold">Last Updated:</span> {new Date(trackData.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {trackData.adminRemarks && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">Admin Remarks:</h4>
                      <p className="text-gray-700 font-montserrat">{trackData.adminRemarks}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={handleReset}
                    className="mt-6 w-full py-2 px-4 bg-teal-600 text-white rounded-lg font-montserrat font-medium hover:bg-teal-700 transition-colors"
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
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                        errors.manuscriptId ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                      } text-gray-700`}
                      placeholder="Enter your manuscript ID (e.g., UJGSM-001)"
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
                      {isSubmitting || isLoading ? (
                        <div className="flex items-center justify-center">
                          <FaSpinner className="animate-spin mr-2" />
                          {isLoading ? 'Searching...' : 'Processing...'}
                        </div>
                      ) : (
                        <span className="flex items-center justify-center">
                          <FaSearch className="mr-2" /> Track Paper
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
  }, [formData, errors, isSubmitting, isLoading, submitSuccess, trackData, handleChange, handleSubmit, handleReset]);

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