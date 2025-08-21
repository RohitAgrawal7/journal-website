import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLeaf, FaCloud, FaSun, FaSeedling } from 'react-icons/fa';

const Banner = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-br from-[#0c2318] to-nature-green text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-4 border-nature-light rounded-lg flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Twinkling Stars */}
        {[...Array(30)].map((_, idx) => (
          <motion.div
            key={idx}
            className="twinkling-star absolute rounded-full bg-white"
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
        {[...Array(6)].map((_, idx) => (
          <motion.div
            key={idx}
            className="falling-leaf text-xl text-leaf-green absolute"
            initial={{ y: -100, opacity: 0, rotate: 0 }}
            animate={{ y: 500, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 8, delay: idx * 1.2, repeat: Infinity }}
            style={{ left: `${10 + idx * 15}%` }}
          >
            <FaLeaf />
          </motion.div>
        ))}

        {/* Floating Clouds */}
        {[...Array(2)].map((_, idx) => (
          <motion.div
            key={idx}
            className="floating-cloud text-2xl sm:text-3xl text-gray-200 absolute"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 1200, opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 20, delay: idx * 5, repeat: Infinity }}
            style={{ top: `${10 + idx * 15}%` }}
          >
            <FaCloud />
          </motion.div>
        ))}

        {/* Waving Grass */}
        <div className="absolute bottom-0 left-0 w-full flex justify-around">
          {[...Array(5)].map((_, idx) => (
            <motion.div
              key={idx}
              className="waving-grass text-xl sm:text-2xl text-nature-light"
              animate={{ skewX: [0, 10, 0] }}
              transition={{ duration: 3, delay: idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaSeedling />
            </motion.div>
          ))}
        </div>

        {/* Pulsing Sun */}
        <motion.div
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-2xl sm:text-3xl text-yellow-300"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 0, 0.5))' }}
        >
          <FaSun />
        </motion.div>
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
          src="/public/greentech.png"
          alt="GreenTech Left Logo"
          className="w-full h-auto max-w-[80px] sm:max-w-[120px] lg:max-w-[150px]"
        />
      </motion.div>

      {/* Centered Text */}
      <div className="text-center sm:w-1/2">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] mb-2 text-nature-lighter"
        >
          Universal Journal of Green Tech Innovative Socity
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg lg:text-xl mb-1 text-green-200"
        >
          Published by
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl sm:text-2xl lg:text-3xl font-['Poppins']"
        >
          Universal Oneness Research Association
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
          src="/public/oneness.png"
          alt="GreenTech Right Logo"
          className="w-full h-auto max-w-[80px] sm:max-w-[120px] lg:max-w-[150px]"
        />
      </motion.div>
    </motion.section>
  );
};

export default Banner;