import React from 'react';

const CAREPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">CARE Guidelines</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              The International Journal of Experimental Research and Review supports the CARE (Committee on 
              Agricultural Research and Education) principles and guidelines for agricultural research and education.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">About CARE</h2>
            <p>
              CARE is a global initiative that promotes ethical, sustainable, and equitable agricultural research 
              and education practices that benefit communities and the environment.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Our Implementation of CARE Principles</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Promoting research that addresses real-world agricultural challenges</li>
              <li>Encouraging participatory approaches that involve local communities</li>
              <li>Supporting sustainable agricultural practices</li>
              <li>Fostering knowledge sharing and capacity building</li>
              <li>Ensuring equitable benefit sharing from agricultural research</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">CARE in Our Publication Process</h2>
            <p>
              We give special consideration to research that aligns with CARE principles, particularly studies 
              that demonstrate positive impacts on sustainable agriculture, food security, and rural development.
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <p className="font-semibold">For authors interested in CARE-related research:</p>
              <p>
                We welcome submissions that address sustainable agriculture, climate-resilient farming, 
                indigenous knowledge systems, and community-based agricultural innovation.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default CAREPage;