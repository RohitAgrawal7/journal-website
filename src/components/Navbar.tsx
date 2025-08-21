import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { FaHome, FaPaperPlane, FaInfoCircle, FaBook, FaArchive } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home', icon: <FaHome /> },
  { name: 'Submit Paper', href: '#submission', icon: <FaPaperPlane /> },
  { name: 'About', href: '#about', icon: <FaInfoCircle /> },
  { name: 'Current Issue', href: '#current-issue', icon: <FaBook /> },
  { name: 'Archives', href: '#archives', icon: <FaArchive /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-[#5e3f3b] to-[#4b2e2b] sticky top-0 z-50 py-2 px-4 sm:py-4 sm:px-6 shadow-lg"
    >
      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute text-xl text-vibrant-green"
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{ y: 50, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 6, delay: idx * 1.5, repeat: Infinity }}
            style={{ left: `${10 + idx * 20}%` }}
          >
            <FaLeaf />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto flex items-center justify-between relative z-10">
        {/* Title */}
        <motion.h2
          className="text-xl sm:text-2xl font-roboto-slab font-bold text-green-300"
        >
          GreenTech Innovative Society
        </motion.h2>

        {/* Hamburger Button (Mobile) */}
        <motion.button
          whileTap={{ scale: 0.8, rotate: 90 }}
          className="block sm:hidden text-eco-gold text-2xl focus:outline-none bg-rich-green p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Desktop Links */}
        <ul className="hidden sm:flex sm:flex-row sm:items-center sm:space-x-6">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, color: '#e9c46a' }}
              className="flex items-center"
            >
              <span className="mr-2 text-green-400 ">{link.icon}</span>
              <a
                href={link.href}
                className="text-green-300 hover:text-green-500 transition text-sm sm:text-base lg:text-lg font-montserrat"
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
        className="fixed top-0 right-0 h-full w-3/4 sm:hidden z-50"
      >
        {/* Gradient background that doesn't interfere with text */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#4b2e2b] to-[#4b2e2b] z-0"></div>

        {/* Solid overlay behind text content */}
        <div className="absolute inset-0 bg-deep-green/80 z-1"></div>
        
        <div className="relative z-10 flex justify-end p-4">
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            className="text-green-200 text-2xl focus:outline-none bg-rich-green p-1 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </motion.button>
        </div>
        
        <ul className="relative z-10 flex flex-col items-start space-y-6 py-8 pl-10">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(false)}
              className="flex items-center bg-deep-green/70 px-4 py-2 rounded-r-full w-full"
            >
              <span className="mr-3 text-white text-lg">{link.icon}</span>
              <a
                href={link.href}
                className="text-white hover:text-green-300 transition text-lg font-montserrat font-medium"
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