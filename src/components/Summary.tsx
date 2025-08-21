import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLeaf, FaSolarPanel, FaSeedling, FaWater, FaGlobeAmericas } from 'react-icons/fa';
import CountUp from 'react-countup';

const stats = [
  { value: 6, unit: ' Issues/Year', label: 'Bi-Monthly Publications' },
  { value: 100, unit: '%', label: 'Open Access for All' },
  { value: 50, unit: '+', label: 'Global Reviewers' },
  { value: 20, unit: '+', label: 'Countries Represented' },
  { value: 100, unit: '+', label: 'Submissions Received' },
];

const Summary = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="home"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative py-16 px-6 bg-gradient-to-b from-deep-green to-rich-green text-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Earth and Network */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute top-1/2 right-0 w-1/2 h-full hidden lg:block"
        >
          {/* Floating Earth */}
          <motion.div
            className="absolute top-1/2 right-0 text-9xl text-tech-teal"
            animate={{
              y: [-20, 0, -20],
              rotate: [-5, 0, 5],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 20px rgba(42, 157, 143, 0.7))' }}
          >
            <FaGlobeAmericas />
          </motion.div>
          {/* Rotating Globe and Network */}
          <motion.svg
            viewBox="0 0 400 400"
            className="absolute top-1/2 right-0 w-[400px] h-[400px] transform -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="200" cy="200" r="150" fill="none" stroke="#2a9d8f" strokeWidth="1" strokeOpacity="0.1" />
            <g className="pulse-network" style={{ animation: 'pulseNetwork 3s ease-in-out infinite' }}>
              <path
                d="M200,50 Q250,100 200,150 Q150,100 200,50"
                fill="none"
                stroke="#5d9b7b"
                strokeWidth="1"
              />
              <path
                d="M200,150 Q250,200 200,250 Q150,200 200,150"
                fill="none"
                stroke="#5d9b7b"
                strokeWidth="1"
              />
              <path
                d="M50,200 Q100,250 150,200 Q100,150 50,200"
                fill="none"
                stroke="#5d9b7b"
                strokeWidth="1"
              />
            </g>
            {/* Spider Web */}
            <g className="spider-web" style={{ animation: 'spiderWeb 4s ease-in-out infinite' }}>
              <line x1="200" y1="50" x2="200" y2="350" stroke="#e9c46a" strokeWidth="0.5" strokeOpacity="0.3" />
              <line x1="50" y1="200" x2="350" y2="200" stroke="#e9c46a" strokeWidth="0.5" strokeOpacity="0.3" />
            </g>
            {/* Circuit Flow */}
            <path
              d="M120,120 L150,120 L150,150 L180,150"
              fill="none"
              stroke="#2a9d8f"
              strokeWidth="2"
              strokeDasharray="5"
              className="circuit-flow"
            />
          </motion.svg>
        </motion.div>

        {/* Floating Leaves */}
        {[...Array(8)].map((_, idx) => (
          <motion.div
            key={idx}
            className="floating-leaf text-2xl text-[#5d9b7b] absolute"
            initial={{ y: -100, opacity: 0, rotate: 0 }}
            animate={{ y: '100vh', opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 15, delay: idx * 1.5, repeat: Infinity }}
            style={{ left: `${5 + idx * 12}%` }}
          >
            <FaLeaf />
          </motion.div>
        ))}

        {/* Bouncing Science Icons */}
        {[
          { icon: FaSolarPanel, top: '20%', left: '10%', delay: 0.5 },
          { icon: FaSeedling, top: '30%', left: '85%', delay: 1.5 },
          { icon: FaWater, top: '40%', left: '15%', delay: 2.5 },
        ].map(({ icon: Icon, top, left, delay }, idx) => (
          <motion.div
            key={idx}
            className="absolute text-2xl text-eco-gold"
            initial={{ y: 0 }}
            animate={{ y: [-20, 0, -20] }}
            transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top, left }}
          >
            <Icon />
          </motion.div>
        ))}

        {/* Growing Trees */}
        <div className="absolute bottom-0 left-0 w-full flex justify-around">
          {[...Array(5)].map((_, idx) => (
            <motion.div
              key={idx}
              className="text-5xl text-vibrant-green"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 8, delay: idx * 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'bottom' }}
            >
              <FaLeaf />
            </motion.div>
          ))}
        </div>

        {/* Water Ripples */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24">
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-1/2 w-10 h-10 border-2 border-tech-teal rounded-full"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 3, delay: idx * 1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto prose text-green-200 relative z-10">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold font-['Roboto_Slab'] mb-8 text-eco-gold"
        >
          Welcome to GreenTech Innovative Society
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg leading-relaxed"
        >
          The Universal Journal of Green Tech is a bi-monthly, open-access journal dedicated to advancing research in green technology and sustainability. Published by the Universal One Research Association, we provide a global platform for researchers, scientists, and scholars to share innovative solutions addressing environmental challenges.
        </motion.p>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg leading-relaxed"
        >
          We welcome submissions across Basic Sciences (Physics, Chemistry, Earth Science, Life Sciences), Applied Sciences (Engineering, Environmental Science, Agriculture), and Allied Disciplines (Technology, Management, Health Sciences, Social Sciences), emphasizing sustainable innovations.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)' }}
            className="bg-rich-green/80 p-6 rounded-xl shadow-md border-l-4 border-tech-teal hover:shadow-lg transition-all"
          >
            <CountUp
              end={inView ? stat.value : 0}
              duration={2}
              className="text-4xl font-bold text-amber-600"
              suffix={stat.unit}
            />
            <p className="mt-2 text-green-200 leading-relaxed">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Inline Styles */}
      <style >{`
        @keyframes pulseNetwork {
          0% {
            stroke-width: 1;
            stroke-opacity: 0.3;
          }
          50% {
            stroke-width: 2;
            stroke-opacity: 0.6;
          }
          100% {
            stroke-width: 1;
            stroke-opacity: 0.3;
          }
        }
        @keyframes spiderWeb {
          0% {
            stroke-opacity: 0.1;
          }
          50% {
            stroke-opacity: 0.5;
          }
          100% {
            stroke-opacity: 0.1;
          }
        }
        @keyframes circuitFlow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .pulse-network {
          animation: pulseNetwork 3s ease-in-out infinite;
        }
        .spider-web {
          animation: spiderWeb 4s ease-in-out infinite;
        }
        .circuit-flow {
          animation: circuitFlow 3s linear infinite;
          stroke-dasharray: 10;
        }
      `}</style>
    </motion.section>
  );
};

export default Summary;