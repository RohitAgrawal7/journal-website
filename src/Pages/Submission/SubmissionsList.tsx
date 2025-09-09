import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBook, FaUser, FaCalendarAlt, FaFileAlt, FaChevronDown, FaChevronUp, FaCheck, FaTimes, FaEdit, FaComments, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Submission {
  id: number;
  trackingId: string;
  desiredIssue: string;
  manuscriptTitle: string;
  abstract: string;
  subjectArea: string;
  totalAuthors: number;
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
  numberOfPages: number;
  manuscriptFilePath: string;
  agreeToTerms: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  adminRemarks: string;
}

const SubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(null);
  const [editingRemarks, setEditingRemarks] = useState<number | null>(null);
  const [newRemarks, setNewRemarks] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get<{
          data: Submission[];
          count: number;
          page: number;
          totalPages: number;
        }>(`${API_URL}/submission`, {
          params: {
            status: statusFilter !== 'all' ? statusFilter : undefined,
            search: searchTerm || undefined
          }
        });
        setSubmissions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch submissions. Please try again.');
        setLoading(false);
        toast.error('Failed to load submissions');
      }
    };

    fetchSubmissions();
  }, [API_URL, statusFilter, searchTerm]);

  const toggleExpand = (id: number) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
      setEditingRemarks(null);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const response = await axios.patch(`${API_URL}/submission/${id}/status`, {
        status: newStatus
      });
      
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, status: newStatus } : sub
        )
      );
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteSubmission = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return;
    }
    
    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/submission/${id}`);
      
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      toast.success('Submission deleted successfully');
    } catch (err) {
      toast.error('Failed to delete submission');
    } finally {
      setDeletingId(null);
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

  const saveRemarks = async (id: number, currentStatus: string) => {
  try {
    const response = await axios.patch(`${API_URL}/submission/${id}/status`, {
      status: currentStatus,        // ✅ required field
      adminRemarks: newRemarks,     // ✅ your remarks
    });

    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, adminRemarks: newRemarks, status: currentStatus }
          : sub
      )
    );

    setEditingRemarks(null);
    setNewRemarks('');
    toast.success('Remarks updated successfully');
  } catch (err: any) {
    console.error(err.response?.data || err);
    toast.error('Failed to update remarks');
  }
};


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

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
        <h1 className="text-3xl font-bold text-teal-800 mb-6 flex items-center">
          <FaBook className="mr-3" /> Manuscript Submissions
        </h1>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {submissions.length} submission(s) found
          </div>
          <div className="flex space-x-2">
            <select 
              value={statusFilter}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="revision_required">Revision Required</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <input 
              type="text" 
              placeholder="Search submissions..." 
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        
        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No submissions found</h2>
            <p className="text-gray-500">When authors submit manuscripts, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left w-12"></th>
                  <th className="py-3 px-4 text-left">Tracking ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Issue</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Created</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <tr className="border-b hover:bg-teal-50 transition-colors">
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => toggleExpand(submission.id)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          {expandedSubmission === submission.id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-mono">{submission.trackingId}</td>
                      <td className="py-3 px-4 font-medium">{submission.manuscriptTitle}</td>
                      <td className="py-3 px-4 flex items-center">
                        <FaUser className="mr-2 text-teal-600" />
                        {submission.correspondingAuthorName}
                      </td>
                      <td className="py-3 px-4">{submission.desiredIssue}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          submission.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          submission.status === 'revision_required' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.status?.replace('_', ' ') || 'submitted'}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center">
                        <FaCalendarAlt className="mr-2 text-teal-600" />
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <a
                            href={submission.manuscriptFilePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-teal-800 flex items-center"
                          >
                            <FaFileAlt className="mr-1" /> View File
                          </a>
                          <button
                            onClick={() => handleDeleteSubmission(submission.id)}
                            disabled={deletingId === submission.id}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            {deletingId === submission.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500 mr-1"></div>
                            ) : (
                              <FaTrash className="mr-1" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedSubmission === submission.id && (
                      <tr className="bg-teal-50">
                        <td colSpan={8} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaUser className="mr-2" /> Author Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Name:</span> {submission.correspondingAuthorName}</p>
                                <p><span className="font-medium">Email:</span> {submission.correspondingAuthorEmail}</p>
                                <p><span className="font-medium">Mobile:</span> {submission.correspondingAuthorMobile}</p>
                                <p><span className="font-medium">WhatsApp:</span> {submission.whatsappNumber}</p>
                                <p><span className="font-medium">Organization:</span> {submission.correspondingAuthorOrganization}</p>
                                <p><span className="font-medium">Department:</span> {submission.correspondingAuthorDepartment}</p>
                                <p><span className="font-medium">Location:</span> {submission.city}, {submission.state}, {submission.country}</p>
                                <p><span className="font-medium">Author Type:</span> {submission.authorType}</p>
                                <p><span className="font-medium">Category:</span> {submission.authorCategory}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaFileAlt className="mr-2" /> Manuscript Details
                              </h3>
                              <div className="space-y-2 text-sm mb-4">
                                <p><span className="font-medium">Title:</span> {submission.manuscriptTitle}</p>
                                <p><span className="font-medium">Subject Area:</span> {submission.subjectArea}</p>
                                <p><span className="font-medium">Pages:</span> {submission.numberOfPages}</p>
                                <p><span className="font-medium">Authors:</span> {submission.totalAuthors}</p>
                                <p><span className="font-medium">Desired Issue:</span> {submission.desiredIssue}</p>
                                <p><span className="font-medium">Abstract:</span> {submission.abstract}</p>
                              </div>
                              
                              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                                <FaComments className="mr-2" /> Admin Remarks
                              </h3>
                              {editingRemarks === submission.id ? (
                                <div className="space-y-2">
                                  <textarea 
                                    value={newRemarks} 
                                    onChange={(e) => setNewRemarks(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    rows={3}
                                  />
                                  <div className="flex space-x-2">
                                    <button 
                                      onClick={() => saveRemarks(submission.id, submission.status)}
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
                                    {submission.adminRemarks || "No remarks yet."}
                                  </p>
                                  <button 
                                    onClick={() => startEditingRemarks(submission.id, submission.adminRemarks || '')}
                                    className="flex items-center text-sm text-teal-600 hover:text-teal-800"
                                  >
                                    <FaEdit className="mr-1" /> {submission.adminRemarks ? 'Edit' : 'Add'} Remarks
                                  </button>
                                </div>
                              )}
                              
                              <h3 className="font-semibold text-teal-800 mt-4 mb-2">Update Status</h3>
                              <div className="flex flex-wrap gap-2">
                                <button 
                                  onClick={() => handleStatusChange(submission.id, 'under_review')}
                                  disabled={updatingStatus === submission.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    submission.status === 'under_review' 
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                                      : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                  }`}
                                >
                                  {updatingStatus === submission.id && submission.status !== 'under_review' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500 mr-1"></div>
                                  ) : submission.status === 'under_review' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Under Review
                                </button>
                                
                                <button 
                                  onClick={() => handleStatusChange(submission.id, 'revision_required')}
                                  disabled={updatingStatus === submission.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    submission.status === 'revision_required' 
                                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                                      : 'bg-white text-yellow-600 border border-yellow-200 hover:bg-yellow-50'
                                  }`}
                                >
                                  {updatingStatus === submission.id && submission.status !== 'revision_required' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-yellow-500 mr-1"></div>
                                  ) : submission.status === 'revision_required' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Revision Required
                                </button>
                                
                                <button 
                                  onClick={() => handleStatusChange(submission.id, 'accepted')}
                                  disabled={updatingStatus === submission.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    submission.status === 'accepted' 
                                      ? 'bg-green-100 text-green-800 border border-green-300' 
                                      : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                                  }`}
                                >
                                  {updatingStatus === submission.id && submission.status !== 'accepted' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-green-500 mr-1"></div>
                                  ) : submission.status === 'accepted' ? (
                                    <FaCheck className="mr-1" />
                                  ) : null}
                                  Accept
                                </button>
                                
                                <button 
                                  onClick={() => handleStatusChange(submission.id, 'rejected')}
                                  disabled={updatingStatus === submission.id}
                                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                                    submission.status === 'rejected' 
                                      ? 'bg-red-100 text-red-800 border border-red-300' 
                                      : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                                  }`}
                                >
                                  {updatingStatus === submission.id && submission.status !== 'rejected' ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red-500 mr-1"></div>
                                  ) : submission.status === 'rejected' ? (
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

export default SubmissionsList;