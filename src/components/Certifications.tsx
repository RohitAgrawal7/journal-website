import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certifications = [
  {
    title: 'Make in India',
    image: 'https://i.ndtvimg.com/i/2015-06/make-in-india-logo_650x400_61433263706.jpg?downsize=773:435',
    number: 'UDYAM : UDYAM-MH-04-0237577',
  },
  {
    title: 'Digital India',
    image: 'https://banner2.cleanpng.com/20180715/wbr/aav1vc6wz.webp',
    number: 'GSTN: 27AAIFU8304M1ZO',
  },
  {
    title: 'Startup India',
    image: 'https://banner2.cleanpng.com/20180604/vfk/aa9qtkgyf.webp',
    number: 'Shop Act Number: 2541500320009408',
  },
];

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="certifications"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-rich-green p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-32 object-contain mb-4"
            />
            <h3 className="text-xl font-bold text-eco-gold mb-2">{cert.title}</h3>
            <p className="text-green-200">{cert.number}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;