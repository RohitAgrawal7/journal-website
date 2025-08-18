import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const boardMembers = [
  { 
    name: 'Prof. Pawan D. Somavanshi', 
    role: 'Editor-in-Chief', 
    affiliation: 'Research Scholar, Government College of Engineering Aurangabad, MH, India' 
  },
  { 
    name: 'Dr. Swapnil N. Dhole', 
    role: 'Managing Editor', 
    affiliation: 'Training and Placement Officer, MSS’s College of Engineering and Technology, Jalna, MH, India', 
    email: 'dholeswapnil25@gmail.com', 
    mobile: '+91 89832 45607' 
  },
  { 
    name: 'Dr. Vikram Bhutekar', 
    role: 'Associate Professor', 
    affiliation: 'Sant Dnyaneshwar College of Arts and Science, Soygaon', 
    subject: 'Sociology (Samajshastra)', 
    email: 'vikrambhutekar55@gmail.com', 
    mobile: '9404001055' 
  },
  { 
    name: 'Dr. Kartik Sheshrao Gawande', 
    role: 'Professor & HOD, History Dept', 
    affiliation: 'Karmayogi Ankushrao Tope College Arts, Commerce and Science', 
    subject: 'History', 
    email: 'kartikgawande111@gmail.com', 
    mobile: '9422721459' 
  },
  { 
    name: 'Dr. Manoj Dnyanba Mate', 
    role: 'CSMSS CSCOE, Central Training and Placement Coordinator', 
    affiliation: '', 
    subject: 'English Literature', 
    email: 'manojmate28@gmail.com', 
    mobile: '9423745212' 
  },
  { 
    name: 'Dr. Gopnarayan Ramesh Shilvant', 
    role: 'Assistant Professor', 
    affiliation: 'Siddharth Library & Information Science College, Padegaon, Chhatrapati Sambhajinagar', 
    subject: 'BLib/MLib Library Science', 
    email: 'shilvantgopnarayan@rediffmail.com', 
    mobile: '9527368431 / 7028280218' 
  },
  { 
    name: 'Dr. Pramod Herode', 
    role: 'Principal', 
    affiliation: 'Dr. Ambedkar College of Law, Chhatrapati Sambhajinagar', 
    subject: 'Law', 
    email: 'pramod.herode@gmail.com', 
    mobile: '9403629469' 
  },
  { 
    name: 'Dr. Milind Athawale', 
    role: 'Assistant Professor', 
    affiliation: 'Master in Mass Communication & Journalism (MAMCJ), Siddharth Library & Information Science College, Chhatrapati Sambhajinagar', 
    subject: 'Mass Communication & Journalism', 
    email: 'drmilindathawale@gmail.com', 
    mobile: '9404478565' 
  },
  { 
    name: 'Dr. Shantisagar K Biradar', 
    role: 'Principal', 
    affiliation: 'Matsyodari Shikshan Sanstha’s College of Engineering & Technology, Jalna', 
    subject: 'Mechanical Engineering', 
    email: 'shantisagarbiradar@gmail.com', 
    mobile: '9822628679' 
  },
  { 
    name: 'Dr. Manohar Sakharam Wankhade', 
    role: 'Principal', 
    affiliation: 'Siddharth Library & Information Science College, Chhatrapati Sambhajinagar', 
    subject: 'Commerce and Management', 
    email: 'manoharwankhade@gmail.com', 
    mobile: '9850141764' 
  },
  { 
    name: 'Dr. Yuvraj Dhabadge', 
    role: 'Professor', 
    affiliation: 'Dagdujirao Deshmukh Arts, Commerce & Science College, Waluj, Chhatrapati Sambhajinagar', 
    subject: 'Marathi', 
    email: 'yuvrajdhabadge@gmail.com', 
    mobile: '9823208074' 
  },
];

const EditorialBoard = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="editorial-board"
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
        Editorial Board
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boardMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-rich-green p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-eco-gold mb-2">{member.name}</h3>
            <p className="text-green-200 mb-1">{member.role}</p>
            <p className="text-green-200 mb-1">{member.affiliation}</p>
            {member.subject && <p className="text-green-200 mb-1">Subject: {member.subject}</p>}
            {member.email && <p className="text-green-200 mb-1">Email: {member.email}</p>}
            {member.mobile && <p className="text-green-200">Mobile: {member.mobile}</p>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EditorialBoard;