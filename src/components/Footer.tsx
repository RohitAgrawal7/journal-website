import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-deep-green py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-green-200"
      >
        © 2025 Universal Oneness in Research Scholars. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;