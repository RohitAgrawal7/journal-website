import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCheck, FaEnvelope, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
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
}

const ReviewerApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<ReviewerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<ReviewerApplication[]>(`${API_URL}/reviewer`);
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviewer applications. Please try again.');
        setLoading(false);
        toast.error('Failed to load reviewer applications');
      }
    };

    fetchApplications();
  }, [API_URL]);

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
          <FaUserCheck className="mr-3" /> Reviewer Applications List
        </h1>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center">No applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-200 rounded-lg shadow-md">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b hover:bg-teal-50 transition-colors">
                    <td className="py-3 px-4">{application.id}</td>
                    <td className="py-3 px-4">{application.salutation} {application.fullName}</td>
                    <td className="py-3 px-4 flex items-center">
                      <FaEnvelope className="mr-2 text-teal-600" />
                      {application.institutionalEmail}
                    </td>
                    <td className="py-3 px-4">{application.country}</td>
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