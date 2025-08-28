import React from 'react';

const PrivacyStatementPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Privacy Statement</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              The International Journal of Experimental Research and Review is committed to protecting the 
              privacy and personal information of our authors, reviewers, editors, and readers.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information provided during manuscript submission</li>
              <li>Information provided when registering as a reviewer</li>
              <li>Information provided when subscribing to notifications</li>
              <li>Automatically collected information through cookies and analytics</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">How We Use Your Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and manage manuscript submissions</li>
              <li>To communicate about the status of submissions</li>
              <li>To facilitate the peer review process</li>
              <li>To send notifications about new issues and publications</li>
              <li>To improve our website and services</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Data Protection</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, 
              disclosure, or destruction of your personal information. Access to personal information is 
              restricted to authorized personnel only.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to 
              third parties without your consent, except as required by law or as necessary to provide our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
            </ul>
            
            <div className="bg-gray-100 p-6 rounded-lg mt-6">
              <p className="font-semibold">Contact Us</p>
              <p>
                If you have any questions about our privacy practices or would like to exercise your rights, 
                please contact us at <span className="text-blue-600">iaphjournal@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default PrivacyStatementPage;