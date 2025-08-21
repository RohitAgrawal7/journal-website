import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const boardMembers = [
  {
    name: 'Prof. Pawan D. Somavanshi',
    role: 'Editor-in-Chief',
    affiliation: 'Government College of Engineering Aurangabad, MH, India',
    email: 'pawansomavanshi.PhD@geca.ac.in, pawansomavanshi5jan@gmail.com',
    mobile: '+91 90964 99989',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Swapnil N. Dhole',
    role: 'Managing Editor',
    affiliation: 'Training and Placement Officer,MSS’s College of Engineering and Technology, Jalna, MH, India',
    email: 'dholeswapnil25@gmail.com',
    mobile: '+91 89832 45607',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Vikram Bhutekar',
    role: 'Associate Professor',
    affiliation: 'Sant Dnyaneshwar College of Arts and Science, Soygaon',
    email: 'vikrambhutekar55@gmail.com',
    mobile: '9404001055',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Kartik Sheshrao Gawande',
    role: 'Professor & HOD',
    affiliation: 'History Dept, Karmayogi Ankushrao Tope College Arts, Commerce and Science',
    email: 'kartikgawande111@gmail.com',
    mobile: '9422721459',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Manoj Dnyanba Mate',
    role: 'Central Training and Placement Coordinator',
    affiliation: 'CSMSS CSCOE',
    email: 'manojmate28@gmail.com',
    mobile: '9423745212',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Gopnarayan Ramesh Shilvant',
    role: 'Assistant Professor',
    affiliation: 'Siddharth Library & Information Science College, Padegaon, Chhatrapati Sambhajinagar',
    subject: 'BLib/MLib Library Science',
    email: 'shilvantgopnarayan@rediffmail.com',
    mobile: '9527368431 / 7028280218',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Pramod Herode',
    role: 'Principal',
    affiliation: 'Dr. Ambedkar College of Law, Chhatrapati Sambhajinagar',
    email: 'pramod.herode@gmail.com',
    mobile: '9403629469',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Milind Athawale',
    role: 'Assistant Professor',
    affiliation: 'Master in Mass Communication & Journalism (MAMCJ), Siddharth Library & Information Science College, Chhatrapati Sambhajinagar',
    email: 'drmilindathawale@gmail.com',
    mobile: '9404478565',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Shantisagar K Biradar',
    role: 'Principal',
    affiliation: 'Matsyodari Shikshan Sanstha’s College of Engineering & Technology, Jalna',
    email: 'shantisagarbiradar@gmail.com',
    mobile: '9822628679',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Manohar Sakharam Wankhade',
    role: 'Principal',
    affiliation: 'Siddharth Library & Information Science College, Chhatrapati Sambhajinagar',
    email: 'manoharwankhade@gmail.com',
    mobile: '9850141764',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Dr. Yuvraj Dhabadge',
    role: 'Professor',
    affiliation: 'Dagdujirao Deshmukh Arts, Commerce & Science College, Waluj, Chhatrapati Sambhajinagar',
    email: 'yuvrajdhabadge@gmail.com',
    mobile: '9823208074',
    image: 'https://via.placeholder.com/100',
  },
];

const EditorialBoard = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="editorial-board"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 bg-neutral"
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-12 text-center text-green-600">
        Editorial Board
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {boardMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary hover:border-secondary/80 transition-all"
          >
            <div className="flex items-center space-x-4">
              <img
                src={member.image}
                alt={`${member.name} profile`}
                className="w-20 h-20 rounded-full object-cover border-2 border-green-700"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-amber-700 leading-relaxed">{member.name}</h3>
                <p className="text-green-800 leading-relaxed">{member.role}</p>
                <p className="text-green-800 text-sm leading-relaxed">{member.affiliation}</p>
                {member.subject && (
                  <p className="text-green-800 text-sm leading-relaxed">Subject: {member.subject}</p>
                )}
                {member.email && (
                  <p className="text-green-800 text-sm leading-relaxed">Email: {member.email}</p>
                )}
                {member.mobile && (
                  <p className="text-green-800 text-sm leading-relaxed">Mobile: {member.mobile}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EditorialBoard;