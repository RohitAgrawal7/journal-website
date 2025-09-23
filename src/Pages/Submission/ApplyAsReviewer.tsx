import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCheck, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

interface FormData {
  salutation: string;
  fullName: string;
  gender: string;
  currentEmployment: string;
  totalExperience: string;
  educationalQualifications: string;
  researchAreas: string[];
  institutionalEmail: string;
  personalEmail: string;
  mobileNo: string;
  whatsappNo: string;
  city: string;
  country: string;
  internationalPublications: string;
  howFoundUs: string;
  cv: File | null;
  firstReferenceName: string;
  firstReferenceEmail: string;
  firstReferenceOrg: string;
  firstReferenceMobile: string;
  secondReferenceName: string;
  secondReferenceEmail: string;
  secondReferenceOrg: string;
  secondReferenceMobile: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const ApplyAsReviewer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    salutation: '',
    fullName: '',
    gender: 'Male',
    currentEmployment: '',
    totalExperience: '0',
    educationalQualifications: '',
    researchAreas: ['', '', '', '', '', '', '', ''],
    institutionalEmail: '',
    personalEmail: '',
    mobileNo: '',
    whatsappNo: '',
    city: '',
    country: '',
    internationalPublications: '0',
    howFoundUs: '',
    cv: null,
    firstReferenceName: '',
    firstReferenceEmail: '',
    firstReferenceOrg: '',
    firstReferenceMobile: '',
    secondReferenceName: '',
    secondReferenceEmail: '',
    secondReferenceOrg: '',
    secondReferenceMobile: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('apply-as-reviewer');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    const requiredFields: (keyof FormData)[] = [
      'salutation', 'fullName', 'gender', 'currentEmployment', 
      'educationalQualifications', 'institutionalEmail', 'personalEmail',
      'mobileNo', 'whatsappNo', 'city', 'country', 'howFoundUs',
      'firstReferenceName', 'firstReferenceEmail', 'firstReferenceOrg', 'firstReferenceMobile',
      'secondReferenceName', 'secondReferenceEmail', 'secondReferenceOrg', 'secondReferenceMobile',
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = 'This field is required';
      }
    });
    
    for (let i = 0; i < 4; i++) {
      if (!formData.researchAreas[i] || formData.researchAreas[i].trim() === '') {
        newErrors[`researchArea-${i}`] = 'Research area is required';
      }
    }
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (formData.institutionalEmail && !emailRegex.test(formData.institutionalEmail)) {
      newErrors.institutionalEmail = 'Invalid email format';
    }
    
    if (formData.personalEmail && !emailRegex.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Invalid email format';
    }
    
    if (formData.firstReferenceEmail && !emailRegex.test(formData.firstReferenceEmail)) {
      newErrors.firstReferenceEmail = 'Invalid email format';
    }
    
    if (formData.secondReferenceEmail && !emailRegex.test(formData.secondReferenceEmail)) {
      newErrors.secondReferenceEmail = 'Invalid email format';
    }
    
    const phoneRegex = /^\+\d{1,3}\d{9,12}$/;
    if (formData.mobileNo && !phoneRegex.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Invalid mobile number format (e.g., +919876543210)';
    }
    if (formData.whatsappNo && !phoneRegex.test(formData.whatsappNo)) {
      newErrors.whatsappNo = 'Invalid WhatsApp number format (e.g., +919876543210)';
    }
    if (formData.firstReferenceMobile && !phoneRegex.test(formData.firstReferenceMobile)) {
      newErrors.firstReferenceMobile = 'Invalid mobile number format';
    }
    if (formData.secondReferenceMobile && !phoneRegex.test(formData.secondReferenceMobile)) {
      newErrors.secondReferenceMobile = 'Invalid mobile number format';
    }
    
    if (!formData.cv) {
      newErrors.cv = 'CV is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('researchArea-')) {
      const index = parseInt(name.split('-')[1]);
      setFormData(prev => {
        const newResearchAreas = [...prev.researchAreas];
        newResearchAreas[index] = value;
        return { ...prev, researchAreas: newResearchAreas };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.match(/\.(doc|docx|pdf|rtf)$/i)) {
        toast.error('Only .doc, .docx, .pdf, .rtf files allowed!');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit!');
        return;
      }
      setFormData(prev => ({ ...prev, cv: selectedFile }));
      if (errors.cv) {
        setErrors(prev => ({ ...prev, cv: '' }));
      }
    }
  }, [errors]);

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
    setUploadProgress(0);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'researchAreas') {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (key !== 'cv') {
        formDataToSend.append(key, value as string);
      }
    });
    if (formData.cv) formDataToSend.append('cv', formData.cv);

    try {
      const response = await axios.post(`${API_URL}/reviewer`, formDataToSend, {
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
          <FaCheckCircle className="mr-2 text-green-500" />
          Application submitted successfully! ID: {response.data.application.id}
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
      setTimeout(() => {
        setFormData({
          salutation: '',
          fullName: '',
          gender: 'Male',
          currentEmployment: '',
          totalExperience: '0',
          educationalQualifications: '',
          researchAreas: ['', '', '', '', '', '', '', ''],
          institutionalEmail: '',
          personalEmail: '',
          mobileNo: '',
          whatsappNo: '',
          city: '',
          country: '',
          internationalPublications: '0',
          howFoundUs: '',
          cv: null,
          firstReferenceName: '',
          firstReferenceEmail: '',
          firstReferenceOrg: '',
          firstReferenceMobile: '',
          secondReferenceName: '',
          secondReferenceEmail: '',
          secondReferenceOrg: '',
          secondReferenceMobile: '',
          agreeToTerms: false,
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Submission failed. Please try again.';
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-600" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-100 text-teal-800 font-montserrat',
        }
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }, [formData, validateForm, API_URL]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('apply-as-reviewer');
      if (element && element.getBoundingClientRect().top <= 100) {
        setActiveSection('apply-as-reviewer');
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

  const Sidebar = useMemo(() => {
    const navItems = [
      { id: 'apply-as-reviewer', title: 'Apply as Reviewer', icon: FaUserCheck },
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
        </div>
      </div>
    );
  }, [activeSection, scrollToSection]);

  const Footer = useMemo(() => (
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

  // Form Input Component
  const FormInput = useCallback(({ 
    label, name, type = 'text', value, onChange, error, placeholder, required = false, 
    options, textarea = false, min, max, ...props 
  }: {
    label: string;
    name: string;
    type?: string;
    value: any;
    onChange: (e: any) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    textarea?: boolean;
    min?: string;
    max?: string;
    [key: string]: any;
  }) => {
    const InputComponent = textarea ? 'textarea' : 'input';
    
    return (
      <div>
        <label className="block text-teal-900 font-merriweather font-medium mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
              error ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
            }`}
            {...props}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <InputComponent
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-montserrat transition-colors ${
              error ? 'border-red-600 focus:ring-red-300' : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
            }`}
            placeholder={placeholder}
            rows={textarea ? 4 : undefined}
            min={min}
            max={max}
            {...props}
          />
        )}
        {error && (
          <p className="mt-1 text-red-600 text-sm font-montserrat">{error}</p>
        )}
      </div>
    );
  }, []);

  const MainContent = useMemo(() => (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6">
          <h1 className="text-3xl font-merriweather font-bold flex items-center">
            <FaUserCheck className="mr-3" /> Apply as Reviewer
          </h1>
          <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
          <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
        </div>
        <div className="p-6">
          <section id="apply-as-reviewer" className="p-6 rounded-lg bg-white border border-teal-100">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-teal-100 border border-teal-200 rounded-xl text-center"
              >
                <FaCheckCircle className="text-4xl text-green-500 mb-4" />
                <h3 className="text-xl font-merriweather font-semibold text-green-500 mb-2">Application Submitted!</h3>
                <p className="text-gray-700 font-montserrat">
                  Thank you for applying to become a reviewer. We'll review your application and get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                ref={formRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-merriweather text-green-500 border-b border-teal-200 pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Salutation" name="salutation" value={formData.salutation} onChange={handleChange} error={errors.salutation} options={[
                      { value: 'Dr.', label: 'Dr.' },
                      { value: 'Mr.', label: 'Mr.' },
                      { value: 'Mrs.', label: 'Mrs.' },
                      { value: 'Ms.', label: 'Ms.' },
                    ]} required />
                    <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <label className="block text-teal-900 font-merriweather font-medium mb-2">
                      Gender <span className="text-red-600">*</span>
                    </label>
                    <div className="flex space-x-4">
                      {['Male', 'Female', 'Other'].map(gender => (
                        <label key={gender} className="flex items-center text-gray-700 font-montserrat">
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={handleChange}
                            className="mr-2 form-radio text-green-500 focus:ring-green-500"
                            disabled={isSubmitting}
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                    {errors.gender && <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.gender}</p>}
                  </div>
                  <FormInput label="Current Employment (College/University/Organization)" name="currentEmployment" value={formData.currentEmployment} onChange={handleChange} error={errors.currentEmployment} placeholder="Enter your current employment" required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Total Experience (Years)" name="totalExperience" type="number" value={formData.totalExperience} onChange={handleChange} error={errors.totalExperience} min="0" max="50" required />
                    <FormInput label="International Publications" name="internationalPublications" type="number" value={formData.internationalPublications} onChange={handleChange} error={errors.internationalPublications} min="0" max="500" required />
                  </div>
                  <FormInput label="Educational Qualifications" name="educationalQualifications" value={formData.educationalQualifications} onChange={handleChange} error={errors.educationalQualifications} placeholder="Enter your educational qualifications" textarea required />
                </div>

                {/* Research Areas */}
                <div className="space-y-6">
                  <h3 className="text-xl font-merriweather text-green-500 border-b border-teal-200 pb-2">Research Areas</h3>
                  <p className="text-gray-600 text-sm font-montserrat">You can mention multiple research areas in which you are willing to review the paper</p>
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.researchAreas.map((area, index) => (
                      <FormInput key={index} label={`Research Area ${index + 1}`} name={`researchArea-${index}`} value={area} onChange={handleChange} error={errors[`researchArea-${index}`]} placeholder={`Research area ${index + 1}`} required={index < 2} />
                    ))}
                  </div> */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First 2 required inputs */}
                    {[0, 1].map((index) => (
                      <FormInput
                        key={index}
                        label={`Research Area ${index + 1}`}
                        name={`researchArea-${index}`}
                        value={formData.researchAreas[index]}
                        onChange={handleChange}
                        error={errors[`researchArea-${index}`]}
                        placeholder={`Research area ${index + 1}`}
                        required
                      />
                    ))}
                    {/* Next 2 optional inputs */}
                    {[2, 3].map((index) => (
                      <FormInput
                        key={index}
                        label={`Research Area ${index + 1}`}
                        name={`researchArea-${index}`}
                        value={formData.researchAreas[index]}
                        onChange={handleChange}
                        error={errors[`researchArea-${index}`]}
                        placeholder={`Research area ${index + 1}`}
                        required={false}
                      />
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-merriweather text-green-500 border-b border-teal-200 pb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Institutional/Work Email" name="institutionalEmail" type="email" value={formData.institutionalEmail} onChange={handleChange} error={errors.institutionalEmail} placeholder="Enter your work email" required />
                    <FormInput label="Secondary/Personal Email" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} error={errors.personalEmail} placeholder="Enter your personal email" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Mobile No." name="mobileNo" value={formData.mobileNo} onChange={handleChange} error={errors.mobileNo} placeholder="E.g. +919876543210" required />
                    <FormInput label="WhatsApp No." name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} error={errors.whatsappNo} placeholder="E.g. +919876543210" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} placeholder="E.g. Mumbai" required />
                    <FormInput label="Country" name="country" value={formData.country} onChange={handleChange} error={errors.country} options={[
                      { value: 'India', label: 'India' },
                      { value: 'United States', label: 'United States' },
                      { value: 'United Kingdom', label: 'United Kingdom' },
                      { value: 'Australia', label: 'Australia' },
                      { value: 'Canada', label: 'Canada' },
                      { value: 'China', label: 'China' },
                      { value: 'Germany', label: 'Germany' },
                      { value: 'Japan', label: 'Japan' },
                    ]} required />
                  </div>
                  <FormInput label="How Did You Find Us?" name="howFoundUs" value={formData.howFoundUs} onChange={handleChange} error={errors.howFoundUs} placeholder="How did you hear about us?" required />
                  <div>
                    <label className="block text-teal-900 font-merriweather font-medium mb-2">
                      CV <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center">
                      <label className="bg-green-500 hover:bg-teal-800 text-white font-montserrat font-medium py-2 px-4 rounded-lg cursor-pointer mr-4 transition-all duration-300">
                        Choose File
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".doc,.docx,.pdf,.rtf"
                          disabled={isSubmitting}
                        />
                      </label>
                      <span className="text-gray-700 font-montserrat truncate max-w-xs">
                        {formData.cv ? formData.cv.name : 'No file chosen'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-montserrat">Format Allowed (doc, docx, pdf, rtf)</p>
                    {errors.cv && <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.cv}</p>}
                  </div>
                </div>

                {/* References */}
                <div className="space-y-6">
                  <h3 className="text-xl font-merriweather text-green-500 border-b border-teal-200 pb-2">References</h3>
                  <div className="space-y-8">
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-merriweather text-green-500">First Reference</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Name" name="firstReferenceName" value={formData.firstReferenceName} onChange={handleChange} error={errors.firstReferenceName} placeholder="E.g. John Doe" required />
                        <FormInput label="Email Address" name="firstReferenceEmail" type="email" value={formData.firstReferenceEmail} onChange={handleChange} error={errors.firstReferenceEmail} placeholder="E.g. john@example.com" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="College/University/Organization" name="firstReferenceOrg" value={formData.firstReferenceOrg} onChange={handleChange} error={errors.firstReferenceOrg} placeholder="Enter organization" required />
                        <FormInput label="Mobile No." name="firstReferenceMobile" value={formData.firstReferenceMobile} onChange={handleChange} error={errors.firstReferenceMobile} placeholder="E.g. +919876543210" required />
                      </div>
                    </div>
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-merriweather text-green-500">Second Reference</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Name" name="secondReferenceName" value={formData.secondReferenceName} onChange={handleChange} error={errors.secondReferenceName} placeholder="E.g. Jane Doe" required />
                        <FormInput label="Email Address" name="secondReferenceEmail" type="email" value={formData.secondReferenceEmail} onChange={handleChange} error={errors.secondReferenceEmail} placeholder="E.g. jane@example.com" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="College/University/Organization" name="secondReferenceOrg" value={formData.secondReferenceOrg} onChange={handleChange} error={errors.secondReferenceOrg} placeholder="Enter organization" required />
                        <FormInput label="Mobile No." name="secondReferenceMobile" value={formData.secondReferenceMobile} onChange={handleChange} error={errors.secondReferenceMobile} placeholder="E.g. +919876543210" required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-green-500 focus:ring-green-500 mt-1"
                      disabled={isSubmitting}
                    />
                    <span className="ml-2 text-gray-700 font-montserrat">
                      I agree to the Universal Journal of Green SciTech & Management (UJGSM) terms and conditions. <span className="text-red-600">*</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-red-600 text-sm font-montserrat">{errors.agreeToTerms}</p>}
                </div>

                {/* Progress Bar */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg font-montserrat font-bold transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-green-500 hover:bg-teal-800 text-white'
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
                      'Submit Application'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </section>
        </div>
      </div>
    </div>
  ), [formData, errors, isSubmitting, submitSuccess, uploadProgress, handleChange, handleFileChange, handleSubmit, FormInput]);

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

export default ApplyAsReviewer;