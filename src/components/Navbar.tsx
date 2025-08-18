import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Submission Guidelines', href: '#submission' },
  { name: 'Editorial Board', href: '#editorial-board' },
  { name: 'Current Issue', href: '#current-issue' },
  { name: 'Archives', href: '#archives' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-deep-green sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 shadow-lg backdrop-blur-md"
    >
      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-white"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title */}
        <motion.h2
          className="text-xl sm:text-2xl font-roboto-slab font-bold text-eco-gold"
        >
          GTIS Journal
        </motion.h2>

        {/* Hamburger Button (Mobile) */}
        <motion.button
          whileTap={{ scale: 0.8, rotate: 90 }}
          className="block sm:hidden text-eco-gold text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Desktop Links */}
        <ul className="hidden sm:flex sm:flex-row sm:items-center sm:space-x-4 lg:space-x-6">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={link.href}
                className="text-green-200 hover:text-eco-gold transition px-2 py-1 text-sm sm:text-base lg:text-lg font-montserrat"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 right-0 h-full w-3/4 sm:hidden bg-rich-green/95 backdrop-blur-md shadow-lg z-50"
      >
        <div className="flex justify-end p-4">
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            className="text-eco-gold text-2xl focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </motion.button>
        </div>
        <ul className="flex flex-col items-center space-y-4 py-8">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(false)}
            >
              <a
                href={link.href}
                className="text-green-200 hover:text-eco-gold transition text-lg font-montserrat"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;