import React from 'react';

const PublicationPoliciesPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Publication Policies</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              International Journal of Experimental Research and Review follows comprehensive publication policies 
              to ensure the integrity, quality, and ethical standards of all published content.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Editorial Policies</h2>
            <p>
              Our editorial policies are designed to maintain the highest standards of academic publishing. 
              All submissions undergo a rigorous double-blind peer review process by experts in the field.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Author Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authors must ensure the originality of their work</li>
              <li>Proper acknowledgment of others' work must be provided</li>
              <li>Authors should disclose any conflicts of interest</li>
              <li>All authors must have significantly contributed to the research</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Peer Review Process</h2>
            <p>
              Each manuscript is reviewed by at least two independent experts in the relevant field. 
              The review process typically takes 4-6 weeks, after which authors receive feedback and a decision.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
};

export default PublicationPoliciesPage;