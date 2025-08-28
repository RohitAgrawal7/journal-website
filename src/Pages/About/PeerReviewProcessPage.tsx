import React from 'react';

const PeerReviewProcessPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Peer Review Process</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              The International Journal of Experimental Research and Review follows a rigorous double-blind 
              peer review process to ensure the quality and validity of published research.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Review Process Steps</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Submission:</strong> Authors submit manuscripts through our online system.
              </li>
              <li>
                <strong>Initial Screening:</strong> The editorial team checks for compliance with journal guidelines 
                and scope appropriateness.
              </li>
              <li>
                <strong>Assignment to Reviewers:</strong> Suitable manuscripts are assigned to at least two 
                independent experts in the field.
              </li>
              <li>
                <strong>Double-Blind Review:</strong> Reviewers evaluate the manuscript without knowing the 
                authors' identities, and authors don't know the reviewers' identities.
              </li>
              <li>
                <strong>Decision:</strong> Based on reviewers' recommendations, the editor makes a decision 
                (accept, revise, or reject).
              </li>
              <li>
                <strong>Revision:</strong> If needed, authors revise their manuscript based on feedback.
              </li>
              <li>
                <strong>Final Decision:</strong> The editor makes a final decision after evaluating revisions.
              </li>
              <li>
                <strong>Publication:</strong> Accepted manuscripts are prepared for publication.
              </li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Review Criteria</h2>
            <p>
              Reviewers evaluate manuscripts based on originality, significance, methodology, clarity, 
              and adherence to ethical standards.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
};

export default PeerReviewProcessPage;