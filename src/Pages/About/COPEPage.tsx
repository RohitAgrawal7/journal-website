import React from 'react';

const COPEPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">COPE Compliance</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              The International Journal of Experimental Research and Review adheres to the principles of the 
              Committee on Publication Ethics (COPE) and follows its guidelines to maintain the highest standards 
              of publication ethics.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Our Commitment to COPE</h2>
            <p>
              While IJERR is not a registered member of COPE, we strictly follow COPE's core practices and 
              guidelines to ensure ethical behavior at all stages of the publication process.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">COPE Principles We Follow</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accountability for everything we publish</li>
              <li>Editorial independence</li>
              <li>Fair and objective peer review</li>
              <li>Transparency about funding and conflicts of interest</li>
              <li>Prompt correction of errors</li>
              <li>Appropriate handling of ethical concerns</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Ethical Guidelines</h2>
            <p>
              We expect all authors, reviewers, and editors to follow COPE's ethical guidelines. 
              Cases of suspected misconduct are handled according to COPE's flowcharts.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <p className="font-semibold">For more information about COPE, visit:</p>
              <a 
                href="https://publicationethics.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://publicationethics.org/
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default COPEPage;