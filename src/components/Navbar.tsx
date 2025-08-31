import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown, FaBars, FaTimes } from 'react-icons/fa';

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
          // { id: 'menu-item-909', title: 'Aims & Scope', url: '/aims-scope', isInternal: true },
             { id: 'menu-item-912', title: 'Peer Review Process', url: '/peer-review-process', isInternal: true },
             { id: 'menu-item-914', title: 'COPE', url: '/cope', isInternal: true },
          { id: 'menu-item-915', title: 'CARE', url: '/care', isInternal: true },
           { id: 'menu-item-909', title: 'Plagiarism Policy', url: '/plagiarism-policy', isInternal: true },
          { id: 'menu-item-911', title: 'Open Access Policy', url: '/open-access-policy', isInternal: true },
          { id: 'menu-item-918', title: 'AI-Generated Content Policy', url: '/ai-generated-content-policy', isInternal: true },
          { id: 'menu-item-917', title: 'Privacy & Copyright Statement', url: '/privacy-statement', isInternal: true },
         
          
        ],
      },
      { id: 'menu-item-919', title: 'Editorial Board', url: '/editorial-board', isInternal: true },
     
      {
        id: 'menu-item-897',
        title: 'Authors’ Guidelines',
        url: '#',
        children: [
          // { id: 'menu-item-899', title: 'Authors’ Guidelines', url: '/author-guidelines', isInternal: true },
          { id: 'menu-item-921', title: 'Submit Paper', url: '/submit-paper', isInternal: true },
          { id: 'menu-item-909', title: 'Aims & Scope', url: '/aims-scope', isInternal: true },
          // { id: 'menu-item-900', title: 'Reviewer Guidelines', url: '/reviewer-guidelines', isInternal: true },
          // { id: 'menu-item-902', title: 'Time of Publication', url: '/time-of-publication', isInternal: true },
          { id: 'menu-item-903', title: 'Article Processing Charges', url: '/article-processing-charges', isInternal: true },
          { id: 'menu-item-909', title: 'Abstracting & Indexing', url: '/abstracting-indexing', isInternal: true },
          { id: 'menu-item-910', title: 'Announcements', url: '/announcements', isInternal: true },
        ],
      },
      //  {
      //   id: 'menu-item-920',
      //   title: 'Online Submission',
      //   url: '#',
      //   children: [
      //     { id: 'menu-item-921', title: 'Submit Paper', url: '/submit-paper', isInternal: true },
      //     { id: 'menu-item-923', title: 'Copyright Form', url: '/copyright-form', isInternal: true },
      //     { id: 'menu-item-925', title: 'Manuscript Template', url: '/manuscript-template', isInternal: true },
      //   ],
      // },
      { id: 'menu-item-927', title: 'Current Issue', url: '/current', isInternal: true },
      { id: 'menu-item-928', title: 'Archives', url: '/archives', isInternal: true },
      // { id: 'menu-item-929', title: 'Contact Us', url: '/contact-us', isInternal: true },
      { id: 'menu-item-929', title: 'Photo Gallery', url: '/photo-gallery', isInternal: true },
      { id: 'menu-item-930', title: 'Contact Us', url: '/contact-us', isInternal: true },
      // { id: 'menu-item-931', title: 'Announcements', url: 'https://uora.com/announcements' },
    ],
    []
  );

  const mainMenu = useMemo(() => menuItems.slice(0, -1), [menuItems]);
  const footerMenu = useMemo(() => menuItems.slice(-1), [menuItems]);

  const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => (
    <li
      key={item.id}
      id={item.id}
      className={`menu-item ${item.current ? 'current-menu-item' : ''} ${item.children ? 'menu-item-has-children relative group' : ''}`}
    >
      {item.isInternal && !item.children ? (
        <button
          onClick={() => navigateTo(item.url, true)}
          className="flex items-center py-3 px-4 text-white hover:text-eco-gold font-merriweather font-semibold transition-colors duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-eco-gold rounded"
          aria-current={item.current ? 'page' : undefined}
        >
          {item.title}
        </button>
      ) : (
        <>
          <button
            onClick={(e) => {
              if (item.children) {
                if (isMobileMenuOpen) {
                  toggleSubMenu(item.id);
                }
              } else {
                navigateTo(item.url, item.isInternal);
              }
            }}
            className="flex items-center py-3 px-4 text-white hover:text-eco-gold font-merriweather font-semibold transition-colors duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-eco-gold rounded"
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
                          className="block py-2 px-6 text-white hover:bg-white hover:text-teal-700 transition-colors duration-200 w-full text-left font-montserrat font-medium focus:outline-none focus:ring-2 focus:ring-eco-gold rounded"
                        >
                          {child.title}
                        </button>
                      ) : (
                        <a
                          href={child.url}
                          className="block py-2 px-6 text-white hover:bg-vibrant-green hover:text-eco-gold transition-colors duration-200 font-montserrat font-medium"
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
    <div className="primary-navbar bg-gradient-to-r from-teal-800 to-teal-800 shadow-lg sticky top-0 z-50 mr-5 ml-5">
      <div className="container mx-auto max-w-6xl px-4">
        <nav id="site-navigation" className="main-navigation py-4" aria-label="Primary Menu" ref={navRef}>
          {/* Mobile toggle */}
          <button
            className="primary-menu-toggle lg:hidden p-4 absolute right-4 top-4 z-50 focus:outline-none focus:ring-2 focus:ring-eco-gold rounded"
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

          {/* Mobile overlay */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
              onClick={closeMobileMenu}
            />
          )}

          {/* Main navigation */}
          <div className={`lg:flex lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block relative z-50`}>
            <motion.div
              className="menu-main-menu-container"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Row 1: Main Menu */}
              <ul id="primary-menu" className="menu nav-menu flex flex-col lg:flex-row lg:flex-wrap lg:space-x-2 py-4 lg:py-0">
                {mainMenu.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </ul>

              {/* Row 2: Footer Menu (Publishing House & Announcements) */}
              <ul className="menu nav-menu flex flex-col lg:flex-row lg:flex-wrap lg:space-x-2 lg:mt-2 border-t border-eco-gold/20 lg:border-t-0 pt-2 lg:pt-0">
                {footerMenu.map((item) => (
                  <li key={item.id} id={item.id} className="menu-item">
                    <a
                      href={item.url}
                      className="block py-2 px-4 text-white hover:text-eco-gold font-montserrat font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-eco-gold rounded"
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