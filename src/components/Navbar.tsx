import { motion } from 'framer-motion';
import { FaHome, FaPaperPlane, FaInfoCircle, FaBook, FaArchive } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home', icon: <FaHome /> },
  { name: 'Submit Paper', href: '#submission', icon: <FaPaperPlane /> },
  { name: 'About', href: '#about', icon: <FaInfoCircle /> },
  { name: 'Current Issue', href: '#current-issue', icon: <FaBook /> },
  { name: 'Archives', href: '#archives', icon: <FaArchive /> },
];


const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-lg sticky top-0 z-50 py-4 px-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold text-#1e40af">GreenTech Innovative Society</h2>
        <ul className="flex space-x-6">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.1, color: '#10B981' }}
              className="flex items-center text-gray-700 hover:text-#10b981 transition"
            >
              <span className="mr-2">{link.icon}</span>
              <a href={link.href}>{link.name}</a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;