// App.tsx
// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SiteBranding from './components/Banner';
import Layout from './components/Layout';
import HomeContent from './components/Summary';
import EditorialBoard from './components/EditorialBoard';
import Home from './Pages/Home';
// import Home from './Pages/Home';
import AuthorGuidelines from './Pages/View/AuthorGuidelines';
import ReviewerGuidelines from './Pages/View/ReviewerGuidelines';
import AimsScopePage from './Pages/About/AimsScopePage';
import CAREPage from './Pages/About/CAREPage';
import COPEPage from './Pages/About/COPEPage';
import PeerReviewProcessPage from './Pages/About/PeerReviewProcessPage';
import PrivacyStatementPage from './Pages/About/PrivacyStatementPage';
import PublicationPoliciesPage from './Pages/About/PublicationPoliciesPage';
import Footer from './components/Footer';
import UpcomingContent from './Pages/UpcomingContent';
import SubmitPaperPage from './Pages/Submission/SubmitPaperPage';
import CopyrightFormPage from './Pages/Submission/CopyrightFormPage';
import ManuscriptTemplatePage from './Pages/Submission/ManuscriptTemplatePage';
import ContactUsPage from './Pages/ContactUsPage';
import ArticleProcessingCharges from './Pages/View/ArticleProcessingCharges';
// import TimeAndOpenAccess from './Pages/View/TimeAndOpenAccess';
import TimeOfPublication from './Pages/View/TimeAndOpenAccess';
import CurrentIssue from './components/CurrentIssue';
import Archives from './components/Archives';
import PlagiarismPolicy from './Pages/About/PlagiarismPolicy';
import AIGeneratedContentPolicy from './Pages/About/AIGeneratedContentPolicy';
import TrackPaper from './Pages/Submission/TrackPaper';
import ApplyAsReviewer from './Pages/Submission/ApplyAsReviewer';
// import SubmissionConfirmationPage from './Pages/Submission/SubmissionConfirmationPage';
import SubmissionsList from './Pages/Submission/SubmissionsList';
import ReviewerApplicationsList from './Pages/Submission/ReviewerApplicationsList';
// import Home from './Pages/View/Home';
import JournalIssueTOC from './Pages/Volumes/Issue1';
function App() {
  return (
    <div className="App">
      <SiteBranding />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         {/* <Route path="/current" element={<CurrentContent />} />
          <Route path="/archives" element={<Archives />} /> */}
          {/* <Route path="/important-links" element={<ImportantLinks />} /> */}
          <Route path="/layout" element={
            <>
              <Layout />
              <Footer />
            </>
          } />
          <Route path="/about-the-journal" element={<HomeContent />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/reviewer-guidelines" element={<ReviewerGuidelines />} />
          <Route path="/article-processing-charges" element={<ArticleProcessingCharges />} />
          <Route path="/time-of-publication" element={<TimeOfPublication />} />
            <Route path="/author-guidelines" element={<AuthorGuidelines />} />
           <Route path="/aims-scope" element={<AimsScopePage />} />
            <Route path="/open-access-policy" element={<PublicationPoliciesPage />} />
            <Route path="/peer-review-process" element={<PeerReviewProcessPage />} />
            <Route path="/cope" element={<COPEPage />} />
            <Route path="/plagiarism-policy" element={<PlagiarismPolicy />} />
            <Route path="/care" element={<CAREPage />} />
            <Route path="/privacy-statement" element={<PrivacyStatementPage />} />
            <Route path="/ai-generated-content-policy" element={<AIGeneratedContentPolicy />} />
          {/* <Route path="/time-of-publication" element={<TimeOfPublication />} /> */}
          <Route path="/photo-gallery" element={<UpcomingContent />} />
          <Route path="/abstracting-indexing" element={<UpcomingContent />} />
          <Route path="/announcements" element={<UpcomingContent />} />

          <Route path="/reviewer-guidelines" element={<ReviewerGuidelines />} />
          
        

          {/* New submission routes */}
          <Route path="/submit-paper" element={<SubmitPaperPage />} />
          <Route path="/track-paper" element={<TrackPaper />} />
          <Route path="/apply-as-reviewer" element={<ApplyAsReviewer />} />
          <Route path="/copyright-form" element={<CopyrightFormPage />} />
          <Route path="/manuscript-template" element={<ManuscriptTemplatePage />} />
        <Route path="/current" element={<CurrentIssue />} />
        <Route path="/editorial-board" element={<EditorialBoard />} />
        {/* Archives + issue + PDF routes (deep links so browser Back works smoothly) */}
        <Route path="/archives" element={<Archives />} />
        {/* <Route path="/archives/:issueId" element={<JournalIssueTOC />} />
        <Route path="/archives/:issueId/:pdfId" element={<JournalIssueTOC />} /> */}

        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/issue1" element={<JournalIssueTOC />} />
        <Route path="/issue2" element={<UpcomingContent />} />
        <Route path="/issue3" element={<UpcomingContent />} />
        <Route path="/issue4" element={<UpcomingContent />} />
        <Route path="/issue5" element={<UpcomingContent />} />
        <Route path="/issue6" element={<UpcomingContent />} />

        <Route path="/submissions-list" element={<SubmissionsList/>} />
        <Route path="/reviewer-applications-list" element={<ReviewerApplicationsList />} />

       x
      </Routes>
     
      {/* <Layout/> */}
    

    </div>
  );
}

export default App;