import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const schedule = [
  { issue: 'Issue 1 (2025)', date: 'May 15, 2025' },
  { issue: 'Issue 2 (2025)', date: 'July 15, 2025' },
  { issue: 'Issue 3 (2025)', date: 'September 15, 2025' },
  { issue: 'Issue 4 (2025)', date: 'November 15, 2025' },
  { issue: 'Issue 5 (2026)', date: 'January 15, 2026' },
  { issue: 'Issue 6 (2026)', date: 'March 15, 2026' },
];

const SubmissionGuidelines = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="submission"
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
        Submission Guidelines
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        Authors are invited to submit manuscripts through our online submission system (to be established). Submissions must include a Cover Letter cum Declaration Form specifying the research field and subject area to assist editors in assigning appropriate reviewers.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-2xl font-roboto-slab font-bold text-eco-gold mb-4"
      >
        Publication Schedule
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        The journal is published bi-monthly, with the first issue scheduled for May 15, 2025, and subsequent issues released every two months thereafter (July 15, September 15, November 15, January 15, March 15, etc.). Submissions are accepted on a rolling basis, and accepted articles are published in the next available issue.
      </motion.p>
      <motion.table
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="w-full text-left text-green-200 mb-4"
      >
        <thead>
          <tr>
            <th className="border-b border-vibrant-green py-2">Issue</th>
            <th className="border-b border-vibrant-green py-2">Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.0 + idx * 0.1 }}
            >
              <td className="py-2">{item.issue}</td>
              <td className="py-2">{item.date}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        Special Volumes: Published based on specific themes or needs.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="text-lg text-green-200 mb-4 leading-relaxed"
      >
        Acknowledgement: Within 7 days of submission.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="text-lg text-green-200 leading-relaxed"
      >
        Final Decision: Approximately 25+ days from submission.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="text-lg text-green-200 leading-relaxed"
      >
        Detailed submission guidelines will be available soon on our submission page.
      </motion.p>
    </motion.section>
  );
};

export default SubmissionGuidelines;