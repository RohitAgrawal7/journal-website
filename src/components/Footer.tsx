import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-#1e40af text-white py-8 px-6 text-center"
    >
      <p className="mb-4">&copy; 2025 UORA. All rights reserved.</p>
      <nav className="flex justify-center space-x-6">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">Contact Us</a>
      </nav>
    </motion.footer>
  );
};

export default Footer;