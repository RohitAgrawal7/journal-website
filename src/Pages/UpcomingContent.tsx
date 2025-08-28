import React from 'react';

const UpcomingContent: React.FC = () => {
  return (
    <main id="primary" className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Upcoming Content</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Stay Tuned for Exciting New Content</h2>
              <p className="text-blue-700">
                We are constantly working to bring you the latest research and developments in experimental research. 
                Check back soon for new articles, special issues, and announcements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">Upcoming Special Issues</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span>Advanced Materials Research - Expected April 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span>Environmental Sustainability - Expected August 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span>AI in Scientific Research - Expected December 2024</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">Upcoming Events</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>International Conference on Experimental Research - March 15-17, 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>Workshop on Research Methodology - May 22, 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>Call for Papers: Climate Change Research - Deadline July 30, 2024</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submission Deadlines</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-teal-800 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Volume</th>
                      <th className="py-3 px-4 text-left">Publishing Date</th>
                      <th className="py-3 px-4 text-left">Submission Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">Volume 39</td>
                      <td className="py-3 px-4">April 30, 2024</td>
                      <td className="py-3 px-4">March 20, 2024</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">Volume 40</td>
                      <td className="py-3 px-4">August 30, 2024</td>
                      <td className="py-3 px-4">July 20, 2024</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Volume 41</td>
                      <td className="py-3 px-4">December 30, 2024</td>
                      <td className="py-3 px-4">November 20, 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay Updated</h2>
              <p className="text-gray-700 mb-4">
                Subscribe to our newsletter to receive notifications about new content, calls for papers, and upcoming events.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default UpcomingContent;