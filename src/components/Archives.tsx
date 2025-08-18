import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const archives = [
  {
    title: 'Make in India',
    image: 'https://imgs.search.brave.com/rsFPREILXxltjlP9FhwyFmqWrW4H0AV6CU8aSN8St8s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLm5k/dHZpbWcuY29tL210/LzIwMTQtMDkvTWFr/ZS1Jbi1JbmRpYUxv/Z282NTAuanBnP2Rv/d25zaXplPTc3Mzo0/MzU',
    number: 'UDYAM: UDYAM-MH-04-0237577',
    link: '#make-in-india',
  },
  {
    title: 'Digital India',
    image: 'https://imgs.search.brave.com/S93NEUp2bn2MP2_PeJzCNL8qAucTe8zxsmDzrUidaaE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBmL2Rk/LzgxLzBmZGQ4MWE1/ZWJkZjc4MTExMjJk/NDUyZmE3NWM4MjYy/LmpwZw',
    number: 'GSTN: 27AAIFU8304M1ZO',
    link: '#digital-india',
  },
  {
    title: 'Startup India',
    image: 'http://imgs.search.brave.com/_gFVcnfwz9eYFcZz6GZb7PWXsQnrMmBNElwXJJbXklw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ5LzEvc3RhcnR1/cC1pbmRpYS1odWIt/bG9nby1wbmdfc2Vl/a2xvZ28tNDk2Njkz/LnBuZw',
    number: 'Shop Act Number: 2541500320009408',
    link: '#startup-india',
  },
];

const Archives = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="archives"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 bg-neutral"
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-12 text-center text-primary">
        Archives
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {archives.map((archive, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            className="bg-white rounded-xl shadow-md border-l-4 border-secondary hover:shadow-lg transition-all"
          >
            <img
              src={archive.image}
              alt={archive.title}
              className="w-full h-64 object-contain rounded-t-xl bg-white p-4"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-2 leading-relaxed">
                {archive.title}
              </h3>
              <p className="text-green-600 mb-4 leading-relaxed">{archive.number}</p>
              <a
                href={archive.link}
                className="text-secondary hover:underline font-medium inline-block"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Archives;