import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRocket, FaCheckCircle, FaExclamationCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone} from 'react-icons/fa';

interface NewsletterFormData {
  email: string;
}

interface NewsletterFormErrors {
  email?: string;
}

const UpcomingContent: React.FC = () => {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '' });
  const [errors, setErrors] = useState<NewsletterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('upcoming-content');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: NewsletterFormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ email: value });

    const fieldErrors: NewsletterFormErrors = {};
    if (!value.trim()) {
      fieldErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      fieldErrors.email = 'Email is invalid';
    }
    setErrors(fieldErrors);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        toast.error(
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2 text-red-600" />
            Please enter a valid email address.
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'bg-red-900/30 text-red-600 font-montserrat',
          }
        );
        return;
      }

      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);

      try {
        const response = await fetch('http://localhost:3000/subscribe', {
          method: 'POST',
          body: formDataToSend,
        });
        if (!response.ok) throw new Error('Failed to subscribe');
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="mr-2 text-teal-800" />
            Subscribed successfully! You'll receive updates soon.
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'bg-vibrant-green text-teal-800 font-montserrat',
            onClose: () => {
              setFormData({ email: '' });
              if (emailInputRef.current) emailInputRef.current.value = '';
            },
          }
        );
      } catch (error) {
        toast.error(
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2 text-red-600" />
            Failed to subscribe. Please try again or contact support.
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'bg-red-900/30 text-red-600 font-montserrat',
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const element = document.getElementById('upcoming-content');
        if (element && element.offsetTop <= window.scrollY + 100) {
          setActiveSection('upcoming-content');
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const Sidebar = useCallback(() => {
    const navItems = [{ id: 'upcoming-content', title: 'Upcoming Content', icon: FaRocket }];

    return (
      <div className="lg:col-span-1">
        <div className="bg-teal-800 p-6 rounded-lg shadow-md sticky top-6">
          <h2 className="text-vibrant-green mb-4 flex items-center font-merriweather">
            <FaCompass className="mr-2" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center transition-colors font-montserrat ${
                    activeSection === item.id
                      ? 'bg-vibrant-green text-white'
                      : 'text-dark-brown hover:bg-teal-700 hover:text-white'
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
            <h3 className="text-vibrant-green font-medium mb-2 font-merriweather">Need Help?</h3>
            <p className="text-sm text-white font-montserrat">
              Contact us at{' '}
              <a href="mailto:contact@uorapublications.com" className="text-eco-gold hover:underline">
                contact@uorapublications.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }, [activeSection, scrollToSection]);

  const Footer = useCallback(() => (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block font-merriweather">
              About UJGSM
            </h3>
            <p className="text-sm font-montserrat">
              A peer-reviewed, open-access journal publishing quality research across Science, Technology,
              Management, and allied disciplines.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block font-merriweather">
              Quick Links
            </h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaHome className="mr-2" />{' '}
                <a href="#" className="text-white hover:text-eco-gold transition-colors font-montserrat">
                  Home
                </a>
              </p>
              <p className="flex items-center">
                <FaBook className="mr-2" />{' '}
                <a href="#" className="text-white hover:text-eco-gold transition-colors font-montserrat">
                  Current Issue
                </a>
              </p>
              <p className="flex items-center">
                <FaArchive className="mr-2" />{' '}
                <a href="#" className="text-white hover:text-eco-gold transition-colors font-montserrat">
                  Archives
                </a>
              </p>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block font-merriweather">
              Contact Us
            </h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaEnvelope className="mr-2" />{' '}
                <a
                  href="mailto:contact@uorapublications.com"
                  className="text-white hover:text-eco-gold transition-colors font-montserrat"
                >
                  contact@uorapublications.com
                </a>
              </p>
              <p className="flex items-center font-montserrat">
                <FaPhone className="mr-2" /> +91-9766930707
              </p>
              <p className="flex items-center font-montserrat">
                <FaMapMarkerAlt className="mr-2" /> West Bengal, India
              </p>
            </div>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80 font-montserrat">
          <p>&copy; 2025 Universal Journal of Green Sci-Tech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  ), []);

  const MainContent = useCallback(() => (
    <main id="primary" className="lg:col-span-3">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pb-article pb-singular"
      >
        <header className="entry-header mb-10 text-center bg-gradient-to-r from-teal-500 to-green-500 text-white  p-6 rounded-t-lg">
          <h1 className="entry-title text-4xl font-merriweather font-bold flex items-center justify-center">
            <FaRocket className="mr-3" /> Upcoming Content
          </h1>
          <p className="mt-3 text-lg font-montserrat">
            We’re working hard to bring fresh updates soon!
          </p>
        </header>

        <div className="pb-content space-y-10 p-6 bg-white rounded-b-lg shadow-md border border-teal-100">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-500 p-6 rounded-r-xl shadow-sm"
          >
            <h2 className="text-2xl font-merriweather font-semibold text-dark-brown mb-2">
              Stay Tuned for Exciting New Content
            </h2>
            <p className="text-dark-brown font-montserrat">
              Our team is preparing the latest research, articles, and announcements. Be sure to check back often for updates.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            id="upcoming-content"
          >
            {/* <div className="bg-white p-6 rounded-lg shadow-md border border-teal-300 hover:shadow-lg transition">
              <h3 className="text-xl font-merriweather font-semibold text-teal-800 mb-4">
                📚 Upcoming Special Issues
              </h3>
              <ul className="space-y-3 text-dark-brown font-montserrat">
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaCalendarAlt />
                  </span>
                  <span>Advanced Materials Research - April 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaGlobe />
                  </span>
                  <span>Environmental Sustainability - August 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaFileAlt />
                  </span>
                  <span>AI in Scientific Research - December 2025</span>
                </li>
              </ul>
            </div> */}

            {/* <div className="bg-white p-6 rounded-lg shadow-md border border-teal-300 hover:shadow-lg transition">
              <h3 className="text-xl font-merriweather font-semibold text-teal-800 mb-4">
                🎤 Upcoming Events
              </h3>
              <ul className="space-y-3 text-dark-brown font-montserrat">
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaCalendarAlt />
                  </span>
                  <span>International Conference on Experimental Research - March 15-17, 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaFileAlt />
                  </span>
                  <span>Workshop on Research Methodology - May 22, 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-vibrant-green text-white rounded-full p-2 mr-3">
                    <FaGlobe />
                  </span>
                  <span>Call for Papers: Climate Change Research - Deadline July 30, 2025</span>
                </li>
              </ul>
            </div> */}
          </motion.section>

          {/* <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-teal-300"
          >
            <h2 className="text-2xl font-merriweather font-semibold text-dark-brown mb-4">
              📅 Submission Deadlines
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-teal-300">
                <thead className="bg-vibrant-green text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-montserrat">Volume</th>
                    <th className="py-3 px-4 text-left font-montserrat">Publishing Date</th>
                    <th className="py-3 px-4 text-left font-montserrat">Submission Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-dark-brown font-montserrat">
                  <tr className="border-b hover:bg-green-50">
                    <td className="py-3 px-4">Volume 42</td>
                    <td className="py-3 px-4">April 30, 2025</td>
                    <td className="py-3 px-4">March 20, 2025</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="py-3 px-4">Volume 43</td>
                    <td className="py-3 px-4">August 30, 2025</td>
                    <td className="py-3 px-4">July 20, 2025</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="py-3 px-4">Volume 44</td>
                    <td className="py-3 px-4">December 30, 2025</td>
                    <td className="py-3 px-4">November 20, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section> */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-md border border-teal-300"
          >
            <h2 className="text-2xl font-merriweather font-semibold text-dark-brown mb-4">
              📬 Stay Updated
            </h2>
            <p className="text-dark-brown mb-4 font-montserrat">
              Subscribe to our newsletter for updates on new content, calls for papers, and events.
            </p>
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-grow">
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                    errors.email
                      ? 'border-red-600 focus:ring-red-600/30'
                      : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.email}</p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`px-6 py-3 rounded-lg font-montserrat font-medium transition-all flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed text-white'
                    : 'bg-green-400 hover:bg-eco-gold text-teal-800 hover:text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="mr-2" /> Subscribe
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.section>
        </div>
      </motion.article>
    </main>
  ), [formData, errors, isSubmitting, handleChange, handleSubmit]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
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

export default UpcomingContent;