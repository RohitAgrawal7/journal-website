import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CurrentIssue = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="currentissue"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl sm:text-4xl font-roboto-slab font-bold text-eco-gold mb-6"
      >
        Current Issue
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-green-200 leading-relaxed"
      >
        Links to the current issue will be available upon publication.
      </motion.p>
    </motion.section>
  );
};

export default CurrentIssue;