import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutJournal = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section id="about"
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
        About the Journal
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        GreenTech Innovative Society (e-ISSN: XXXX-XXXX) is a peer-reviewed online journal published bi-monthly by Universal Oneness in Research Scholars. Launched in 2025, it aims to disseminate high-quality research in green technology, sustainability, environmental science, and related fields. We accept original research articles, review articles, short communications, conference proceedings, and seminar papers.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        The journal employs a double-blind peer-review process, with manuscripts evaluated by expert reviewers, including at least one from India and one from abroad. Universal Oneness in Research Scholars is committed to ethical publishing, adhering to best practices inspired by the Committee on Publication Ethics (COPE). All submissions are screened for plagiarism using tools like Turnitin, and authors must provide a text similarity report.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        We occasionally publish theme-based special issues and welcome suggestions from authors and editorial board members to enhance the journal’s quality and relevance.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="text-2xl font-roboto-slab font-bold text-eco-gold mb-4"
      >
        Scope and Subject Areas
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        GreenTech Innovative Society covers a wide range of disciplines, with a focus on sustainability:
      </motion.p>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="list-disc pl-6 text-lg text-green-200 mb-4 leading-relaxed"
      >
        <li>Basic Sciences : Physics, Chemistry, Mathematics, Earth Science, Astronomy, Life Sciences (emphasizing sustainability)</li>
        <li>Applied Sciences : Sustainable Engineering, Environmental Science, Sustainable Agriculture, Medicine (Environmental Health)</li>
        <li>Allied Disciplines : Green Technology, Sustainable Computing, Sustainability Management, Health Sciences, Nutrition, Botany, Zoology, Forestry, Pharmacology, Bioinformatics, Geography, Environmental Sociology, Economics of Sustainability</li>
      </motion.ul>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="text-2xl font-roboto-slab font-bold text-eco-gold mb-4"
      >
        Commitment to Quality
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="text-lg text-green-200 leading-relaxed"
      >
        GreenTech Innovative Society is dedicated to maintaining the highest standards of academic integrity and ethical publishing. We follow rigorous peer-review processes and adhere to international standards of publication ethics.
      </motion.p>
    </motion.section>
  );
};

export default AboutJournal;