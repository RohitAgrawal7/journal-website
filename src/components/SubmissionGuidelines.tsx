import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    title: 'Manuscript Submission',
    description: 'Submit your manuscript via our online portal (DOC, DOCX, or RTF formats). Include a Cover Letter cum Declaration Form specifying the research field.',
  },
  {
    title: 'Plagiarism Screening',
    description: 'All submissions are screened for plagiarism using tools like Turnitin. Authors must provide a text similarity report.',
  },
  {
    title: 'Double-Blind Review',
    description: 'Manuscripts are evaluated by at least two expert reviewers (one from India, one from abroad) for quality and relevance.',
  },
  {
    title: 'Review Outcome',
    description: 'Authors receive feedback within 25+ days: accepted, revisions required, or rejected.',
  },
  {
    title: 'Final Submission',
    description: 'Submit any required revisions and the Author Declaration form for accepted papers.',
  },
  {
    title: 'Online Publication',
    description: 'Accepted papers are published online in the next available issue, accessible globally.',
  },
];

const schedule = [
  { issue: 'Issue 1 (2025)', date: 'May 15, 2025' },
  { issue: 'Issue 2 (2025)', date: 'July 15, 2025' },
  { issue: 'Issue 3 (2025)', date: 'September 15, 2025' },
  { issue: 'Issue 4 (2025)', date: 'November 15, 2025' },
  { issue: 'Issue 5 (2026)', date: 'January 15, 2026' },
  { issue: 'Issue 6 (2026)', date: 'March 15, 2026' },
];

const SubmissionGuidelines = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.section
      id="submission"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 bg-neutral text-green-400"
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-8 text-center text-primary">
        Submission Guidelines
      </h2>
      <div className="max-w-4xl mx-auto prose text-green-200 text-left mb-12 text-xl">
        <p className="leading-relaxed mb-8 ">
          Authors are invited to submit manuscripts through our online submission system (to be established). Submissions must include a Cover Letter cum Declaration Form specifying the research field and subject area to assist editors in assigning appropriate reviewers. </p>
        <p className="leading-relaxed mb-8">
         Publication Schedule :</p>
<p className="leading-relaxed"> The journal is published bi-monthly, with the first issue scheduled for May 15, 2025, and subsequent issues released every two months thereafter (July 15, September 15, November 15, January 15, March 15, etc.). Submissions are accepted on a rolling basis, and accepted articles are published in the next available issue. </p>
      </div>

      {/* Submission Steps */}
      {/* <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
            <p className="text-gray-700 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div> */}

      {/* Publication Schedule and Additional Info */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
          Publication Schedule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {schedule.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <p className="font-semibold text-amber-600">{item.issue}</p>
              <p className="text-gray-700">{item.date}</p>
            </motion.div>
          ))}
        </div>
        <div className="prose text-green-200 text-left">
          <p className="leading-relaxed">
            <strong>Special Volumes:</strong> We occasionally publish theme-based special issues. Authors and editorial board members are welcome to suggest themes to enhance the journal’s quality and relevance.
          </p>
          <p className="leading-relaxed">
            <strong>Acknowledgement:</strong> Authors will receive an acknowledgement within 7 days of submission.
          </p>
          <p className="leading-relaxed">
            <strong>Final Decision:</strong> The review process typically takes 25+ days, after which authors receive a final decision: accepted, revisions required, or rejected.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <motion.a
          href="#submit"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition text-lg font-semibold"
        >
          Submit Your Manuscript
        </motion.a>
      </div>
    </motion.section>
  );
};

export default SubmissionGuidelines;