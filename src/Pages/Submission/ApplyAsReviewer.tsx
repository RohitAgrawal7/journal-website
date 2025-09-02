import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FaUserCheck, FaCheckCircle, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Memoized validation function
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
    
    if (!formData.cv) {
      newErrors.cv = 'CV is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Optimized input change handler
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
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Optimized file change handler
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
      if (errors.cv) {
        setErrors(prev => ({ ...prev, cv: '' }));
      }
    }
  }, [errors.cv]);

  // Optimized form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
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
          
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  }, [formData, validateForm]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('apply-as-reviewer');
      if (element && element.offsetTop <= window.scrollY + 100) {
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoized Sidebar Component
  const Sidebar = useMemo(() => {
    const navItems = [
      { id: 'apply-as-reviewer', title: 'Apply as Reviewer', icon: FaUserCheck },
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
  }, [activeSection, scrollToSection]);

  // Form Input Component for better performance
  const FormInput = useCallback(({ 
    label, name, type = 'text', value, onChange, error, placeholder, required = false, 
    options, textarea = false, ...props 
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
    [key: string]: any;
  }) => {
    const InputComponent = textarea ? 'textarea' : 'input';
    
    return (
      <div>
        <label className="block text-dark-brown font-merriweather font-medium mb-2">
          {label} {required && <span className="text-eco-gold">*</span>}
        </label>
        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
              error ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
            } text-gray-700`}
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
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 font-montserrat ${
              error ? 'border-eco-gold focus:ring-eco-gold/30' : 'border-teal-800 focus:ring-vibrant-green/30 hover:border-eco-gold'
            } text-gray-700`}
            placeholder={placeholder}
            rows={textarea ? 3 : undefined}
            {...props}
          />
        )}
        {error && (
          <p className="mt-1 text-eco-gold text-sm font-montserrat">{error}</p>
        )}
      </div>
    );
  }, []);

  // Memoized MainContent Component
  const MainContent = useMemo(() => {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-teal-800 p-6">
            <h1 className="text-3xl font-merriweather font-bold flex items-center">
              <FaUserCheck className="mr-3" /> Apply as Reviewer
            </h1>
            <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
            <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
          </div>
          <div className="p-6">
            <section id="apply-as-reviewer" className="guideline-section p-6 rounded-lg bg-white hover:bg-green-100 transition-all duration-300">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-teal-800/30 border border-eco-gold/20 rounded-xl text-center"
                >
                  <FaCheckCircle className="text-4xl text-vibrant-green mb-4" />
                  <h3 className="text-xl font-merriweather font-semibold text-vibrant-green mb-2">Application Submitted!</h3>
                  <p className="text-gray-700 font-montserrat">
                    Thank you for applying to become a reviewer. We'll review your application and get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-semibold text-vibrant-green border-b border-eco-gold/20 pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Salutation"
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleChange}
                        error={errors.salutation}
                        options={[
                          { value: 'Dr.', label: 'Dr.' },
                          { value: 'Mr.', label: 'Mr.' },
                          { value: 'Mrs.', label: 'Mrs.' },
                          { value: 'Ms.', label: 'Ms.' },
                        ]}
                        required
                      />
                      
                      <FormInput
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Gender <span className="text-eco-gold">*</span>
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
                              className="mr-2 form-radio text-vibrant-green focus:ring-vibrant-green"
                            />
                            {gender}
                          </label>
                        ))}
                      </div>
                      {errors.gender && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.gender}</p>
                      )}
                    </div>
                    
                    <FormInput
                      label="Current Employment (College/University/Organization)"
                      name="currentEmployment"
                      value={formData.currentEmployment}
                      onChange={handleChange}
                      error={errors.currentEmployment}
                      placeholder="Enter your current employment"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Total Experience (Years)"
                        name="totalExperience"
                        type="number"
                        value={formData.totalExperience}
                        onChange={handleChange}
                        error={errors.totalExperience}
                        min="0"
                        max="50"
                        required
                      />
                      
                      <FormInput
                        label="International Publications"
                        name="internationalPublications"
                        type="number"
                        value={formData.internationalPublications}
                        onChange={handleChange}
                        error={errors.internationalPublications}
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    
                    <FormInput
                      label="Educational Qualifications"
                      name="educationalQualifications"
                      value={formData.educationalQualifications}
                      onChange={handleChange}
                      error={errors.educationalQualifications}
                      placeholder="Enter your educational qualifications"
                      textarea
                      required
                    />
                  </div>

                  {/* Research Area Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-semibold text-vibrant-green border-b border-eco-gold/20 pb-2">
                      Research Areas
                    </h3>
                    <p className="text-gray-700 text-sm font-montserrat">
                      You can mention multiple research areas in which you are willing to review the paper
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.researchAreas.map((area, index) => (
                        <FormInput
                          key={index}
                          label={`Research Area ${index + 1}`}
                          name={`researchArea-${index}`}
                          value={area}
                          onChange={handleChange}
                          error={errors[`researchArea-${index}`]}
                          placeholder={`Research area ${index + 1}`}
                          required={index < 4}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-semibold text-vibrant-green border-b border-eco-gold/20 pb-2">
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Institutional/Work Email"
                        name="institutionalEmail"
                        type="email"
                        value={formData.institutionalEmail}
                        onChange={handleChange}
                        error={errors.institutionalEmail}
                        placeholder="Enter your work email"
                        required
                      />
                      
                      <FormInput
                        label="Secondary/Personal Email"
                        name="personalEmail"
                        type="email"
                        value={formData.personalEmail}
                        onChange={handleChange}
                        error={errors.personalEmail}
                        placeholder="Enter your personal email"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Mobile No."
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        error={errors.mobileNo}
                        placeholder="E.g. +91 9876543210"
                        required
                      />
                      
                      <FormInput
                        label="WhatsApp No."
                        name="whatsappNo"
                        value={formData.whatsappNo}
                        onChange={handleChange}
                        error={errors.whatsappNo}
                        placeholder="E.g. +91 9876543210"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        placeholder="E.g. Mumbai"
                        required
                      />
                      
                      <FormInput
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        error={errors.country}
                        options={[
                          { value: 'India', label: 'India' },
                          { value: 'United States', label: 'United States' },
                          { value: 'United Kingdom', label: 'United Kingdom' },
                          { value: 'Canada', label: 'Canada' },
                          { value: 'Australia', label: 'Australia' },
                          { value: 'Germany', label: 'Germany' },
                          { value: 'France', label: 'France' },
                          { value: 'Japan', label: 'Japan' },
                          { value: 'China', label: 'China' },
                          { value: 'Brazil', label: 'Brazil' },
                        ]}
                        required
                      />
                    </div>
                    
                    <FormInput
                      label="How Did You Find Us?"
                      name="howFoundUs"
                      value={formData.howFoundUs}
                      onChange={handleChange}
                      error={errors.howFoundUs}
                      placeholder="How did you hear about us?"
                      required
                    />
                    
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        CV <span className="text-eco-gold">*</span>
                      </label>
                      <div className="flex items-center">
                        <label className="bg-vibrant-green hover:bg-eco-gold text-teal-800 hover:text-white font-montserrat font-medium py-2 px-4 rounded-lg cursor-pointer mr-4 transition-all duration-300">
                          Choose File
                          <input
                            ref={fileInputRef}
                            type="file"
                            name="cv"
                            onChange={handleFileChange}
                            accept=".doc,.docx,.pdf,.rtf"
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-700 font-montserrat">{formData.cv ? formData.cv.name : 'No file chosen'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 font-montserrat">Format Allowed (doc, docx, PDF, rtf)</p>
                      {errors.cv && (
                        <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.cv}</p>
                      )}
                    </div>
                  </div>

                  {/* References Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-semibold text-vibrant-green border-b border-eco-gold/20 pb-2">
                      References
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-merriweather font-medium text-vibrant-green">First Reference</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput
                            label="Name"
                            name="firstReferenceName"
                            value={formData.firstReferenceName}
                            onChange={handleChange}
                            error={errors.firstReferenceName}
                            placeholder="E.g. John Doe"
                            required
                          />
                          
                          <FormInput
                            label="Email Address"
                            name="firstReferenceEmail"
                            type="email"
                            value={formData.firstReferenceEmail}
                            onChange={handleChange}
                            error={errors.firstReferenceEmail}
                            placeholder="E.g. john@doe.com"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput
                            label="College/University/Organization"
                            name="firstReferenceOrg"
                            value={formData.firstReferenceOrg}
                            onChange={handleChange}
                            error={errors.firstReferenceOrg}
                            placeholder="Enter organization"
                            required
                          />
                          
                          <FormInput
                            label="Mobile No."
                            name="firstReferenceMobile"
                            value={formData.firstReferenceMobile}
                            onChange={handleChange}
                            error={errors.firstReferenceMobile}
                            placeholder="E.g. +91 9876543210"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-merriweather font-medium text-vibrant-green">Second Reference</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput
                            label="Name"
                            name="secondReferenceName"
                            value={formData.secondReferenceName}
                            onChange={handleChange}
                            error={errors.secondReferenceName}
                            placeholder="E.g. John Doe"
                            required
                          />
                          
                          <FormInput
                            label="Email Address"
                            name="secondReferenceEmail"
                            type="email"
                            value={formData.secondReferenceEmail}
                            onChange={handleChange}
                            error={errors.secondReferenceEmail}
                            placeholder="E.g. john@doe.com"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput
                            label="College/University/Organization"
                            name="secondReferenceOrg"
                            value={formData.secondReferenceOrg}
                            onChange={handleChange}
                            error={errors.secondReferenceOrg}
                            placeholder="Enter organization"
                            required
                          />
                          
                          <FormInput
                            label="Mobile No."
                            name="secondReferenceMobile"
                            value={formData.secondReferenceMobile}
                            onChange={handleChange}
                            error={errors.secondReferenceMobile}
                            placeholder="E.g. +91 9876543210"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div>
                    <label className="flex items-start text-gray-700 font-montserrat">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-1 mr-2 form-checkbox h-5 w-5 text-vibrant-green focus:ring-vibrant-green"
                      />
                      <span>
                        I agree to the Universal Journal of Green SciTech & Management (UJGSM) terms and conditions. <span className="text-eco-gold">*</span>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-eco-gold text-sm font-montserrat">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
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
    );
  }, [formData, errors, isSubmitting, submitSuccess, handleChange, handleFileChange, handleSubmit, FormInput]);

  // Memoized Footer Component
  const Footer = useMemo(() => (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl mb-5 border-b-2 border-accent pb-2 inline-block">About UJGSM</h3>
            <p>A peer-reviewed, open-access journal publishing quality research across Engineering, Applied Science, and Management</p>
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
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> Chhatrapati Sambhajinagar, Maharashtra, India</p>
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