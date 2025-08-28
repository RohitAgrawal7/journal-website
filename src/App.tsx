// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SiteBranding from './components/Banner';
import Layout from './components/Layout';
import HomeContent from './components/Summary';
import EditorialBoard from './components/EditorialBoard';
import Home from './Pages/Home';
import AuthorGuidelines from './Pages/AuthorGuidelines';
import ReviewerGuidelines from './Pages/ReviewerGuidelines';
import AimsScopePage from './Pages/About/AimsScopePage';
import CAREPage from './Pages/About/CAREPage';
import COPEPage from './Pages/About/COPEPage';
import PeerReviewProcessPage from './Pages/About/PeerReviewProcessPage';
import PrivacyStatementPage from './Pages/About/PrivacyStatementPage';
import PublicationPoliciesPage from './Pages/About/PublicationPoliciesPage';
function App() {
  return (
    <div className="App">
      <SiteBranding />
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
         {/* <Route path="/current" element={<CurrentContent />} />
          <Route path="/archives" element={<Archives />} /> */}
          {/* <Route path="/important-links" element={<ImportantLinks />} /> */}
          <Route path="/layout" element={<Layout />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/reviewer-guidelines" element={<ReviewerGuidelines />} />
           <Route path="/aims-scope" element={<AimsScopePage />} />
            <Route path="/publication-policies" element={<PublicationPoliciesPage />} />
            <Route path="/peer-review-process" element={<PeerReviewProcessPage />} />
            <Route path="/cope" element={<COPEPage />} />
            <Route path="/care" element={<CAREPage />} />
            <Route path="/privacy-statement" element={<PrivacyStatementPage />} />
          {/* <Route path="/time-of-publication" element={<TimeOfPublication />} /> */}
        {/* <Route path="/current" element={<CurrentContent />} /> */}
        <Route path="/editorial-board" element={<EditorialBoard />} />
        {/* <Route path="/archives" element={<Archives />} /> */}
      </Routes>
      {/* <Layout/> */}
    

    </div>
  );
}

export default App;