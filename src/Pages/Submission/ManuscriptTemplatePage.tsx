// import React from 'react';

const ManuscriptTemplatePage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Manuscript Template</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Manuscript Preparation Guidelines</h2>
              <p>
                To ensure efficient processing and review of your manuscript, please follow our formatting 
                guidelines and use the appropriate template for your article type.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Templates Available</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">Original Research Article</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Structured abstract (250 words max)</li>
                  <li>Introduction, Methods, Results, Discussion</li>
                  <li>Word limit: 3000-6000 words</li>
                  <li>References: 20-40 references</li>
                  <li>Figures/Tables: 4-6 total</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">Review Article</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unstructured abstract (250 words max)</li>
                  <li>Comprehensive literature review</li>
                  <li>Word limit: 5000-8000 words</li>
                  <li>References: 50-100 references</li>
                  <li>Figures/Tables: 3-5 total</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">Short Communication</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Brief abstract (150 words max)</li>
                  <li>Concise presentation of findings</li>
                  <li>Word limit: 1500-2500 words</li>
                  <li>References: 10-20 references</li>
                  <li>Figures/Tables: 2-3 total</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">Case Study</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Structured abstract (200 words max)</li>
                  <li>Case presentation and discussion</li>
                  <li>Word limit: 2000-3000 words</li>
                  <li>References: 15-25 references</li>
                  <li>Figures/Tables: 3-4 total</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Formatting Requirements</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-teal-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Element</th>
                    <th className="py-3 px-4 text-left">Requirements</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Font</td>
                    <td className="py-3 px-4">Times New Roman, 12pt</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Spacing</td>
                    <td className="py-3 px-4">Double-spaced</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Margins</td>
                    <td className="py-3 px-4">1 inch on all sides</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Page Numbers</td>
                    <td className="py-3 px-4">Bottom center</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Title Page</td>
                    <td className="py-3 px-4">Separate title page with author details</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">References</td>
                    <td className="py-3 px-4">APA 7th edition format</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mt-8 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Download Manuscript Templates</h3>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a
                  href="https://qtanalytics.in/journals/index.php/IJERR/revised-manuscript-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors duration-200"
                >
                  Word Template
                </a>
                <a
                  href="https://qtanalytics.in/journals/index.php/IJERR/revised-manuscript-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors duration-200"
                >
                  LaTeX Template
                </a>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Choose the appropriate template for your manuscript type
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ManuscriptTemplatePage;