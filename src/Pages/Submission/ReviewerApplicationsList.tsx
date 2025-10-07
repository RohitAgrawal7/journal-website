import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUserCheck, FaEnvelope, FaFileAlt, FaCalendarAlt, 
  FaChevronDown, FaChevronUp, FaCheck, 
  FaEdit, FaComments, FaUniversity, FaGlobe, 
   FaGraduationCap, FaPhone, FaWhatsapp 
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ReviewerApplication {
  id: number;
  salutation: string;
  fullName: string;
  gender: string;
  currentEmployment: string;
  totalExperience: number;
  educationalQualifications: string;
  researchAreas: string[];
  institutionalEmail: string;
  personalEmail: string;
  mobileNo: string;
  whatsappNo: string;
  city: string;
  country: string;
  internationalPublications: number;
  howFoundUs: string;
  cvPath: string;
  firstReferenceName: string;
  firstReferenceEmail: string;
  firstReferenceOrg: string;
  firstReferenceMobile: string;
  secondReferenceName: string;
  secondReferenceEmail: string;
  secondReferenceOrg: string;
  secondReferenceMobile: string;
  agreeToTerms: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  adminRemarks: string;
}

const ReviewerApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<ReviewerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<number | null>(null);
  const [editingRemarks, setEditingRemarks] = useState<number | null>(null);
  const [newRemarks, setNewRemarks] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://journal-backend-production-b8f2.up.railway.app';
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<ReviewerApplication[]>(`${API_URL}/reviewer`);
        // Initialize status if not present
        const applicationsWithStatus = response.data.map(app => ({
          ...app,
          status: app.status || 'pending',
          adminRemarks: app.adminRemarks || ''
        }));
        setApplications(applicationsWithStatus);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviewer applications. Please try again.');
        setLoading(false);
        toast.error('Failed to load reviewer applications');
      }
    };

    fetchApplications();
  }, [API_URL]);

  const toggleExpand = (id: number) => {
    if (expandedApplication === id) {
      setExpandedApplication(null);
    } else {
      setExpandedApplication(id);
      setEditingRemarks(null);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      await axios.patch(`${API_URL}/reviewer/${id}`, {
        status: newStatus
      });
      
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
      
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const startEditingRemarks = (id: number, currentRemarks: string) => {
    setEditingRemarks(id);
    setNewRemarks(currentRemarks || '');
  };

  const cancelEditingRemarks = () => {
    setEditingRemarks(null);
    setNewRemarks('');
  };

  const saveRemarks = async (id: number) => {
    try {
      await axios.patch(`${API_URL}/reviewer/${id}`, {
        adminRemarks: newRemarks
      });
      
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, adminRemarks: newRemarks } : app
        )
      );
      
      setEditingRemarks(null);
      setNewRemarks('');
      toast.success('Remarks updated successfully');
    } catch (err) {
      toast.error('Failed to update remarks');
    }
  };

  // Filter applications based on status and search term
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institutionalEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentEmployment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.researchAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer />
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-merriweather font-bold text-teal-800 mb-6 flex items-center">
          <FaUserCheck className="mr-3" /> Reviewer Applications
        </h1>
        
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm text-gray-600">
            {filteredApplications.length} application(s) found
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaUserCheck className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No applications found</h2>
            <p className="text-gray-500">When reviewers apply, their applications will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left w-12"></th>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Institution</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Applied</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <React.Fragment key={application.id}>
                    <tr className="border-b hover:bg-teal-50 transition-colors">
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => toggleExpand(application.id)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          {expandedApplication === application.id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-mono">{application.id}</td>
                      <td className="py-3 px-4 font-medium">{application.salutation} {application.fullName}</td>
                      <td className="py-3 px-4 flex items-center">
                        <FaEnvelope className="mr-2 text-teal-600" />
                        {application.institutionalEmail}
                      </td>
                      <td className="py-3 px-4">{application.currentEmployment}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          application.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status?.replace('_', ' ') || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center">
                        <FaCalendarAlt className="mr-2 text-teal-600" />
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={application.cvPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-teal-800 flex items-center"
                        >
                          <FaFileAlt className="mr-1" /> View CV
                        </a>
                      </td>
                    </tr>
                    {expandedApplication === application.id && (
                      <tr className="bg-teal-50">
                        <td colSpan={8} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaUserCheck className="mr-2" /> Personal Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Full Name:</span> {application.salutation} {application.fullName}</p>
                                <p><span className="font-medium">Gender:</span> {application.gender}</p>
                                <p className="flex items-center">
                                  <FaEnvelope className="mr-2 text-teal-600" />
                                  <span className="font-medium">Institutional Email:</span> {application.institutionalEmail}
                                </p>
                                <p className="flex items-center">
                                  <FaEnvelope className="mr-2 text-teal-600" />
                                  <span className="font-medium">Personal Email:</span> {application.personalEmail}
                                </p>
                                <p className="flex items-center">
                                  <FaPhone className="mr-2 text-teal-600" />
                                  <span className="font-medium">Mobile:</span> {application.mobileNo}
                                </p>
                                <p className="flex items-center">
                                  <FaWhatsapp className="mr-2 text-teal-600" />
                                  <span className="font-medium">WhatsApp:</span> {application.whatsappNo}
                                </p>
                                <p className="flex items-center">
                                  <FaGlobe className="mr-2 text-teal-600" />
                                  <span className="font-medium">Location:</span> {application.city}, {application.country}
                                </p>
                                <p><span className="font-medium">Total Experience:</span> {application.totalExperience} years</p>
                                <p><span className="font-medium">International Publications:</span> {application.internationalPublications}</p>
                                <p><span className="font-medium">How they found us:</span> {application.howFoundUs}</p>
                              </div>
                              
                              <h3 className="font-semibold text-teal-800 mt-4 mb-3 flex items-center">
                                <FaUniversity className="mr-2" /> Professional Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Current Employment:</span> {application.currentEmployment}</p>
                                <p><span className="font-medium">Educational Qualifications:</span> {application.educationalQualifications}</p>
                                <div>
                                  <span className="font-medium">Research Areas:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {application.researchAreas.map((area, index) => (
                                      <span key={index} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                                        {area}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaGraduationCap className="mr-2" /> References
                              </h3>
                              <div className="space-y-4 text-sm mb-4">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                  <h4 className="font-medium mb-2">First Reference</h4>
                                  <p><span className="font-medium">Name:</span> {application.firstReferenceName}</p>
                                  <p><span className="font-medium">Email:</span> {application.firstReferenceEmail}</p>
                                  <p><span className="font-medium">Organization:</span> {application.firstReferenceOrg}</p>
                                  <p><span className="font-medium">Mobile:</span> {application.firstReferenceMobile}</p>
                                </div>
                                
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                  <h4 className="font-medium mb-2">Second Reference</h4>
                                  <p><span className="font-medium">Name:</span> {application.secondReferenceName}</p>
                                  <p><span className="font-medium">Email:</span> {application.secondReferenceEmail}</p>
                                  <p><span className="font-medium">Organization:</span> {application.secondReferenceOrg}</p>
                                  <p><span className="font-medium">Mobile:</span> {application.secondReferenceMobile}</p>
                                </div>
                              </div>
                              
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaComments className="mr-2" /> Admin Remarks
                              </h3>
                              {editingRemarks === application.id ? (
                                <div className="space-y-2">
                                  <textarea 
                                    value={newRemarks} 
                                    onChange={(e) => setNewRemarks(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    rows={3}
                                    placeholder="Enter your remarks here..."
                                  />
                                  <div className="flex space-x-2">
                                    <button 
                                      onClick={() => saveRemarks(application.id)}
                                      className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700"
                                    >
                                      Save
                                    </button>
                                    <button 
                                      onClick={cancelEditingRemarks}
                                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <p className="text-sm bg-white p-3 rounded-lg border border-gray-200 min-h-[80px]">
                                    {application.adminRemarks || "No remarks yet."}
                                  </p>
                                  <button 
                                    onClick={() => startEditingRemarks(application.id, application.adminRemarks || '')}
                                    className="flex items-center text-sm text-teal-600 hover:text-teal-800"
                                  >
                                    <FaEdit className="mr-1" /> {application.adminRemarks ? 'Edit' : 'Add'} Remarks
                                  </button>
                                </div>
                              )}
                              
                              <h3 className="font-semibold text-teal-800 mt-4 mb-2">Update Status</h3>
                              <div className="flex flex-wrap gap-2">
                                <button 
                                  onClick={() => handleStatusChange(application.id, 'under_review')}
                                  disabled={updatingStatus === application.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    application.status === 'under_review' 
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                                      : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                  }`}
                                >
                                  {updatingStatus === application.id && application.status !== 'under_review' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500 mr-1"></div>
                                  ) : application.status === 'under_review' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Under Review
                                </button>
                                
                                <button 
                                  onClick={() => handleStatusChange(application.id, 'accepted')}
                                  disabled={updatingStatus === application.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    application.status === 'accepted' 
                                      ? 'bg-green-100 text-green-800 border border-green-300' 
                                      : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                                  }`}
                                >
                                  {updatingStatus === application.id && application.status !== 'accepted' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-green-500 mr-1"></div>
                                  ) : application.status === 'accepted' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Accept
                                </button>
                                
                                <button 
                                  onClick={() => handleStatusChange(application.id, 'rejected')}
                                  disabled={updatingStatus === application.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    application.status === 'rejected' 
                                      ? 'bg-red-100 text-red-800 border border-red-300' 
                                      : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                                  }`}
                                >
                                  {updatingStatus === application.id && application.status !== 'rejected' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red-500 mr-1"></div>
                                  ) : application.status === 'rejected' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerApplicationsList;