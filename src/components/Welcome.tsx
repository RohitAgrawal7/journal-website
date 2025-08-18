import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Welcome = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="welcome"
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
        Welcome to GreenTech Innovative Society
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        The GreenTech Innovative Society is a bi-monthly multidisciplinary online journal dedicated to advancing scientific research in green technology, sustainability, and allied disciplines. Published by Universal Oneness in Research Scholars, the journal encourages submissions that foster knowledge exchange on the latest trends and developments in these fields.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-green-200 leading-relaxed"
      >
        We welcome manuscripts from Basic Sciences (Physics, Chemistry, Mathematics, Earth Science, Astronomy, Life Sciences), Applied Sciences (Engineering, Environmental Science, Agriculture, Medicine), and Allied Disciplines (Technology, Computer Science, Management, Health Sciences, Nutrition, Botany, Zoology, Forestry, Pharmacology, Bioinformatics, Geography, Social Sciences), with a particular focus on sustainability and green technology.
      </motion.p>
    </motion.section>
  );
};

export default Welcome;