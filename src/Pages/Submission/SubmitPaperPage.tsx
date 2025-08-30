import React, { useState, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaFileUpload, FaCompass, FaHome, FaBook, FaArchive, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ManuscriptSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
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

  // Memoized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData, file);
      alert('Submission successful!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, file]);

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
        behavior: 'smooth'
      });
    }
  }, []);

  // Sidebar Component
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
          
          <div className="mt-6 p-4 bg-teal-900 rounded-lg">
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

  // Footer Component
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
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-white p-6">
                <h1 className="text-3xl font-merriweather font-bold flex items-center">
                  <FaPaperPlane className="mr-3" /> Manuscript Submission Form
                </h1>
                <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM) – e-ISSN: XXXX-XXXX</p>
                <p className="text-sm">Publisher: <strong>Universal Oneness Research Association (UORA)</strong> | Updated – 2025</p>
              </div>
              
              <div className="p-6">
                <section id="manuscript-submission" className="guideline-section p-6 rounded-lg bg-white border border-teal-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Desired Issue */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Desired Issue <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="desiredIssue"
                        value={formData.desiredIssue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      >
                        <option value="">Select Desired Issue</option>
                        <option value="Volume XIV Issue VII- July 2025-Open">Volume XIV Issue VII- July 2025-Open</option>
                      </select>
                    </div>

                    {/* Manuscript Title */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Manuscript Title <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="manuscriptTitle"
                        value={formData.manuscriptTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      />
                    </div>

                    {/* Abstract */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Abstract <span className="text-eco-gold">*</span>
                      </label>
                      <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        placeholder="Add the abstract here"
                        required
                      ></textarea>
                    </div>

                    {/* Subject Area */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Subject Area <span className="text-eco-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="subjectArea"
                        value={formData.subjectArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      />
                    </div>

                    {/* Total Authors */}
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
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      />
                    </div>

                    {/* Corresponding Author Details Section */}
                    <div id="author-details" className="border-t border-eco-gold/20 pt-6 mt-6">
                      <h2 className="text-xl font-merriweather text-vibrant-green mb-4 flex items-center">
                        <FaCompass className="mr-2" /> Corresponding Author Details
                      </h2>

                      {/* Name and Mobile */}
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.correspondingAuthorMobile.length} / 15</p>
                        </div>
                      </div>

                      {/* Email and Department */}
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Organization and WhatsApp */}
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">{formData.whatsappNumber.length} / 15</p>
                        </div>
                      </div>

                      {/* Address */}
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
                            className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                            required
                          />
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

                      {/* Country */}
                      <div>
                        <label className="block text-dark-brown font-merriweather font-medium mb-2">
                          Country <span className="text-eco-gold">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
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
                      </div>
                    </div>

                    {/* You Are? */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        You Are? <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="authorType"
                        value={formData.authorType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      >
                        <option value="">Select Author Type</option>
                        <option value="Post Graduate Student">Post Graduate Student</option>
                        <option value="Under Graduate Student">Under Graduate Student</option>
                        <option value="Doctoral Candidate/ PhD Student">Doctoral Candidate/ PhD Student</option>
                        <option value="Academician">Academician</option>
                        <option value="Industry Professional">Industry Professional</option>
                      </select>
                    </div>

                    {/* Author Category */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Author Category <span className="text-eco-gold">*</span>
                      </label>
                      <select
                        name="authorCategory"
                        value={formData.authorCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      >
                        <option value="">Select Author Category</option>
                        <option value="New Author">New Author</option>
                        <option value="Ex IJLTEMAS Author">Ex IJLTEMAS Author</option>
                        <option value="Editorial Board Member">Editorial Board Member</option>
                        <option value="IJLTEMAS Reviewer">IJLTEMAS Reviewer</option>
                      </select>
                    </div>

                    {/* Number of Pages */}
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
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-green hover:border-eco-gold font-montserrat transition-colors"
                        required
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-dark-brown font-merriweather font-medium mb-2">
                        Upload Manuscript <span className="text-eco-gold">*</span>
                      </label>
                      <div className="flex items-center">
                        <label className="bg-vibrant-green hover:bg-eco-gold text-white font-montserrat font-medium py-2 px-4 rounded-lg cursor-pointer mr-4 transition-all duration-300">
                          <span className="flex items-center">
                            <FaFileUpload className="mr-2" /> Choose File
                          </span>
                          <input
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
                    </div>

                    {/* Agreement Checkbox */}
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
                          I agree with the Authors Declaration and to receive information regarding my submitted paper by signing up on UJGSM *
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-vibrant-green hover:bg-eco-gold text-white font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
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
                      </button>
                      <button
                        type="button"
                        className="text-vibrant-green hover:text-eco-gold font-montserrat font-medium transition-colors duration-200"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </form>
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