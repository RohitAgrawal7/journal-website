// ReviewerGuidelines.jsx
// import React from 'react';

const ReviewerGuidelines = () => {
  const evaluationCriteria = [
    {
      category: "Originality and Significance",
      questions: [
        "Does the work present novel concepts, approaches, or data?",
        "Is the research question important and relevant to the field?",
        "Does the study make a significant contribution to the literature?"
      ]
    },
    {
      category: "Methodology",
      questions: [
        "Is the research design appropriate for addressing the research question?",
        "Are the methods described in sufficient detail to allow replication?",
        "Are the statistical analyses appropriate and correctly applied?"
      ]
    },
    {
      category: "Results and Interpretation",
      questions: [
        "Are the results clearly presented and logically organized?",
        "Do tables and figures effectively support the findings?",
        "Are the interpretations supported by the data and appropriately cautious?"
      ]
    },
    {
      category: "Presentation and Clarity",
      questions: [
        "Is the manuscript well-organized and clearly written?",
        "Is the abstract informative and representative of the paper?",
        "Are references current, relevant, and properly cited?"
      ]
    }
  ];

  const reviewProcess = [
    {
      step: "1",
      title: "Initial Assessment",
      description: "Evaluate whether the manuscript fits the journal's scope and meets basic quality standards."
    },
    {
      step: "2",
      title: "Detailed Evaluation",
      description: "Provide thorough, constructive feedback on strengths and weaknesses of the manuscript."
    },
    {
      step: "3",
      title: "Recommendation",
      description: "Submit your recommendation (accept, minor revision, major revision, or reject) with clear justification."
    },
    {
      step: "4",
      title: "Follow-up",
      description: "If requested, evaluate revised manuscripts to assess author responses to feedback."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Reviewer Guidelines</h1>
          <p className="text-lg text-gray-700">
            Guidance for peer reviewers of the International Journal of Experimental Research and Review
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Reviewer Responsibilities</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Peer review is essential to maintaining the quality and integrity of scientific literature. As a reviewer, you play a crucial role in this process by providing objective, constructive, and timely evaluations of submitted manuscripts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Confidentiality</h3>
                <p className="text-sm text-gray-700">
                  Manuscripts are confidential documents. Do not discuss, share, or use information from unpublished manuscripts without authorization.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Objectivity</h3>
                <p className="text-sm text-gray-700">
                  Evaluate manuscripts based on scientific merit without regard to authors' identity, institution, or nationality.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Timeliness</h3>
                <p className="text-sm text-gray-700">
                  Provide reviews within the agreed timeframe (typically 3 weeks). Inform the editor immediately if you need an extension.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Conflict of Interest</h3>
                <p className="text-sm text-gray-700">
                  Disclose any potential conflicts of interest that might affect your impartiality and recuse yourself if necessary.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Evaluation Criteria</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Please evaluate manuscripts based on the following criteria. Provide specific comments and suggestions for improvement where appropriate.
            </p>
            
            <div className="space-y-6">
              {evaluationCriteria.map((category, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex} className="text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Review Process</h2>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              {reviewProcess.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white text-lg font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="text-gray-700 mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Becoming a Reviewer</h2>
          <p className="text-blue-700 mb-4">
            Interested in joining our panel of reviewers? We are always seeking experts in various fields of experimental research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:editor@ijerr.org?subject=Reviewer Application"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Express Interest
            </a>
            <a
              href="https://qtanalytics.in/journals/index.php/IJERR/reviewer-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Detailed Guidelines
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerGuidelines;