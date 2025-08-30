import React, { useState } from 'react';
import { FaBook, FaLeaf, FaChartLine, FaRobot, FaTools, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const navItems = [
    { id: 'about', label: 'About UORA' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'journals', label: 'Journals' },
    { id: 'policies', label: 'Editorial Policies' },
    { id: 'ethics', label: 'Publication Ethics' },
    { id: 'contact', label: 'Contact' },
  ];

  const journals = [
    { name: 'Universal Journal of Green SciTech & Management (UJGSM)', focus: 'Science, Technology & Management', icon: FaBook },
    { name: 'GreenTech Innovative Society (GTIS)', focus: 'Science, Technology & Green Innovations', icon: FaLeaf },
    { name: 'Journal of Management Innovations (JMI)', focus: 'Business & Management', icon: FaChartLine },
    { name: 'Smart Computing & AI Research (SCAR)', focus: 'Computer Science, AI & Data Science', icon: FaRobot },
    { name: 'Sustainable Engineering & Materials (SEM)', focus: 'Mechanical, Civil, Materials', icon: FaTools },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-deep-green to-vibrant-green text-black sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-2">
            <FaBook className="text-2xl" />
            <span className="text-xl font-bold">UORA</span>
          </div>
          <nav className="space-x-6 hidden md:block">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-eco-gold transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-green to-rich-green text-black py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Universal Oneness in Research Association (UORA)</h1>
          <p className="text-lg md:text-xl mb-6">Publisher of high-quality peer-reviewed journals in Science, Technology, and Management.</p>
          <a
            href="#contact"
            className="bg-eco-gold text-deep-green font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">About UORA</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Universal Oneness in Research Association (UORA) is a publishing organization committed to advancing knowledge in Science, Technology, Management, and allied disciplines. UORA ensures ethical publishing, quality peer-review, and open access dissemination of research work.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-deep-green mb-2">Mission</h3>
              <p className="text-gray-600">To promote high-quality research publication across multidisciplinary fields with focus on Science, Technology, and Management.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-deep-green mb-2">Vision</h3>
              <p className="text-gray-600">To become a leading global publisher of peer-reviewed journals, fostering innovation, sustainability, and academic excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journals Section */}
      <section id="journals" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">Journals under UORA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <journal.icon className="text-vibrant-green text-3xl mb-3" />
                <h3 className="text-lg font-semibold text-deep-green mb-2">{journal.name}</h3>
                <p className="text-gray-600">{journal.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Policies */}
      <section id="policies" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">Editorial Policies</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Double-blind peer-review for all journals.</li>
            <li>Mandatory plagiarism check for all submissions.</li>
            <li>Adherence to COPE-inspired ethical standards.</li>
            <li>Open access publication to facilitate knowledge dissemination.</li>
          </ul>
        </div>
      </section>

      {/* Publication Ethics */}
      <section id="ethics" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">Publication Ethics</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            UORA strictly follows ethical guidelines for academic publishing, ensuring originality, proper citation, and transparency in research. Authors, reviewers, and editors are expected to adhere to these standards.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-vibrant-green mb-6 text-center">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-deep-green mb-4">Get in Touch</h3>
              <p className="flex items-center text-gray-600 mb-2"><FaEnvelope className="mr-2" /> Email: contact@uora.org</p>
              <p className="flex items-center text-gray-600 mb-2"><FaPhone className="mr-2" /> Phone: +91-XXXXXXXXXX</p>
              <p className="flex items-center text-gray-600"><FaMapMarkerAlt className="mr-2" /> Address: Universal Oneness in Research Association, India</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-deep-green mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-vibrant-green"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-vibrant-green"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-vibrant-green"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-vibrant-green text-white font-semibold py-2 px-4 rounded hover:bg-deep-green transition-colors duration-200"
                >
                  Send Message
                </button>
                {submitted && <p className="text-green-600 mt-2">Message sent successfully!</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-deep-green to-vibrant-green text-white py-8">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p>&copy; 2025 Universal Oneness in Research Association. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;