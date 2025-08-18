import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLeaf, FaCloud } from 'react-icons/fa';

const Banner = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-deep-green to-rich-green text-center py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Twinkling Stars */}
        {[...Array(20)].map((_, idx) => (
          <motion.div
            key={`star-${idx}`}
            className="absolute rounded-full bg-white"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}

        {/* Falling Leaves */}
        {[...Array(5)].map((_, idx) => (
          <motion.div
            key={`leaf-${idx}`}
            className="absolute text-xl text-tech-teal"
            initial={{ y: -100, opacity: 0, rotate: 0 }}
            animate={{ y: 500, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 8, delay: idx * 1.5, repeat: Infinity }}
            style={{ left: `${10 + idx * 20}%` }}
          >
            <FaLeaf />
          </motion.div>
        ))}

        {/* Floating Clouds */}
        {[...Array(2)].map((_, idx) => (
          <motion.div
            key={`cloud-${idx}`}
            className="absolute text-2xl sm:text-3xl text-gray-200"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 1200, opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 20, delay: idx * 5, repeat: Infinity }}
            style={{ top: `${10 + idx * 15}%` }}
          >
            <FaCloud />
          </motion.div>
        ))}
      </div>

      {/* Left Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -10 }}
        animate={inView ? { scale: 1, opacity: 1, y: [0, -10, 0] } : {}}
        transition={{ duration: 0.8, delay: 0.2, y: { repeat: Infinity, duration: 6, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.05 }}
        className="flex justify-center w-1/4 sm:w-1/5"
      >
        <img
          src="/UJGIS.png"
          alt="GreenTech Left Logo"
          className="w-full h-auto max-w-[80px] sm:max-w-[120px] lg:max-w-[150px]"
        />
      </motion.div>

      {/* Centered Text */}
      <div className="flex flex-col items-center justify-center w-full sm:w-3/5 py-4">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-roboto-slab font-bold text-eco-gold mb-2"
        >
          Universal Journal GreenTech Innovative Society
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl lg:text-2xl text-amber-200 font-montserrat"
        >
          Published by
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl lg:text-2xl text-green-200 font-montserrat"
        >
          UNIVERSAL ONENESS RESEARCH ASSOCIATION
        </motion.p>
      </div>

      {/* Right Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -10 }}
        animate={inView ? { scale: 1, opacity: 1, y: [0, -10, 0] } : {}}
        transition={{ duration: 0.8, delay: 0.2, y: { repeat: Infinity, duration: 6, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.05 }}
        className="flex justify-center w-2/4 sm:w-1/5"
      >
        <img
          src="/UORA.png"
          alt="GreenTech Right Logo"
          className="w-full h-auto max-w-[80px] sm:max-w-[120px] lg:max-w-[150px]"
        />
      </motion.div>
    </motion.header>
  );
};

export default Banner;