import React from 'react';

const AimsScopePage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Aims & Scope</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6 text-gray-700">
            <p>
              The International Journal of Experimental Research and Review (IJERR) aims to promote scientific 
              research and science communication among researchers while enhancing the knowledge base encompassing 
              the latest trends and developments in various disciplines.
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Scope</h2>
            <p>
              IJERR encourages authors to submit manuscripts from Basic Sciences (Physics, Chemistry, Mathematics, 
              Earth Science, Astronomy & Life Sciences), Applied Sciences (Engineering, Medicine, Agriculture & 
              Environmental Science) and Allied Disciplines including Computer, Technology, Management, Health and 
              Medical Sciences, Nutrition, Botany, Zoology, Forestry, Fishery, Sericulture, Apiculture, Pharmacology, 
              Bioinformatics, Geography, Educational Statistics and Social Sciences (Psychology, Sociology, Economics, 
              Anthropology).
            </p>
            
            <h2 className="text-2xl font-semibold text-teal-800 mt-8">Objectives</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide a platform for researchers to publish high-quality experimental research</li>
              <li>To facilitate knowledge sharing and scientific communication</li>
              <li>To follow ethical publishing practices as advocated by COPE</li>
              <li>To maintain high standards of peer review and editorial processes</li>
              <li>To promote open access to scientific knowledge</li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
};

export default AimsScopePage;