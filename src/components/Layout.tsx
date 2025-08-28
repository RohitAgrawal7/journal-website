import React from 'react';
import HomeContent from './Summary';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <HomeContent />
        </div>
        <div className="md:w-80 lg:w-96">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;