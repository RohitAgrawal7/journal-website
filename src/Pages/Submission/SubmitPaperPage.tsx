import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPaperPlane, FaFileUpload, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

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
  agreeToTerms: string;
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
    agreeToTerms: 'false',
  });

  const [manuscript, setFile] = useState<File | null>(null);
  const [activeSection, setActiveSection] = useState('manuscript-submission');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://journal-backend-production-b8f2.up.railway.app:3000';

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    const requiredFields: (keyof FormData)[] = [
      'desiredIssue', 'manuscriptTitle', 'abstract', 'subjectArea', 'totalAuthors',
      'correspondingAuthorName', 'correspondingAuthorMobile', 'correspondingAuthorEmail',
      'correspondingAuthorDepartment', 'correspondingAuthorOrganization', 'whatsappNumber',
      'city', 'country', 'authorType', 'authorCategory', 'numberOfPages',
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
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
    
    if (formData.totalAuthors && !/^\d+$/.test(formData.totalAuthors)) {
      newErrors.totalAuthors = 'Must be a number';
    }
    if (formData.numberOfPages && !/^\d+$/.test(formData.numberOfPages)) {
      newErrors.numberOfPages = 'Must be a number';
    }
    
    if (formData.agreeToTerms !== 'true') {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (!manuscript) {
      newErrors.manuscript = 'Manuscript file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, manuscript]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'true' : 'false') : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.match(/\.(doc|docx|rtf)$/i)) {
        toast.error('Only .doc, .docx, .rtf files allowed!');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit!');
        return;
      }
      setFile(selectedFile);
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  }, [errors]);

  console.log('Submitting data:', {
  ...formData,
  manuscript: manuscript ? manuscript.name : 'No file'
});

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-800" />
          Please fill all required fields correctly.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-900/30 text-red-800 font-montserrat',
        }
      );
      return;
    }
    
    setIsSubmitting(true);
    setUploadProgress(0);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (manuscript) formDataToSend.append('manuscript', manuscript);

    try {
      const response = await axios.post(`${API_URL}/submission`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        },
      });
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 text-green-800" />
          Submission successful! ID: {response.data.submission.id}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-green-900/30 text-green-800 font-montserrat',
        }
      );
      
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
        agreeToTerms: 'false',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Submission failed. Please try again.';
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-800" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-900/30 text-red-800 font-montserrat',
        }
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }, [formData, manuscript, validateForm, API_URL]);

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
          <h2 className="text-green-500 mb-4 flex items-center">
            <FaCompass className="mr-2" /> Quick Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md flex items-center transition-colors ${
                    activeSection === item.id 
                      ? 'bg-green-500 text-white' 
                      : 'text-teal-100 hover:bg-teal-700 hover:text-white'
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
            <h3 className="text-green-500 font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-teal-100">
              Contact us at{" "}
              <a href="mailto:contact@uorapublications.com" className="text-green-500 hover:underline">
                contact@uorapublications.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }, [activeSection, scrollToSection]);

  const Footer = useCallback(() => (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-900 pb-2 inline-block">About UJGSM</h3>
            <p className="text-sm">A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-900 pb-2 inline-block">Quick Links</h3>
            <div className="space-y-2">
              <p className="flex items-center"><FaHome className="mr-2" /> <a href="#" className="text-white hover:text-green-500 transition-colors">Home</a></p>
              <p className="flex items-center"><FaBook className="mr-2" /> <a href="#" className="text-white hover:text-green-500 transition-colors">Current Issue</a></p>
              <p className="flex items-center"><FaArchive className="mr-2" /> <a href="#" className="text-white hover:text-green-500 transition-colors">Archives</a></p>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-teal-900 pb-2 inline-block">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="mailto:contact@uorapublications.com" className="text-white hover:text-green-500 transition-colors">contact@uorapublications.com</a></p>
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
  ), []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-800 to-green-500 text-white p-6">
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
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Desired Issue <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="desiredIssue"
                        value={formData.desiredIssue}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.desiredIssue ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Desired Issue</option>
                        <option value="Volume XIV Issue VII- July 2025-Open">Vol-I Issue-II, Sept-Oct (Open)</option>
                        {/* <option value="Volume XIV Issue IX- September 2025-Open">Volume XIV Issue IX- September 2025-Open</option> */}
                      </select>
                      {errors.desiredIssue && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.desiredIssue}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Manuscript Title <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="manuscriptTitle"
                        value={formData.manuscriptTitle}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.manuscriptTitle ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      />
                      {errors.manuscriptTitle && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.manuscriptTitle}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Abstract <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.abstract ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        placeholder="Add the abstract here"
                        required
                        disabled={isSubmitting}
                      ></textarea>
                      {errors.abstract && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.abstract}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Subject Area <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="subjectArea"
                        value={formData.subjectArea}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.subjectArea ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      />
                      {errors.subjectArea && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.subjectArea}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Total Authors <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="totalAuthors"
                        value={formData.totalAuthors}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.totalAuthors ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      />
                      {errors.totalAuthors && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.totalAuthors}</p>
                      )}
                    </div>

                    <div id="author-details" className="border-t border-teal-200 pt-6 mt-6">
                      <h2 className="text-xl font-merriweather text-green-500 mb-4 flex items-center">
                        <FaCompass className="mr-2" /> Corresponding Author Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            Corresponding Author Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorName"
                            value={formData.correspondingAuthorName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorName ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          {errors.correspondingAuthorName && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.correspondingAuthorName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            Corresponding Author Mobile No. <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorMobile"
                            value={formData.correspondingAuthorMobile}
                            onChange={handleInputChange}
                            placeholder="(Country Code)(Mobile No.)"
                            maxLength={15}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorMobile ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.correspondingAuthorMobile.length} / 15</p>
                          {errors.correspondingAuthorMobile && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.correspondingAuthorMobile}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            Corresponding Author Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="email"
                            name="correspondingAuthorEmail"
                            value={formData.correspondingAuthorEmail}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorEmail ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          {errors.correspondingAuthorEmail && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.correspondingAuthorEmail}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            Corresponding Author Department <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorDepartment"
                            value={formData.correspondingAuthorDepartment}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorDepartment ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          {errors.correspondingAuthorDepartment && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.correspondingAuthorDepartment}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            Corresponding Author's Organisation/College/University <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="correspondingAuthorOrganization"
                            value={formData.correspondingAuthorOrganization}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.correspondingAuthorOrganization ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          {errors.correspondingAuthorOrganization && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.correspondingAuthorOrganization}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            WhatsApp No. <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleInputChange}
                            placeholder="(Country Code)(Mobile No.)"
                            maxLength={15}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.whatsappNumber ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.whatsappNumber.length} / 15</p>
                          {errors.whatsappNumber && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.whatsappNumber}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            City <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="E.g. Mumbai"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                              errors.city ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                            }`}
                            required
                            disabled={isSubmitting}
                          />
                          {errors.city && (
                            <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-teal-900 font-merriweather font-medium mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="E.g. Maharashtra"
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-teal-800 font-montserrat transition-colors"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-teal-900 font-merriweather font-medium mb-2">
                          Country <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                            errors.country ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                          }`}
                          required
                          disabled={isSubmitting}
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
                          <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Author Type <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="authorType"
                        value={formData.authorType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.authorType ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Author Type</option>
                        <option value="Post Graduate Student">Post Graduate Student</option>
                        <option value="Under Graduate Student">Under Graduate Student</option>
                        <option value="Doctoral Candidate/ PhD Student">Doctoral Candidate/ PhD Student</option>
                        <option value="Academician">Academician</option>
                        <option value="Industry Professional">Industry Professional</option>
                      </select>
                      {errors.authorType && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.authorType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Author Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="authorCategory"
                        value={formData.authorCategory}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.authorCategory ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Author Category</option>
                        <option value="New Author">New Author</option>
                        <option value="Ex IJLTEMAS Author">UJGSM Author</option>
                        <option value="Editorial Board Member">Editorial Board Member</option>
                        <option value="IJLTEMAS Reviewer">UJGSM Reviewer</option>
                      </select>
                      {errors.authorCategory && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.authorCategory}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        No. of Pages <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="numberOfPages"
                        value={formData.numberOfPages}
                        onChange={handleInputChange}
                        placeholder="No. of Pages"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
                          errors.numberOfPages ? 'border-red-600 focus:ring-red-600/30' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                        }`}
                        required
                        disabled={isSubmitting}
                      />
                      {errors.numberOfPages && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.numberOfPages}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-900 font-merriweather font-medium mb-2">
                        Upload Manuscript <span className="text-red-600">*</span>
                      </label>
                      <div className="flex items-center">
                        <label className="bg-green-500 hover:bg-teal-800 text-white hover:text-white font-montserrat font-medium py-2 px-4 rounded-lg cursor-pointer mr-4 transition-all duration-300">
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
                            disabled={isSubmitting}
                          />
                        </label>
                        <span className="text-gray-700 font-montserrat truncate max-w-xs">
                          {manuscript ? manuscript.name : 'No file chosen'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 font-montserrat">Format Allowed (doc, docx, rtf)</p>
                      {errors.manuscript && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.manuscript}</p>
                      )}
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms === 'true'}
                          onChange={handleInputChange}
                          className="form-checkbox h-5 w-5 text-green-500 focus:ring-green-500 mt-1"
                          required
                          disabled={isSubmitting}
                        />
                        <span className="ml-2 text-gray-700 font-montserrat">
                          I agree with the Authors Declaration and to receive information regarding my submitted paper by signing up on UJGSM <span className="text-red-600">*</span>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.agreeToTerms}</p>
                      )}
                    </div>

                    {isSubmitting && uploadProgress > 0 && (
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`bg-green-500 hover:bg-teal-800 text-white font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                        className="text-green-500 hover:text-teal-800 font-montserrat font-medium transition-colors duration-200"
                        disabled={isSubmitting}
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