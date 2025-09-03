import React from 'react';

const SiteBranding: React.FC = () => {
  return (
    <div className="site-branding bg-gradient-to-br from-white to-white py-6 px-4 sm:py-8 sm:px-6 shadow-lg border-16 border-teal-700 m-5">
      <div className="container mx-auto max-w-7xl">
        <div className="site-logo-title flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left Logo */}
          <div className="logo-left flex-shrink-0">
            <a
              href="/home"
              rel="home"
              aria-label="Go to Universal Journal of Green SciTech & Management homepage"
              className="block"
            >
              <img
                src="./scitech.png"
                alt="Universal Journal of Green SciTech & Management Left Logo"
                className="w-24 sm:w-32 md:w-50 h-auto border-2 border-white rounded-md"
              />
            </a>
          </div>

          {/* Title and Tagline */}
          <div className="site-title-tagline text-center flex-grow">
            <h1 className="site-title text-xl sm:text-2xl md:text-3xl lg:text-3xl font-merriweather font-bold text--teal-800 hover:text-black transition-colors duration-200">
              <a
                href="https://uorapublications.com"
                rel="home"
                aria-label="Go to Universal Journal of Green Sci-Tech and Management homepage"
                className="focus:outline-none focus:ring-2 focus:ring--teal-800 rounded"
              >
                Universal Journal of Green Sci-Tech and Management
              </a>
            </h1>
            <p className="site-tagline text-sm sm:text-base md:text-md font-montserrat text-teal-800 mt-2">
              Publisher of high-quality peer-reviewed journals in Engineering, Applied Science, and Management
            </p>
            <p className="site-publisher text-xl sm:text-2xl md:text-3xl lg:text-3xl font-merriweather font-bold text--teal-800 mt-2">
              Universal Oneness Research Association
            </p>
          </div>

          {/* Right Logo */}
          <div className="logo-right flex-shrink-0">
            <a
              href="/home"
              rel="home"
              aria-label="Go to Universal Journal of Green SciTech & Management homepage"
              className="block"
            >
              <img
                src="./oneness_1.png"
                alt="Universal Oneness Research Association Right Logo"
                className="w-24 sm:w-32 md:w-55 h-auto border-2 border-white rounded-xl"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SiteBranding);