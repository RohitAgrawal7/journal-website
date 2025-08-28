import React from 'react';

const SiteBranding: React.FC = () => {
  return (
    <div className="site-branding bg-gradient-to-br from-deep-green to-rich-green py-4 px-2 sm:py-6 sm:px-4 shadow-md">
      <div className="u-wrapper mx-auto max-w-6xl">
        <div className="site-logo-title flex items-center justify-center space-x-4">
          <div className="site-title-tagline text-center">
            <p className="site-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-slab font-bold">
              <a
                href="https://iaph.in/"
                rel="home"
                aria-label="Go to International Journal of Experimental Research and Review homepage"
                className="text-eco-gold hover:text-vibrant-green transition-colors duration-200"
              >
                International Journal of Experimental Research and Review
              </a>
            </p>
            <p className="site-tagline text-sm sm:text-base text-dark-brown mt-1">
              Advancing Global Research and Innovation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteBranding;