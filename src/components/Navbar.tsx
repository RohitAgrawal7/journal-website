// PrimaryNavbar.jsx (Updated with new routes)
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown, FaBars, FaTimes } from 'react-icons/fa';

const PrimaryNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSubMenu = useCallback((id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const navigateTo = useCallback((url, isInternal = false) => {
    if (isInternal) {
      navigate(url);
      closeMobileMenu();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [navigate, closeMobileMenu]);

  const menuItems = useMemo(() => [
    { id: "menu-item-1000", title: "Home", url: "/", isInternal: true, current: true },
    {
      id: "menu-item-897",
      title: "View",
      url: "#",
      children: [

        { id: "menu-item-903a", title: "Home Page", url: "/Layout" },
        { id: "menu-item-898", title: "Important Links", url: "/important-links", isInternal: true },
        { id: "menu-item-899", title: "Author's Guidelines", url: "/author-guidelines", isInternal: true },
        { id: "menu-item-900", title: "Reviewer Guidelines", url: "/reviewer-guidelines", isInternal: true },
        { id: "menu-item-901", title: "Archiving & Indexing", url: "https://qtanalytics.in/journals/index.php/IJERR/additional-archiving-abstracting-and-indexing" },
        { id: "menu-item-902", title: "Time of Publication", url: "/time-of-publication", isInternal: true },
        { id: "menu-item-903", title: "Charges", url: "https://qtanalytics.in/journals/index.php/IJERR/charges-for-article-processing" },
        { id: "menu-item-905", title: "Impact Factor", url: "https://qtanalytics.in/journals/index.php/IJERR/impact-factor" },
        { id: "menu-item-906", title: "CrossMark Policy", url: "https://qtanalytics.in/journals/index.php/IJERR/crossmarkpolicy" },
        { id: "menu-item-977", title: "Acceptance Rate (AR)", url: "https://qtanalytics.in/journals/index.php/IJERR/Acceptance_Rate_AR" },
      ]
    },
    {
      id: "menu-item-907",
      title: "About",
      url: "#",
      children: [
    { id: "menu-item-908", title: "Aims & Scope", url: "/aims-scope", isInternal: true },
    { id: "menu-item-911", title: "Publication Policies", url: "/publication-policies", isInternal: true },
    { id: "menu-item-912", title: "Peer Review Process", url: "/peer-review-process", isInternal: true },
    { id: "menu-item-914", title: "COPE", url: "/cope", isInternal: true },
    { id: "menu-item-915", title: "CARE", url: "/care", isInternal: true },
    { id: "menu-item-917", title: "Privacy Statement", url: "/privacy-statement", isInternal: true },
    { id: "menu-item-918", title: "Our Citation", url: "https://iaph.in/international-journal-of-experimental-research-and-review-citation" }
  ]
    },
    { id: "menu-item-919", title: "Editorial Board", url: "/editorial-board", isInternal: true },
    {
      id: "menu-item-920",
      title: "Online Submission",
      url: "#",
      children: [
        { id: "menu-item-921", title: "Submit Paper", url: "https://qtanalytics.in/journals/index.php/IJERR/online-submission-procedure" },
        { id: "menu-item-923", title: "Copyright Form", url: "https://qtanalytics.in/journals/index.php/IJERR/copyright-form-template" },
        { id: "menu-item-925", title: "Manuscript Template", url: "https://qtanalytics.in/journals/index.php/IJERR/revised-manuscript-template" },
      ]
    },
    { id: "menu-item-927", title: "Current", url: "/current", isInternal: true },
    { id: "menu-item-928", title: "Archives", url: "/archives", isInternal: true },
    { id: "menu-item-929", title: "Contact Us", url: "https://iaph.co.in/contact-us/" },
    { id: "menu-item-930", title: "Publishing House", url: "http://www.iaph.co.in" },
    { id: "menu-item-931", title: "Announcements", url: "https://qtanalytics.in/journals/index.php/IJERR/announcement" }
  ], []);

  const mainMenu = useMemo(() => menuItems.slice(0, -2), [menuItems]);
  const footerMenu = useMemo(() => menuItems.slice(-2), [menuItems]);

  const MenuItem = ({ item }) => (
    <li 
      key={item.id} 
      id={item.id} 
      className={`menu-item ${item.current ? 'current-menu-item' : ''} ${item.children ? 'menu-item-has-children' : ''} relative group`}
    >
      {item.isInternal ? (
        <button
          onClick={() => navigateTo(item.url, true)}
          className="flex items-center py-3 px-4 text-white hover:text-eco-gold font-montserrat font-medium transition-colors w-full text-left"
        >
          {item.title}
        </button>
      ) : (
        <>
          <a 
            href={item.url} 
            className="flex items-center py-3 px-4 text-white hover:text-eco-gold font-montserrat font-medium transition-colors"
            aria-current={item.current ? 'page' : undefined}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              if (item.children) {
                e.preventDefault();
                toggleSubMenu(item.id);
              }
            }}
          >
            {item.title}
            {item.children && (
              <span className={`ml-2 transform transition-transform ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                <FaAngleDown />
              </span>
            )}
          </a>
          
          {item.children && (
            <AnimatePresence>
              {(expandedItems[item.id] || !isMobileMenuOpen) && (
                <motion.ul 
                  className={`sub-menu bg-teal-800 shadow-lg rounded-md z-10 ${isMobileMenuOpen ? 'ml-4 mt-1' : 'absolute left-0 top-full min-w-64'} lg:group-hover:block ${expandedItems[item.id] ? 'block' : 'hidden'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.children.map((child) => (
                    <li key={child.id} id={child.id} className="menu-item">
                      {child.isInternal ? (
                        <button
                          onClick={() => navigateTo(child.url, true)}
                          className="block py-2 px-6 text-white hover:bg-green-600 hover:text-eco-gold transition-colors w-full text-left"
                        >
                          {child.title}
                        </button>
                      ) : (
                        <a 
                          href={child.url} 
                          className="block py-2 px-6 text-white hover:bg-green-600 hover:text-eco-gold transition-colors"
                          target={child.url.startsWith('http') ? '_blank' : undefined}
                          rel={child.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={closeMobileMenu}
                        >
                          {child.title}
                        </a>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}
        </>
      )}
    </li>
  );

  return (
    <div className="primary-navbar bg-gradient-to-r from-teal-800 to-teal-800 shadow-md sticky top-0 z-50">
      <div className="u-wrapper primary-navbar-wrap max-w-7xl mx-auto px-4">
        <nav id="site-navigation" className="main-navigation" aria-label="Primary Menu">
          
          {/* Mobile toggle */}
          <button 
            className="primary-menu-toggle lg:hidden p-4 absolute right-0 top-0 z-50" 
            aria-controls="primary-menu" 
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Primary Menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-eco-gold text-2xl" />
            ) : (
              <FaBars className="text-eco-gold text-2xl" />
            )}
          </button>
          
          {/* Main navigation */}
          <div className={`lg:flex lg:flex-col lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <motion.div
              className="menu-main-menu-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Row 1 */}
              <ul id="primary-menu" className="menu nav-menu flex flex-col lg:flex-row lg:space-x-1 py-4 lg:py-0">
                {mainMenu.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </ul>

              {/* Row 2 (Publishing House & Announcements) */}
              <ul className="menu nav-menu flex flex-col lg:flex-row lg:space-x-1 lg:mt-2 border-t border-green-600 lg:border-t-0 pt-2 lg:pt-0">
                {footerMenu.map((item) => (
                  <li key={item.id} id={item.id} className="menu-item">
                    <a 
                      href={item.url} 
                      className="block py-3 px-4 text-white hover:text-eco-gold font-montserrat font-medium transition-colors"
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(PrimaryNavbar);