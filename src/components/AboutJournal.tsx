import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutJournal = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 "
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">
       About the Journal
      </h2>
      <div className="prose max-w-4xl mx-auto text-gray-700">
        <p>
          The International Journal of Latest Technology in Engineering, Management & Applied Science (UORA) is an open-access platform committed to promoting advancements in engineering, management, and applied sciences. We facilitate scholarly communication by providing a multidisciplinary forum for researchers, practitioners, and scholars to exchange innovative ideas and findings.
        </p>
        <p>
          Our journal aims to bridge the gap between theory and practice, encouraging the dissemination of high-quality research that contributes to the technological and managerial landscape.
        </p>
        <motion.a
          href="#submission"
          whileHover={{ scale: 1.05 }}
          className="inline-block mt-4 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          Learn More
        </motion.a>
      </div>
    </motion.section>
  );
};

export default AboutJournal;