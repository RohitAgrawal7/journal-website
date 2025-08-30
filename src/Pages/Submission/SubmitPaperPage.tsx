import React, { useState } from 'react';

const ManuscriptSubmissionForm = () => {
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

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData, file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manuscript Submission Form</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Desired Issue */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Desired Issue <span className="text-red-500">*</span>
          </label>
          <select
            name="desiredIssue"
            value={formData.desiredIssue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Desired Issue</option>
            <option value="Volume XIV Issue VII- July 2025-Open">Volume XIV Issue VII- July 2025-Open</option>
          </select>
        </div>

        {/* Manuscript Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Manuscript Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="manuscriptTitle"
            value={formData.manuscriptTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Abstract */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Abstract <span className="text-red-500">*</span>
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="add the abstract here"
            required
          ></textarea>
        </div>

        {/* Subject Area */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Subject Area <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subjectArea"
            value={formData.subjectArea}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Total Authors */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Total Authors <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="totalAuthors"
            value={formData.totalAuthors}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Corresponding Author Details Section */}
        <div className="mb-6 border-t border-gray-300 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Corresponding Author Details</h2>
          
          {/* Name and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Corresponding Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="correspondingAuthorName"
                value={formData.correspondingAuthorName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Corresponding Author Mobile No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="correspondingAuthorMobile"
                value={formData.correspondingAuthorMobile}
                onChange={handleInputChange}
                placeholder="(Country Code)(Mobile No.)"
                maxLength="15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">0 / 15</p>
            </div>
          </div>

          {/* Email and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Corresponding Author Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="correspondingAuthorEmail"
                value={formData.correspondingAuthorEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Corresponding Author Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="correspondingAuthorDepartment"
                value={formData.correspondingAuthorDepartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Organization and WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Corresponding Author's Organisation/College/University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="correspondingAuthorOrganization"
                value={formData.correspondingAuthorOrganization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                WhatsApp No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                placeholder="(Country Code)(Mobile No.)"
                maxLength="15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">0 / 15</p>
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="E.g. Sydney"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="E.g. New South Wales"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Country */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>

        {/* You Are? */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            You Are? <span className="text-red-500">*</span>
          </label>
          <select
            name="authorType"
            value={formData.authorType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">You Are?</option>
            <option value="Post Graduate Student">Post Graduate Student</option>
            <option value="Under Graduate Student">Under Graduate Student</option>
            <option value="Doctoral Candidate/ PhD Student">Doctoral Candidate/ PhD Student</option>
            <option value="Academician">Academician</option>
            <option value="Industry Professional">Industry Professional</option>
          </select>
        </div>

        {/* Author Category */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Author Category <span className="text-red-500">*</span>
          </label>
          <select
            name="authorCategory"
            value={formData.authorCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Author Category</option>
            <option value="New Author">New Author</option>
            <option value="Ex IJLTEMAS Author">Ex IJLTEMAS Author</option>
            <option value="Editorial Board Member">Editorial Board Member</option>
            <option value="IJLTEMAS Reviewer">IJLTEMAS Reviewer</option>
          </select>
        </div>

        {/* Number of Pages */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            No. of Pages <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="numberOfPages"
            value={formData.numberOfPages}
            onChange={handleInputChange}
            min="1"
            max="100"
            placeholder="No. of Pages"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Manuscript* <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <label className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer mr-4">
              Choose File
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".doc,.docx,.rtf"
                required
              />
            </label>
            <span className="text-gray-600">{file ? file.name : 'No file chosen'}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Format Allowed (doc, docx and rtf)</p>
        </div>

        {/* Agreement Checkbox */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">
              I Agree with Authors Declaration & to receive information regarding my submitted paper by signing up on rsisinternational *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Submit
          </button>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManuscriptSubmissionForm;