import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const publications = [
  {
    country: 'Nigeria',
    title: 'Green Human Resources Management Practices...',
    authors: 'Ezekiel, Evelyn Ilamosi, et al.',
  },
  {
    country: 'Philippines',
    title: 'Evaluation of the Organoleptic Properties of Calabash Fruit...',
    authors: 'Jorene Mae J. Tagud, et al.',
  },
  // Add more from document
];

const CurrentIssue = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="current-issue"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 bg-neutral"
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-8 text-center text-green-600">
        Current Issue: August 2025
      </h2>
      <div className="max-w-5xl mx-auto space-y-6">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-start"
          >
            {/* Placeholder for flag images */}
            <div className="w-8 h-8 bg-gray-300 rounded mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold text-amber-600">{pub.title}</h3>
              <p className="text-green-700">{pub.authors}</p>
              <p className="text-green-700 text-sm">{pub.country}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <motion.a
          href="#archives"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-#10b981 text-white py-2 px-6 rounded-full hover:bg-green-600 transition"
        >
          View All Articles
        </motion.a>
      </div>
    </motion.section>
  );
};

export default CurrentIssue;