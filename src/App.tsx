// src/App.js
import React from 'react';
import { motion } from 'framer-motion';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Summary from  './components/Summary';
import AboutJournal from './components/AboutJournal';
import SubmissionGuidelines from './components/SubmissionGuidelines';
import EditorialBoard from './components/EditorialBoard';
import CurrentIssue from './components/CurrentIssue';
import Archives from './components/Archives';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0c2318] to-[#1a3b2a]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Floating Leaves */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-green-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
              x: [0, 20, -20, 40, -40, 20, -20, 0, 20, -20, 0],
              rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
              <path d="M17 8C8 10 5.9 16.8 4 18c1.9.4 4.5-1.3 6-2 2.3.1 4.5-1 6-2-1.3-1.9-1.5-5.3 1-6M5 15c-.4-.3-1.5-.7-1.5-.7.1.9.4 1.5.7 1.7z" />
            </svg>
          </motion.div>
        ))}
        
        {/* Floating Science Icons */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`science-${i}`}
            className="absolute text-green-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, 50, 100, 150, 200, 250, 300],
              x: [0, 20, -20, 40, -40, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
              </svg>
            ) : i % 3 === 1 ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
              </svg>
            )}
          </motion.div>
        ))}
        
        {/* Pulsing Earth */}
        <motion.div 
          className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#2a9d8f] to-[#21867a] opacity-10"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,0 L100,100 M100,0 L0,100" stroke="#2a9d8f" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="#2a9d8f" />
              <circle cx="20" cy="20" r="3" fill="#2a9d8f" />
              <circle cx="80" cy="80" r="3" fill="#2a9d8f" />
              <circle cx="20" cy="80" r="3" fill="#2a9d8f" />
              <circle cx="80" cy="20" r="3" fill="#2a9d8f" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Banner />
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Summary />
          <AboutJournal />
          <SubmissionGuidelines />
          <EditorialBoard />
          <CurrentIssue />
          <Archives />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;