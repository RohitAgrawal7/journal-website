import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { FaBook, FaUser, FaCalendarAlt, FaFileAlt, FaChevronDown, FaChevronUp, FaCheck, FaEdit, FaComments, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
  //   try {
  //     return localStorage.getItem('submissions_auth') === 'true';
  //   } catch {
  //     return false;
  //   }
  // });
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const API_URL = import.meta.env.VITE_API_URL || 'https://journal-backend-production-a363.up.railway.app';

  // Debounce search term to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch all submissions once (client-side filtering)
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const fetchSubmissions = async () => {
      try {
        // First, try to fetch all data without pagination
        let allSubmissions: Submission[] = [];
        
        try {
          // Try fetching with a large limit to get all records
          const response = await axios.get(`${API_URL}/submission`, {
            params: {
              limit: 1000, // Request large limit to get all records
              page: 1
            }
          });
          
          // Handle different response structures
          if (response.data) {
            if (Array.isArray(response.data)) {
              allSubmissions = response.data;
            } else if (response.data.data && Array.isArray(response.data.data)) {
              allSubmissions = response.data.data;
              
              // If API supports pagination and there are more pages, fetch them
              if (response.data.totalPages && response.data.totalPages > 1) {
                const totalPages = response.data.totalPages;
                const additionalRequests = [];
                
                for (let page = 2; page <= totalPages; page++) {
                  additionalRequests.push(
                    axios.get(`${API_URL}/submission`, {
                      params: { limit: 1000, page }
                    })
                  );
                }
                
                const additionalResponses = await Promise.all(additionalRequests);
                additionalResponses.forEach(res => {
                  if (res.data?.data && Array.isArray(res.data.data)) {
                    allSubmissions = [...allSubmissions, ...res.data.data];
                  } else if (Array.isArray(res.data)) {
                    allSubmissions = [...allSubmissions, ...res.data];
                  }
                });
              }
            }
          }
        } catch (paginatedError) {
          // If paginated request fails, try simple fetch
          try {
            const simpleResponse = await axios.get(`${API_URL}/submission`);
            if (Array.isArray(simpleResponse.data)) {
              allSubmissions = simpleResponse.data;
            } else if (simpleResponse.data?.data && Array.isArray(simpleResponse.data.data)) {
              allSubmissions = simpleResponse.data.data;
            }
          } catch (simpleError) {
            throw simpleError;
          }
        }
        
        setSubmissions(allSubmissions);
        setLoading(false);
        
        if (allSubmissions.length > 0) {
          toast.success(`Loaded ${allSubmissions.length} submission(s)`);
        }
      } catch (err: any) {
        console.error('Error fetching submissions:', err);
        const errorMessage = err.response?.data?.message || 'Failed to fetch submissions. Please try again.';
        setError(errorMessage);
        setLoading(false);
        setSubmissions([]);
        toast.error(errorMessage);
      }
    };

    fetchSubmissions();
  }, [API_URL, isAuthenticated]);

  // Client-side filtering: Filter by status and search term
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      // Status filter - normalize for comparison (handle case and whitespace)
      const subStatus = (sub.status || 'submitted').toLowerCase().trim();
      const selectedStatus = statusFilter.toLowerCase().trim();
      const matchesStatus = statusFilter === 'all' || subStatus === selectedStatus;
      
      // Search filter - only apply if search term exists
      if (!debouncedSearchTerm.trim()) {
        return matchesStatus;
      }
      
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch = 
        sub.trackingId?.toLowerCase().includes(searchLower) ||
        sub.manuscriptTitle?.toLowerCase().includes(searchLower) ||
        sub.correspondingAuthorName?.toLowerCase().includes(searchLower) ||
        sub.correspondingAuthorEmail?.toLowerCase().includes(searchLower) ||
        sub.correspondingAuthorOrganization?.toLowerCase().includes(searchLower) ||
        sub.correspondingAuthorDepartment?.toLowerCase().includes(searchLower) ||
        sub.subjectArea?.toLowerCase().includes(searchLower) ||
        sub.abstract?.toLowerCase().includes(searchLower) ||
        sub.city?.toLowerCase().includes(searchLower) ||
        sub.country?.toLowerCase().includes(searchLower) ||
        sub.desiredIssue?.toLowerCase().includes(searchLower);
      
      return matchesStatus && matchesSearch;
    });
  }, [submissions, statusFilter, debouncedSearchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, itemsPerPage]);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  // auth handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    // hardcoded credentials as requested
    const user = (loginUser || '').trim();
    const pass = (loginPass || '').trim();
    // if (user === 'pawan' && pass === 'pawan somawanshi') {
    //   try {
    //     localStorage.setItem('submissions_auth', 'true');
    //   } catch {}
    //   setIsAuthenticated(true);
    //   toast.success('Access granted');
    // } else {
     if (user === 'pawswauora' && pass === 'UoraPublication@1') {    // do not persist auth - require login on each page open
       setIsAuthenticated(true);
       toast.success('Access granted');
     } else {
       setAuthError('Invalid username or password');
       toast.error('Invalid credentials');
     }
   };

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
      await axios.patch(`${API_URL}/submission/${id}/status`, {
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
    await axios.patch(`${API_URL}/submission/${id}/status`, {
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
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setStatusFilter(e.target.value);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ToastContainer />
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">Admin Access — Submissions</h2>
          <p className="text-sm text-gray-600 mb-4">Enter credentials to view manuscript submissions.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            {authError && <div className="text-sm text-red-600">{authError}</div>}
            <div className="flex items-center justify-between">
              <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Enter</button>
              <button type="button" onClick={() => { setLoginUser('pawswauora'); setLoginPass('UoraPublication@1'); }} className="text-sm text-gray-500 hover:underline">
                Fill sample
              </button>
            </div>
          </form>

          {/* <div className="mt-4 text-xs text-gray-500">
            <div><strong>Note:</strong> username = <code>pawan</code></div>
            <div>password = <code>pawan somawanshi</code></div>
          </div> */}
        </div>
      </div>
    );
  }

  // existing loading / error / content rendering when authenticated
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

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div className="text-red-600 text-center mt-8">{error}</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer />
      <div className="container mx-auto max-w-[95%] xl:max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-teal-800 mb-6 flex items-center">
          <FaBook className="mr-3" /> Manuscript Submissions
        </h1>
        
        <div className="mb-6 space-y-4">
          {/* Filters and Search Row */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredSubmissions.length}</span> of <span className="font-semibold">{submissions.length}</span> submission(s)
              {filteredSubmissions.length !== submissions.length && (
                <span className="text-gray-400 ml-2">(filtered)</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                value={statusFilter}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>

          {/* Items Per Page and Pagination Info */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Items per page:</label>
              <select 
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            {totalPages > 1 && (
              <div className="text-sm text-gray-600">
                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                {filteredSubmissions.length > 0 && (
                  <span className="ml-2">
                    (Showing {startIndex + 1}-{Math.min(endIndex, filteredSubmissions.length)} of {filteredSubmissions.length})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {submissions.length === 0 && !loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No submissions found</h2>
            <p className="text-gray-500">When authors submit manuscripts, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {filteredSubmissions.length === 0 && submissions.length > 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No submissions match your filters</h2>
                <p className="text-gray-500">Try adjusting your search or status filter.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto shadow-inner">
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gradient-to-r from-teal-800 to-teal-700 text-white sticky top-0 z-20 shadow-md">
                      <tr>
                        <th className="py-4 px-3 text-center font-bold text-sm w-16 sticky left-0 bg-teal-800 z-30 border-r border-teal-600">S.No</th>
                        <th className="py-4 px-3 text-center font-bold text-sm w-14">Expand</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[140px] whitespace-nowrap">Tracking ID</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[280px]">Manuscript Title</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[200px]">Author Name</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[180px]">Desired Issue</th>
                        <th className="py-4 px-4 text-center font-bold text-sm min-w-[130px] whitespace-nowrap">Status</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[120px] whitespace-nowrap">Created Date</th>
                        <th className="py-4 px-4 text-left font-bold text-sm min-w-[180px] whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedSubmissions.map((submission, index) => {
                        const serialNumber = startIndex + index + 1;
                        return (
                          <React.Fragment key={submission.id}>
                            <tr className="hover:bg-teal-50 transition-colors duration-150">
                              <td className="py-4 px-3 text-center font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10 border-r border-gray-200">
                                {serialNumber}
                              </td>
                              <td className="py-4 px-3 text-center">
                                <button 
                                  onClick={() => toggleExpand(submission.id)}
                                  className="text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full p-1 transition-all"
                                  aria-label={expandedSubmission === submission.id ? "Collapse" : "Expand"}
                                  title={expandedSubmission === submission.id ? "Collapse details" : "Expand details"}
                                >
                                  {expandedSubmission === submission.id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                              </td>
                              <td className="py-4 px-4">
                                <span className="font-mono text-sm text-gray-800 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                  {submission.trackingId}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="max-w-[280px]">
                                  <p className="font-medium text-gray-900 text-sm leading-relaxed break-words" title={submission.manuscriptTitle}>
                                    {submission.manuscriptTitle}
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center max-w-[200px]">
                                  <FaUser className="mr-2 text-teal-600 flex-shrink-0" />
                                  <span className="text-sm text-gray-800 break-words" title={submission.correspondingAuthorName}>
                                    {submission.correspondingAuthorName}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-700 break-words" title={submission.desiredIssue}>
                                  {submission.desiredIssue}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                                  submission.status === 'accepted' ? 'bg-green-100 text-green-800 border border-green-200' :
                                  submission.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                                  submission.status === 'under_review' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  submission.status === 'revision_required' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                  'bg-gray-100 text-gray-800 border border-gray-200'
                                }`}>
                                  {submission.status?.replace('_', ' ') || 'submitted'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center text-sm text-gray-700">
                                  <FaCalendarAlt className="mr-2 text-teal-600 flex-shrink-0" />
                                  <span className="whitespace-nowrap">
                                    {new Date(submission.createdAt).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <a
                                    href={submission.manuscriptFilePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-md text-xs font-medium transition-colors border border-green-200"
                                    title="View manuscript file"
                                  >
                                    <FaFileAlt className="mr-1.5" />
                                    View File
                                  </a>
                                  <button
                                    onClick={() => handleDeleteSubmission(submission.id)}
                                    disabled={deletingId === submission.id}
                                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-md text-xs font-medium transition-colors border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Delete submission"
                                  >
                                    {deletingId === submission.id ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red-500 mr-1.5"></div>
                                    ) : (
                                      <FaTrash className="mr-1.5" />
                                    )}
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expandedSubmission === submission.id && (
                              <tr className="bg-gradient-to-r from-teal-50 to-green-50">
                                <td colSpan={9} className="p-6">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Author Details Section */}
                                    <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100">
                                      <h3 className="font-bold text-teal-800 mb-4 flex items-center text-lg border-b border-teal-200 pb-2">
                                        <FaUser className="mr-2 text-teal-600" /> Author Details
                                      </h3>
                                      <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Full Name</span>
                                          <span className="text-gray-800">{submission.correspondingAuthorName}</span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Email</span>
                                          <a href={`mailto:${submission.correspondingAuthorEmail}`} className="text-teal-600 hover:text-teal-800 break-all">
                                            {submission.correspondingAuthorEmail}
                                          </a>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Mobile</span>
                                          <span className="text-gray-800">{submission.correspondingAuthorMobile}</span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">WhatsApp</span>
                                          <span className="text-gray-800">{submission.whatsappNumber}</span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Organization</span>
                                          <span className="text-gray-800">{submission.correspondingAuthorOrganization}</span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Department</span>
                                          <span className="text-gray-800">{submission.correspondingAuthorDepartment}</span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Location</span>
                                          <span className="text-gray-800">{submission.city}{submission.state ? `, ${submission.state}` : ''}, {submission.country}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Author Type</span>
                                            <span className="text-gray-800">{submission.authorType}</span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Category</span>
                                            <span className="text-gray-800">{submission.authorCategory}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Manuscript Details Section */}
                                    <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100">
                                      <h3 className="font-bold text-teal-800 mb-4 flex items-center text-lg border-b border-teal-200 pb-2">
                                        <FaFileAlt className="mr-2 text-teal-600" /> Manuscript Details
                                      </h3>
                                      <div className="grid grid-cols-1 gap-3 text-sm mb-4">
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Title</span>
                                          <span className="text-gray-800 leading-relaxed">{submission.manuscriptTitle}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Subject Area</span>
                                            <span className="text-gray-800">{submission.subjectArea}</span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Pages</span>
                                            <span className="text-gray-800">{submission.numberOfPages}</span>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Total Authors</span>
                                            <span className="text-gray-800">{submission.totalAuthors}</span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-gray-600 mb-1">Desired Issue</span>
                                            <span className="text-gray-800">{submission.desiredIssue}</span>
                                          </div>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-semibold text-gray-600 mb-1">Abstract</span>
                                          <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded border border-gray-200 max-h-32 overflow-y-auto">
                                            {submission.abstract}
                                          </p>
                                        </div>
                                      </div>
                              
                                      {/* Admin Remarks Section */}
                                      <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h3 className="font-bold text-teal-800 mb-3 flex items-center text-base">
                                          <FaComments className="mr-2 text-teal-600" /> Admin Remarks
                                        </h3>
                                        {editingRemarks === submission.id ? (
                                          <div className="space-y-3">
                                            <textarea 
                                              value={newRemarks} 
                                              onChange={(e) => setNewRemarks(e.target.value)}
                                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                              rows={4}
                                              placeholder="Enter your remarks here..."
                                            />
                                            <div className="flex gap-2">
                                              <button 
                                                onClick={() => saveRemarks(submission.id, submission.status)}
                                                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                                              >
                                                Save Remarks
                                              </button>
                                              <button 
                                                onClick={cancelEditingRemarks}
                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="space-y-2">
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
                                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                {submission.adminRemarks || <span className="text-gray-400 italic">No remarks yet.</span>}
                                              </p>
                                            </div>
                                            <button 
                                              onClick={() => startEditingRemarks(submission.id, submission.adminRemarks || '')}
                                              className="inline-flex items-center px-3 py-1.5 text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-md transition-colors"
                                            >
                                              <FaEdit className="mr-1.5" /> {submission.adminRemarks ? 'Edit' : 'Add'} Remarks
                                            </button>
                                          </div>
                                        )}
                                      </div>

                                      {/* Status Update Section */}
                                      <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h3 className="font-bold text-teal-800 mb-3 text-base">Update Status</h3>
                                        <div className="flex flex-wrap gap-2">
                                          <button 
                                            onClick={() => handleStatusChange(submission.id, 'under_review')}
                                            disabled={updatingStatus === submission.id}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                                              submission.status === 'under_review' 
                                                ? 'bg-blue-100 text-blue-800 border-2 border-blue-400 shadow-sm' 
                                                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                          >
                                            {updatingStatus === submission.id && submission.status !== 'under_review' ? (
                                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                                            ) : submission.status === 'under_review' ? (
                                              <FaCheck className="mr-2" />
                                            ) : null}
                                            Under Review
                                          </button>
                                          
                                          <button 
                                            onClick={() => handleStatusChange(submission.id, 'revision_required')}
                                            disabled={updatingStatus === submission.id}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                                              submission.status === 'revision_required' 
                                                ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400 shadow-sm' 
                                                : 'bg-white text-yellow-600 border border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                          >
                                            {updatingStatus === submission.id && submission.status !== 'revision_required' ? (
                                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-500 mr-2"></div>
                                            ) : submission.status === 'revision_required' ? (
                                              <FaCheck className="mr-2" />
                                            ) : null}
                                            Revision Required
                                          </button>
                                          
                                          <button 
                                            onClick={() => handleStatusChange(submission.id, 'accepted')}
                                            disabled={updatingStatus === submission.id}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                                              submission.status === 'accepted' 
                                                ? 'bg-green-100 text-green-800 border-2 border-green-400 shadow-sm' 
                                                : 'bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:border-green-300'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                          >
                                            {updatingStatus === submission.id && submission.status !== 'accepted' ? (
                                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500 mr-2"></div>
                                            ) : submission.status === 'accepted' ? (
                                              <FaCheck className="mr-2" />
                                            ) : null}
                                            Accept
                                          </button>
                                          
                                          <button 
                                            onClick={() => handleStatusChange(submission.id, 'rejected')}
                                            disabled={updatingStatus === submission.id}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                                              submission.status === 'rejected' 
                                                ? 'bg-red-100 text-red-800 border-2 border-red-400 shadow-sm' 
                                                : 'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                          >
                                            {updatingStatus === submission.id && submission.status !== 'rejected' ? (
                                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500 mr-2"></div>
                                            ) : submission.status === 'rejected' ? (
                                              <FaCheck className="mr-2" />
                                            ) : null}
                                            Reject
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls - Bottom */}
                {totalPages > 1 && (
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Left: Results Info */}
                      <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-teal-700">{startIndex + 1}</span> to{' '}
                        <span className="font-semibold text-teal-700">{Math.min(endIndex, filteredSubmissions.length)}</span> of{' '}
                        <span className="font-semibold text-teal-700">{filteredSubmissions.length}</span> results
                        {submissions.length !== filteredSubmissions.length && (
                          <span className="text-gray-400 ml-2">
                            (of {submissions.length} total)
                          </span>
                        )}
                      </div>
                      
                      {/* Right: Pagination Controls */}
                      <div className="flex items-center gap-2">
                        {/* First Page Button */}
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-300 transition-all flex items-center gap-1 text-sm font-medium"
                          aria-label="First page"
                          title="First page"
                        >
                          <FaChevronLeft className="text-xs" />
                          <FaChevronLeft className="text-xs -ml-2" />
                        </button>

                        {/* Previous Page Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-300 transition-all flex items-center gap-1 text-sm font-medium"
                          aria-label="Previous page"
                        >
                          <FaChevronLeft className="text-xs" />
                          <span>Previous</span>
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {(() => {
                            const pages: (number | string)[] = [];
                            const maxVisible = 7;
                            
                            if (totalPages <= maxVisible) {
                              // Show all pages if total is small
                              for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                              }
                            } else {
                              // Always show first page
                              pages.push(1);
                              
                              if (currentPage > 3) {
                                pages.push('...');
                              }
                              
                              // Show pages around current
                              const start = Math.max(2, currentPage - 1);
                              const end = Math.min(totalPages - 1, currentPage + 1);
                              
                              for (let i = start; i <= end; i++) {
                                if (i !== 1 && i !== totalPages) {
                                  pages.push(i);
                                }
                              }
                              
                              if (currentPage < totalPages - 2) {
                                pages.push('...');
                              }
                              
                              // Always show last page
                              pages.push(totalPages);
                            }
                            
                            return pages.map((page, idx) => {
                              if (page === '...') {
                                return (
                                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                                    ...
                                  </span>
                                );
                              }
                              
                              const pageNum = page as number;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    currentPage === pageNum
                                      ? 'bg-teal-600 text-white shadow-md'
                                      : 'border border-gray-300 hover:bg-teal-50 hover:border-teal-300 text-gray-700'
                                  }`}
                                  aria-label={`Page ${pageNum}`}
                                  aria-current={currentPage === pageNum ? 'page' : undefined}
                                >
                                  {pageNum}
                                </button>
                              );
                            });
                          })()}
                        </div>

                        {/* Next Page Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-300 transition-all flex items-center gap-1 text-sm font-medium"
                          aria-label="Next page"
                        >
                          <span>Next</span>
                          <FaChevronRight className="text-xs" />
                        </button>

                        {/* Last Page Button */}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-300 transition-all flex items-center gap-1 text-sm font-medium"
                          aria-label="Last page"
                          title="Last page"
                        >
                          <FaChevronRight className="text-xs -mr-2" />
                          <FaChevronRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsList;