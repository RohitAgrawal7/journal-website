import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBook, FaUser, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Submission {
  id: number;
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
}

const SubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get<Submission[]>(`${API_URL}/submission`);
        setSubmissions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch submissions. Please try again.');
        setLoading(false);
        toast.error('Failed to load submissions');
      }
    };

    fetchSubmissions();
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
          <FaBook className="mr-3" /> Submissions List
        </h1>
        {submissions.length === 0 ? (
          <p className="text-gray-600 text-center">No submissions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-200 rounded-lg shadow-md">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Issue</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-teal-50 transition-colors">
                    <td className="py-3 px-4">{submission.id}</td>
                    <td className="py-3 px-4">{submission.manuscriptTitle}</td>
                    <td className="py-3 px-4 flex items-center">
                      <FaUser className="mr-2 text-teal-600" />
                      {submission.correspondingAuthorName}
                    </td>
                    <td className="py-3 px-4">{submission.desiredIssue}</td>
                    <td className="py-3 px-4 flex items-center">
                      <FaCalendarAlt className="mr-2 text-teal-600" />
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={submission.manuscriptFilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-teal-800 flex items-center"
                      >
                        <FaFileAlt className="mr-1" /> View File
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

export default SubmissionsList;