import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaCheckCircle, FaClock, FaDownload, FaPrint, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const SubmissionConfirmationPage: React.FC = () => {
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading submission data (in a real app, this would come from an API or state management)
  useEffect(() => {
    // Try to get data from localStorage (simulating data persistence)
    const savedData = localStorage.getItem('manuscriptSubmissionData');
    
    if (savedData) {
      setSubmissionData(JSON.parse(savedData));
    } else {
      // Sample data for demonstration
      setSubmissionData({
        submissionId: 'UJGSM-2025-0721',
        submissionDate: new Date().toISOString(),
        status: 'Under Review',
        desiredIssue: 'Volume XIV Issue VII- July 2025-Open',
        manuscriptTitle: 'Advanced Green Energy Solutions for Urban Environments',
        abstract: 'This research explores innovative approaches to implementing green energy solutions in urban settings, focusing on scalability and cost-effectiveness. Our findings demonstrate a 35% improvement in energy efficiency compared to traditional methods.',
        subjectArea: 'Renewable Energy & Sustainability',
        totalAuthors: '3',
        correspondingAuthor: {
          name: 'Dr. Sarah Johnson',
          mobile: '+1-555-0123',
          email: 's.johnson@university.edu',
          department: 'Environmental Science',
          organization: 'University of Technology',
          whatsapp: '+1-555-0123',
          city: 'Boston',
          state: 'Massachusetts',
          country: 'United States'
        },
        authorType: 'Academician',
        authorCategory: 'New Author',
        numberOfPages: '24',
        fileName: 'green_energy_urban_solutions.docx',
        fileSize: '2.4 MB',
        agreeToTerms: true
      });
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vibrant-green mx-auto"></div>
          <p className="mt-4 text-teal-800 font-montserrat">Loading submission data...</p>
        </div>
      </div>
    );
  }

  if (!submissionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-merriweather text-teal-800 mb-4">No Submission Data Found</h2>
          <p className="text-gray-700 font-montserrat mb-6">We couldn't find any manuscript submission data.</p>
          <button 
            onClick={() => window.location.href = '/submit-manuscript'}
            className="bg-vibrant-green hover:bg-eco-gold text-white font-montserrat font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Submit a Manuscript
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would download the submission as PDF
    alert('Download feature would generate a PDF in a real application');
  };

  const handleContact = () => {
    // In a real application, this would open a contact form or email client
    alert('Contact feature would open email client in a real application');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-deep-green to-vibrant-green text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-merriweather font-bold flex items-center">
                  <FaPaperPlane className="mr-3" /> Manuscript Submission Confirmation
                </h1>
                <p className="text-lg mt-2">Universal Journal of Green SciTech & Management (UJGSM)</p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/20 p-3 rounded-lg">
                <p className="text-sm">Submission ID: <strong>{submissionData.submissionId}</strong></p>
                <p className="text-sm">Date: {new Date(submissionData.submissionDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="p-4 bg-teal-50 border-b border-teal-200">
            <div className="flex items-center">
              {submissionData.status === 'Under Review' ? (
                <FaClock className="text-eco-gold text-xl mr-2" />
              ) : (
                <FaCheckCircle className="text-vibrant-green text-xl mr-2" />
              )}
              <span className={`font-montserrat font-medium ${submissionData.status === 'Under Review' ? 'text-eco-gold' : 'text-vibrant-green'}`}>
                Status: {submissionData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Submission Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Manuscript Info */}
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="text-lg font-merriweather text-teal-800 mb-3 border-b border-teal-200 pb-2">Manuscript Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Desired Issue:</span> {submissionData.desiredIssue}</p>
                      <p><span className="font-medium">Title:</span> {submissionData.manuscriptTitle}</p>
                      <p><span className="font-medium">Subject Area:</span> {submissionData.subjectArea}</p>
                      <p><span className="font-medium">Number of Pages:</span> {submissionData.numberOfPages}</p>
                      <p><span className="font-medium">Authors:</span> {submissionData.totalAuthors}</p>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="text-lg font-merriweather text-teal-800 mb-3 border-b border-teal-200 pb-2">Author Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Type:</span> {submissionData.authorType}</p>
                      <p><span className="font-medium">Category:</span> {submissionData.authorCategory}</p>
                      <p><span className="font-medium">Corresponding Author:</span> {submissionData.correspondingAuthor.name}</p>
                      <p><span className="font-medium">Organization:</span> {submissionData.correspondingAuthor.organization}</p>
                    </div>
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-8">
                  <h3 className="text-xl font-merriweather text-teal-800 mb-3 border-b border-teal-200 pb-2">Abstract</h3>
                  <p className="text-gray-700 font-montserrat leading-relaxed bg-teal-50 p-4 rounded-lg">
                    {submissionData.abstract}
                  </p>
                </div>

                {/* Corresponding Author Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-merriweather text-teal-800 mb-4 border-b border-teal-200 pb-2">Corresponding Author Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><span className="font-medium">Full Name:</span> {submissionData.correspondingAuthor.name}</p>
                      <p><span className="font-medium">Email:</span> {submissionData.correspondingAuthor.email}</p>
                      <p><span className="font-medium">Mobile:</span> {submissionData.correspondingAuthor.mobile}</p>
                      <p><span className="font-medium">WhatsApp:</span> {submissionData.correspondingAuthor.whatsapp}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Department:</span> {submissionData.correspondingAuthor.department}</p>
                      <p><span className="font-medium">Organization:</span> {submissionData.correspondingAuthor.organization}</p>
                      <p><span className="font-medium">Location:</span> {submissionData.correspondingAuthor.city}, {submissionData.correspondingAuthor.state}, {submissionData.correspondingAuthor.country}</p>
                    </div>
                  </div>
                </div>

                {/* File Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-merriweather text-teal-800 mb-4 border-b border-teal-200 pb-2">Uploaded Manuscript</h3>
                  <div className="flex items-center bg-teal-50 p-4 rounded-lg">
                    <div className="flex-grow">
                      <p className="font-medium">{submissionData.fileName}</p>
                      <p className="text-sm text-gray-600">{submissionData.fileSize}</p>
                    </div>
                    <button className="bg-vibrant-green hover:bg-eco-gold text-white font-montserrat font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                      <FaDownload className="mr-2" /> Download
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-teal-200">
                  <button 
                    onClick={handlePrint}
                    className="bg-white border border-teal-800 text-teal-800 hover:bg-teal-50 font-montserrat font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <FaPrint className="mr-2" /> Print Confirmation
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="bg-white border border-teal-800 text-teal-800 hover:bg-teal-50 font-montserrat font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <FaDownload className="mr-2" /> Download as PDF
                  </button>
                  <button 
                    onClick={handleContact}
                    className="bg-white border border-teal-800 text-teal-800 hover:bg-teal-50 font-montserrat font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <FaEnvelope className="mr-2" /> Contact Editorial Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-teal-800 p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-vibrant-green mb-4 flex items-center">
                <FaCheckCircle className="mr-2" /> Submission Status
              </h2>
              
              <div className="mb-6">
                <div className={`p-3 rounded-lg mb-2 ${submissionData.status === 'Under Review' ? 'bg-eco-gold/20 text-eco-gold' : 'bg-vibrant-green/20 text-vibrant-green'}`}>
                  <p className="font-medium">Current Stage</p>
                  <p className="text-lg font-bold">{submissionData.status}</p>
                </div>
                <p className="text-white text-sm">Your manuscript is currently being processed by our editorial team.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-vibrant-green font-medium mb-2">Next Steps</h3>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="bg-teal-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">1</span>
                    Initial review by editorial team
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">2</span>
                    Peer review process
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">3</span>
                    Decision notification
                  </li>
                </ul>
              </div>

              <div className="bg-teal-900 p-4 rounded-lg">
                <h3 className="text-vibrant-green font-medium mb-2">Need Help?</h3>
                <p className="text-white text-sm mb-3">Contact our editorial team for assistance:</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-white">
                    <FaEnvelope className="mr-2 text-eco-gold" /> contact@uorapublications.com
                  </p>
                  <p className="flex items-center text-white">
                    <FaPhone className="mr-2 text-eco-gold" /> +91-9766930707
                  </p>
                  <p className="flex items-center text-white">
                    <FaMapMarkerAlt className="mr-2 text-eco-gold" /> Chhatrapati Sambhajinagar, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
          <div className="p-6">
            <h2 className="text-2xl font-merriweather text-teal-800 mb-6">Submission Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-teal-200"></div>
              
              {/* Timeline items */}
              <ul className="space-y-8 relative">
                <li className="flex items-start">
                  <div className="bg-vibrant-green rounded-full h-8 w-8 flex items-center justify-center text-white z-10">
                    <FaCheckCircle />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-merriweather font-medium text-teal-800">Manuscript Submitted</h3>
                    <p className="text-gray-600 font-montserrat text-sm">{new Date(submissionData.submissionDate).toLocaleDateString()}</p>
                    <p className="text-gray-700 font-montserrat mt-1">Your manuscript has been successfully submitted to the editorial team.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-teal-200 rounded-full h-8 w-8 flex items-center justify-center text-teal-800 z-10">
                    <span className="font-montserrat font-bold">2</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="font-merriweather font-medium text-teal-800">Initial Review</h3>
                    <p className="text-gray-600 font-montserrat text-sm">Expected: Within 7 days</p>
                    <p className="text-gray-700 font-montserrat mt-1">The editorial team will perform an initial review for scope and quality.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-teal-200 rounded-full h-8 w-8 flex items-center justify-center text-teal-800 z-10">
                    <span className="font-montserrat font-bold">3</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="font-merriweather font-medium text-teal-800">Peer Review</h3>
                    <p className="text-gray-600 font-montserrat text-sm">Expected: 2-4 weeks</p>
                    <p className="text-gray-700 font-montserrat mt-1">Your manuscript will be sent to field experts for peer review.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-teal-200 rounded-full h-8 w-8 flex items-center justify-center text-teal-800 z-10">
                    <span className="font-montserrat font-bold">4</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="font-merriweather font-medium text-teal-800">Decision</h3>
                    <p className="text-gray-600 font-montserrat text-sm">Expected: 4-6 weeks</p>
                    <p className="text-gray-700 font-montserrat mt-1">You will receive a decision based on the review process.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
                <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Home</a></p>
                <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Current Issue</a></p>
                <p className="flex items-center"><FaEnvelope className="mr-2" /> <a href="#" className="text-white hover:text-eco-gold transition-colors">Archives</a></p>
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
            <p>&copy; 2025 Universal Journal of Green SciTech & Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SubmissionConfirmationPage;