import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown, FaBars, FaTimes, FaPaperPlane, FaSearch, FaUserCheck } from 'react-icons/fa';

interface MenuItem {
  id: string;
  title: string;
  url: string;
  isInternal?: boolean;
  current?: boolean;
  children?: MenuItem[];
}

const PrimaryNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setExpandedItems({});
  }, []);

  const toggleSubMenu = useCallback((id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const navigateTo = useCallback(
    (url: string, isInternal: boolean = false) => {
      if (isInternal) {
        navigate(url);
        closeMobileMenu();
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [navigate, closeMobileMenu]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        id: 'menu-item-900',
        title: 'Home',
        url: '/',
        isInternal: true,
        current: true,
      },
      {
        id: 'menu-item-907',
        title: 'About',
        url: '#',
        children: [
          { id: 'menu-item-908', title: 'About the Journal', url: '/about-the-journal', isInternal: true },
          { id: 'menu-item-912', title: 'Peer Review Process', url: '/peer-review-process', isInternal: true },
          { id: 'menu-item-914', title: 'COPE', url: '/cope', isInternal: true },
          { id: 'menu-item-915', title: 'UGC-CARE', url: '/care', isInternal: true },
          { id: 'menu-item-909', title: 'Plagiarism Policy', url: '/plagiarism-policy', isInternal: true },
          { id: 'menu-item-911', title: 'Open Access Policy', url: '/open-access-policy', isInternal: true },
          { id: 'menu-item-918', title: 'AI-Generated Content Policy', url: '/ai-generated-content-policy', isInternal: true },
          { id: 'menu-item-917', title: 'Privacy & Copyright Statement', url: '/privacy-statement', isInternal: true },
        ],
      },
      { id: 'menu-item-919', title: 'Editorial Board', url: '/editorial-board', isInternal: true },
      
      {
        id: 'menu-item-898',
        title: 'Guidelines',
        url: '#',
        children: [
          { id: 'menu-item-909', title: 'Aims & Scope', url: '/aims-scope', isInternal: true },
          { id: 'menu-item-903', title: 'Article Processing Charges', url: '/article-processing-charges', isInternal: true },
          { id: 'menu-item-909', title: 'Abstracting & Indexing', url: '/abstracting-indexing', isInternal: true },
          { id: 'menu-item-910', title: 'Announcements', url: '/announcements', isInternal: true },
        ],
      },
      { id: 'menu-item-927', title: 'Current Issue', url: '/current', isInternal: true },
      { id: 'menu-item-928', title: 'Archives', url: '/archives', isInternal: true },
      { id: 'menu-item-929', title: 'Photo Gallery', url: '/photo-gallery', isInternal: true },
      { id: 'menu-item-930', title: 'Contact Us', url: '/contact-us', isInternal: true },

      // {
      //   id: 'menu-item-897',
      //   title: 'Submissions data',
      //   url: '#',
      //   children: [
      //     { id: 'menu-item-921', title: 'Submissions List', url: '/submissions-list', isInternal: true },
      //     { id: 'menu-item-922', title: 'Reviewer Applications List', url: '/reviewer-applications-list', isInternal: true },
      //     { id: 'menu-item-923', title: 'Apply as Reviewer', url: '/apply-as-reviewer', isInternal: true },
      //   ],
      // },
    ],
    []
  );

  const authorServices = [
    { id: 'author-1', title: 'Submit Paper', url: '/submit-paper', icon: <FaPaperPlane className="mr-2" /> },
    { id: 'author-2', title: 'Track Paper', url: '/track-paper', icon: <FaSearch className="mr-2" /> },
    { id: 'author-3', title: 'Apply as Reviewer', url: '/apply-as-reviewer', icon: <FaUserCheck className="mr-2" /> },
  ];

  const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => (
    <li
      key={item.id}
      id={item.id}
      className={`menu-item ${item.current ? 'current-menu-item' : ''} ${item.children ? 'menu-item-has-children relative group' : ''}`}
    >
      {item.isInternal && !item.children ? (
        <button
          onClick={() => navigateTo(item.url, true)}
          className="flex items-center py-3 px-4 text-white hover:text--teal-800 font-merriweather font-semibold transition-colors duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring--teal-800 rounded"
          aria-current={item.current ? 'page' : undefined}
        >
          {item.title}
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              if (item.children) {
                if (isMobileMenuOpen) {
                  toggleSubMenu(item.id);
                }
              } else {
                navigateTo(item.url, item.isInternal);
              }
            }}
            className="flex items-center py-3 px-4 text-white hover:text--teal-800 font-merriweather font-semibold transition-colors duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring--teal-800 rounded"
            aria-expanded={item.children ? expandedItems[item.id] : undefined}
            aria-haspopup={item.children ? 'true' : 'false'}
          >
            {item.title}
            {item.children && (
              <span className={`ml-2 transform transition-transform duration-200 ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                <FaAngleDown />
              </span>
            )}
          </button>
          {item.children && (
            <AnimatePresence>
              {(expandedItems[item.id] || !isMobileMenuOpen) && (
                <motion.ul
                  className={`sub-menu bg-teal-700 shadow-lg rounded-lg z-20 ${isMobileMenuOpen ? 'ml-4 mt-1' : 'absolute left-0 top-full min-w-64'} lg:group-hover:block ${expandedItems[item.id] ? 'block' : 'hidden'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {item.children.map((child) => (
                    <li key={child.id} id={child.id} className="menu-item">
                      {child.isInternal ? (
                        <button
                          onClick={() => {
                            navigateTo(child.url, true);
                            if (item.children && isMobileMenuOpen) {
                              toggleSubMenu(item.id);
                            }
                          }}
                          className="block py-2 px-6 text-white hover:bg-white hover:text-teal-700 transition-colors duration-200 w-full text-left font-montserrat font-medium focus:outline-none focus:ring-2 focus:ring--teal-800 rounded"
                        >
                          {child.title}
                        </button>
                      ) : (
                        <a
                          href={child.url}
                          className="block py-2 px-6 text-white hover:bg-vibrant-green hover:text--teal-800 transition-colors duration-200 font-montserrat font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
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
    <div className="primary-navbar bg-gradient-to-r from-teal-800 to-teal-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <nav id="site-navigation" className="main-navigation" aria-label="Primary Menu" ref={navRef}>
          {/* Author Services Row - Only on desktop */}
          <div className="hidden lg:flex justify-center py-2 border-b border-teal-700">
            <div className="flex space-x-4">
              {authorServices.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => navigateTo(service.url, true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg--teal-800 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 hover:bg-gradient-to-r from-green-600 to-sky-500"
                >
                  {service.icon}
                  {service.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="primary-menu-toggle lg:hidden p-4 absolute right-4 top-4 z-50 focus:outline-none focus:ring-2 focus:ring--teal-800 rounded"
            aria-controls="primary-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Primary Menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text--teal-800 text-2xl" />
            ) : (
              <FaBars className="text--teal-800 text-2xl" />
            )}
          </button>

          {/* Mobile overlay */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
              onClick={closeMobileMenu}
            />
          )}

          {/* Main navigation */}
          <div className={`lg:flex lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block relative z-50 py-3`}>
            <motion.div
              className="menu-main-menu-container"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Mobile Author Services */}
              {isMobileMenuOpen && (
                <div className="lg:hidden mb-4 p-4 bg-teal-700 rounded-lg">
                  <h3 className="text--teal-800 font-bold mb-3 text-center">Author Services</h3>
                  <div className="space-y-3">
                    {authorServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => navigateTo(service.url, true)}
                        className="flex items-center justify-center w-full bg--teal-800 text-white font-medium py-2 px-4 rounded-full"
                      >
                        {service.icon}
                        {service.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Menu */}
              <ul id="primary-menu" className="menu nav-menu flex flex-col lg:flex-row lg:flex-wrap lg:justify-center lg:space-x-1 py-4 lg:py-0">
                {menuItems.map((item) => (
                  <MenuItemComponent key={item.id} item={item} />
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