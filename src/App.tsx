import { motion } from 'framer-motion';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import AboutJournal from './components/AboutJournal';
import SubmissionGuidelines from './components/SubmissionGuidelines';
import EditorialBoard from './components/EditorialBoard';
import CurrentIssue from './components/CurrentIssue';
import Archives from './components/Archives';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen"
    >
      <Banner />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Welcome />
        <AboutJournal />
        <SubmissionGuidelines />
        <EditorialBoard />
        <CurrentIssue />
        <Archives />
        <Certifications />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;