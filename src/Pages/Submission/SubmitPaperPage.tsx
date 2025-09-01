import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPaperPlane, FaFileUpload, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface FormData {
  desiredIssue: string;
  manuscriptTitle: string;
  abstract: string;
  subjectArea: string;
  totalAuthors: string;
  correspondingAuthorName: string;
  correspondingAuthorMobile: string;
  correspondingAuthorEmail: string;
  correspondingAuthorDepartment: string;
  correspondingAuthorOrganization: string;
  whatsappNumber: string;
  city: string;
  state: string;
  country: string;
  authorType: string;
  authorCategory: string;
  numberOfPages: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const ManuscriptSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    desiredIssue: '',
    manuscriptTitle: '',
    abstract: '',
    subjectArea: '',
    totalAuthors: '',
    correspondingAuthorName: '',
    correspondingAuthorMobile: '',
    correspondingAuthorEmail: '',
    correspondingAuthorDepartment: '',
    correspondingAuthorOrganization: '',
    whatsappNumber: '',
    city: '',
    state: '',
    country: '',
    authorType: '',
    authorCategory: '',
    numberOfPages: '',
    agreeToTerms: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [activeSection, setActiveSection] = useState('manuscript-submission');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    const requiredFields: (keyof FormData)[] = [
      'desiredIssue', 'manuscriptTitle', 'abstract', 'subjectArea', 'totalAuthors',
      'correspondingAuthorName', 'correspondingAuthorMobile', 'correspondingAuthorEmail',
      'correspondingAuthorDepartment', 'correspondingAuthorOrganization', 'whatsappNumber',
      'city', 'country', 'authorType', 'authorCategory', 'numberOfPages',
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = 'This field is required';
      }
    });
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (formData.correspondingAuthorEmail && !emailRegex.test(formData.correspondingAuthorEmail)) {
      newErrors.correspondingAuthorEmail = 'Invalid email format';
    }
    
    const phoneRegex = /^\+\d{1,3}\d{9,12}$/;
    if (formData.correspondingAuthorMobile && !phoneRegex.test(formData.correspondingAuthorMobile)) {
      newErrors.correspondingAuthorMobile = 'Invalid mobile number format (e.g., +919876543210)';
    }
    if (formData.whatsappNumber && !phoneRegex.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Invalid WhatsApp number format (e.g., +919876543210)';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (!file) {
      newErrors.file = 'Manuscript file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, file]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  }, [errors]);

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
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });
    if (file) formDataToSend.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/submission', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed');
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 text-teal-800" />
          Submission successful!
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
      
      // Reset form after successful submission
      setFormData({
        desiredIssue: '',
        manuscriptTitle: '',
        abstract: '',
        subjectArea: '',
        totalAuthors: '',
        correspondingAuthorName: '',
        correspondingAuthorMobile: '',
        correspondingAuthorEmail: '',
        correspondingAuthorDepartment: '',
        correspondingAuthorOrganization: '',
        whatsappNumber: '',
        city: '',
        state: '',
        country: '',
        authorType: '',
        authorCategory: '',
        numberOfPages: '',
        agreeToTerms: false,
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
  }, [formData, file, validateForm]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('manuscript-submission');
      if (element && element.getBoundingClientRect().top <= 100) {
        setActiveSection('manuscript-submission');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, []);

  const Sidebar = useCallback(() => {
    const navItems = [
      { id: 'manuscript-submission', title: 'Manuscript Submission', icon: FaPaperPlane },
      { id: 'author-details', title: 'Author Details', icon: FaCompass },
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
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center transition-colors ${
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

  const Footer = useCallback(() => (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-eco-gold pb-2 inline-block">About UJGSM</h3>
            <p className="text-sm">A peer-reviewed, open-access journal publishing quality research across Science, Technology, Management, and allied disciplines.</p>
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
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> West Bengal, India</p>
            </div>
          </div>
        </div>
        <div className="copyright text-center pt-5 mt-5 border-t border-white/20 text-sm opacity-80">
          <p>&copy; 2025 Universal Journal of Green SciTech & Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  ), []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-teal-800 p-6">
                <h1 className="text-3xl font-merriweather font-bold flex items-center">
                  <FaPaperPlane className="mr-3" /> Manuscript Submission Form
                </h1>
                <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
                <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
              </div>
              
              <div className="p-6">
                <section id="manuscript-submission" className="guideline-section p-6 rounded-lg bg-white border border-teal-100">
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Desired Issue <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="desiredIssue"
                        value={formData.desiredIssue}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.desiredIssue ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      >
                        <option value="">Select Desired Issue</option>
                        <option value="Volume XIV Issue VII- July 2025-Open">Volume XIV Issue VII- July 2025-Open</option>
                      </select>
                      {errors.desiredIssue && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.desiredIssue}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Manuscript Title <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="manuscriptTitle"
                        value={formData.manuscriptTitle}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.manuscriptTitle ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      />
                      {errors.manuscriptTitle && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.manuscriptTitle}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Abstract <span className="text-eco-gold">*</span>
                      </label>
                      <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.abstract ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        placeholder="Add the abstract here"
                        required
                      ></textarea>
                      {errors.abstract && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.abstract}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Subject Area <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="subjectArea"
                        value={formData.subjectArea}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.subjectArea ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      />
                      {errors.subjectArea && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.subjectArea}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Total Authors <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="number"
                        name="totalAuthors"
                        value={formData.totalAuthors}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.totalAuthors ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      />
                      {errors.totalAuthors && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.totalAuthors}</p>
                      )}
                    </div>

                    <div id="author-details" className="border-t border-eco-gold/20 pt-6 mt-6">
                      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
                        <FaCompass className="mr-2" /> Corresponding Author Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            Corresponding Author Name <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorName"
                            value={formData.correspondingAuthorName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorName ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          {errors.correspondingAuthorName && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.correspondingAuthorName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            Corresponding Author Mobile No. <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorMobile"
                            value={formData.correspondingAuthorMobile}
                            onChange={handleInputChange}
                            placeholder="(Country Code)(Mobile No.)"
                            maxLength={15}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorMobile ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.correspondingAuthorMobile.length} / 15</p>
                          {errors.correspondingAuthorMobile && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.correspondingAuthorMobile}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            Corresponding Author Email <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="email"
                            name="correspondingAuthorEmail"
                            value={formData.correspondingAuthorEmail}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorEmail ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          {errors.correspondingAuthorEmail && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.correspondingAuthorEmail}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            Corresponding Author Department <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorDepartment"
                            value={formData.correspondingAuthorDepartment}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorDepartment ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          {errors.correspondingAuthorDepartment && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.correspondingAuthorDepartment}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            Corresponding Author's Organisation/College/University <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorOrganization"
                            value={formData.correspondingAuthorOrganization}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorOrganization ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          {errors.correspondingAuthorOrganization && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.correspondingAuthorOrganization}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            WhatsApp No. <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleInputChange}
                            placeholder="(Country Code)(Mobile No.)"
                            maxLength={15}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.whatsappNumber ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.whatsappNumber.length} / 15</p>
                          {errors.whatsappNumber && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.whatsappNumber}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            City <span className="text-eco-gold">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="E.g. Mumbai"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.city ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                            }`}
                            required
                          />
                          {errors.city && (
                            <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-dark-brown font-merriweather font-medium mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="E.g. Maharashtra"
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-dark-brown font-merriweather font-medium mb-2">
                          Country <span className="text-eco-gold">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                            errors.country ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                          }`}
                          required
                        >
                          <option value="">Select country</option>
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                          <option value="China">China</option>
                          <option value="Germany">Germany</option>
                          <option value="Japan">Japan</option>
                        </select>
                        {errors.country && (
                          <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Qualification <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="authorType"
                        value={formData.authorType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.authorType ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      >
                        <option value="">Select Author Type</option>
                        <option value="Post Graduate Student">Post Graduate Student</option>
                        <option value="Under Graduate Student">Under Graduate Student</option>
                        <option value="Doctoral Candidate/ PhD Student">Doctoral Candidate/ PhD Student</option>
                        <option value="Academician">Academician</option>
                        <option value="Industry Professional">Industry Professional</option>
                      </select>
                      {errors.authorType && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.authorType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Author Category <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="authorCategory"
                        value={formData.authorCategory}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.authorCategory ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      >
                        <option value="">Select Author Category</option>
                        <option value="New Author">New Author</option>
                        <option value="Ex IJLTEMAS Author">Ex IJLTEMAS Author</option>
                        <option value="Editorial Board Member">Editorial Board Member</option>
                        <option value="IJLTEMAS Reviewer">IJLTEMAS Reviewer</option>
                      </select>
                      {errors.authorCategory && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.authorCategory}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        No. of Pages <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfPages"
                        value={formData.numberOfPages}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        placeholder="No. of Pages"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.numberOfPages ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-300 focus:ring-vibrant-green hover:border-eco-gold'
                        }`}
                        required
                      />
                      {errors.numberOfPages && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.numberOfPages}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Upload Manuscript <span className="text-eco-gold">*</span>
                      </label>
                      <div className="flex items-center">
                        <label className="bg-vibrant-green hover:bg-eco-gold text-teal-800 hover:text-white font-montserrat font-medium py-2 px-4 rounded-lg cursor-pointer mr-4 transition-all duration-300">
                          <span className="flex items-center">
                            <FaFileUpload className="mr-2" /> Choose File
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".doc,.docx,.rtf"
                            required
                          />
                        </label>
                        <span className="text-gray-700 font-montserrat truncate max-w-xs">
                          {file ? file.name : 'No file chosen'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 font-montserrat">Format Allowed (doc, docx, rtf)</p>
                      {errors.file && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.file}</p>
                      )}
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="form-checkbox h-5 w-5 text-vibrant-green focus:ring-vibrant-green mt-1"
                          required
                        />
                        <span className="ml-2 text-gray-700 font-montserrat">
                          I agree with the Authors Declaration and to receive information regarding my submitted paper by signing up on UJGSM <span className="text-eco-gold">*</span>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.agreeToTerms}</p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`bg-green-200 hover:bg-eco-gold text-teal-800 font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" /> Submit
                          </>
                        )}
                      </motion.button>
                      <button
                        type="button"
                        className="text-vibrant-green hover:text-eco-gold font-montserrat font-medium transition-colors duration-200"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </motion.form>
                </section>
              </div>
            </div>
          </div>
          
          <Sidebar />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManuscriptSubmissionForm;