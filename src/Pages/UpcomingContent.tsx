import React from "react";

const UpcomingContent: React.FC = () => {
  return (
    <main
      id="primary"
      className="site-main max-w-6xl mx-auto px-4 py-12 animate-fadeIn"
    >
      <article className="pb-article pb-singular">
        {/* Header */}
        <header className="entry-header mb-10 text-center">
          <h1 className="entry-title text-4xl font-extrabold text-gray-900 tracking-tight">
            🚀 Upcoming Content
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            We’re working hard to bring fresh updates soon!
          </p>
        </header>

        <div className="pb-content space-y-10">
          {/* Highlight Notice */}
          <section className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Stay Tuned for Exciting New Content
            </h2>
            <p className="text-blue-700">
              Our team is preparing the latest research, articles, and
              announcements. Be sure to check back often for updates.
            </p>
          </section>

          {/* Two Columns - Special Issues & Events */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Special Issues */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-teal-800 mb-4">
                📚 Upcoming Special Issues
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    ⏰
                  </span>
                  <span>Advanced Materials Research - April 2024</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    🌱
                  </span>
                  <span>Environmental Sustainability - August 2024</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    🤖
                  </span>
                  <span>AI in Scientific Research - December 2024</span>
                </li>
              </ul>
            </div>

            {/* Events */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-teal-800 mb-4">
                🎤 Upcoming Events
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    📅
                  </span>
                  <span>
                    International Conference on Experimental Research - March
                    15-17, 2024
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    📝
                  </span>
                  <span>Workshop on Research Methodology - May 22, 2024</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">
                    🌍
                  </span>
                  <span>
                    Call for Papers: Climate Change Research - Deadline July 30,
                    2024
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Table Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📅 Submission Deadlines
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                <thead className="bg-teal-700 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Volume</th>
                    <th className="py-3 px-4 text-left">Publishing Date</th>
                    <th className="py-3 px-4 text-left">Submission Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Volume 39</td>
                    <td className="py-3 px-4">April 30, 2024</td>
                    <td className="py-3 px-4">March 20, 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
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
          </section>

          {/* Newsletter */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📬 Stay Updated
            </h2>
            <p className="text-gray-700 mb-4">
              Subscribe to our newsletter for updates on new content, calls for
              papers, and events.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default UpcomingContent;
