import  { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

export const ConferenceTicker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  return (
    <>
      {/* Ticker Bar - UORA Theme: Deep Indigo + Gold Accents */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          borderTop: '2px solid #fbbf24',
          borderBottom: '2px solid #fbbf24',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: '38px',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: '#fbbf24',
            color: '#1e1b4b',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            padding: '0 14px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            borderRight: '2px solid #d97706',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              background: '#1e1b4b',
              borderRadius: '50%',
              marginRight: 7,
              animation: 'blink 1.2s infinite',
            }}
          />
          Announcement
        </button>

        {/* Clickable scrolling area */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            overflow: 'hidden',
            flex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              animation: isPaused ? 'none' : 'tkscroll 28s linear infinite',
              willChange: 'transform',
            }}
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0 32px',
                  color: '#e0e7ff',
                  fontSize: '12.5px',
                  gap: 8,
                }}
              >
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>IMCSGS 2026</span>
                <span style={{ color: '#818cf8', opacity: 0.6 }}>|</span>
                International Multidisciplinary Conference on Sustainability and Green Solutions
                <span style={{ color: '#818cf8', opacity: 0.6 }}>·</span>
                28 April 2026, Jalna · Click for full details
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - Detailed UORA Branding & Conference Info */}
      {modalOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            // background: 'rgba(30, 27, 75, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px 16px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              maxWidth: 760,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header with UORA Identity */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                padding: '24px 28px 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      background: '#fbbf24',
                      color: '#1e1b4b',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 20,
                      display: 'inline-block',
                      marginBottom: 12,
                      letterSpacing: '0.5px',
                    }}
                  >
                    UORA PRESENTS
                  </div>
                  <p
                    style={{
                      color: '#fef08a',
                      fontSize: 13,
                      fontWeight: 500,
                      margin: '0 0 6px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Universal Oneness Research Association
                  </p>
                  <p
                    style={{
                      color: '#ffffff',
                      fontSize: 20,
                      fontWeight: 700,
                      margin: '0 0 8px',
                    }}
                  >
                    IMCSGS 2026
                  </p>
                  <p style={{ color: '#c7d2fe', fontSize: 13, margin: 0 }}>
                    International Multidisciplinary Conference on Sustainability and Green Solutions
                  </p>
                  <p style={{ color: '#a5b4fc', fontSize: 12, margin: '6px 0 0' }}>
                    28 April 2026 · Jalna, Maharashtra, India
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    color: '#fef08a',
                    borderRadius: '40px',
                    width: 32,
                    height: 32,
                    cursor: 'pointer',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdG_JC47CnItwlilCj7SP6cjTri8PjsLAYwWYtjU44j-yYMHw/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#fbbf24',
                    color: '#1e1b4b',
                    padding: '8px 18px',
                    borderRadius: 40,
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: '0.2s',
                  }}
                >
                  📝 Submit Paper
                </a>
                <a
                  href={encodeURI('/Confernce/MSSCET Conference.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#fef08a',
                    border: '1px solid #fbbf24',
                    padding: '8px 18px',
                    borderRadius: 40,
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  📄 Conference Brochure (PDF)
                </a>
              </div>
            </div>

            {/* Modal Body - More Detailed and Structured */}
            <div style={{ padding: '28px' }}>
              {/* Organizer & UORA Description */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 18, fontWeight: 700 }}>
                  🕊️ Organized by
                </h4>
                <p style={{ fontSize: 14, color: '#334155', marginBottom: 8 }}>
                  <strong>Universal Oneness Research Association (UORA)</strong> in collaboration with{' '}
                  <strong>Matsyodari Shikshan Sanstha’s College of Engineering & Technology, Jalna</strong>
                </p>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  UORA is a global platform dedicated to fostering interdisciplinary research, cultural harmony,
                  and sustainable development. This conference is a flagship event under UORA's "Green Future" initiative.
                </p>
              </div>

              {/* Date & Venue */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📅 Date & Venue
                </h4>
                <p style={{ fontSize: 14, color: '#334155' }}>
                  <strong>Date:</strong> 28 April 2026 (Tuesday)<br />
                  <strong>Venue:</strong> MSS College of Engineering & Technology, Jalna (Auditorium Hall)<br />
                  <strong>Mode:</strong> Hybrid (In-person & Virtual participation available)
                </p>
              </div>

              {/* About */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  🎯 About the Conference
                </h4>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.5 }}>
                  IMCSGS 2026 brings together researchers, industry leaders, policymakers, and students to exchange
                  ideas on sustainability, green technologies, and holistic solutions for environmental challenges.
                  The conference emphasizes the "Oneness" philosophy – connecting scientific innovation with social
                  and ecological well‑being.
                </p>
                <ul style={{ fontSize: 13, color: '#334155', marginTop: 8, paddingLeft: 20 }}>
                  <li>Present your research to a global audience</li>
                  <li>Network with experts from 15+ countries</li>
                  <li>Publication opportunities in UORA’s ISSN journal</li>
                  <li>Workshops on AI for sustainability & green finance</li>
                </ul>
              </div>

              {/* Broad Areas (expanded) */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>
                  🌍 Broad Areas (Multidisciplinary)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 12 }}>
                  <div>
                    <strong>⚙️ Engineering & Technology</strong>
                    <ul style={{ fontSize: 13, marginTop: 4, paddingLeft: 18 }}>
                      <li>Renewable Energy Systems</li>
                      <li>AI for Sustainability</li>
                      <li>Green Manufacturing</li>
                    </ul>
                  </div>
                  <div>
                    <strong>💼 Management & Commerce</strong>
                    <ul style={{ fontSize: 13, marginTop: 4, paddingLeft: 18 }}>
                      <li>Green Finance & ESG</li>
                      <li>Sustainable Supply Chains</li>
                      <li>Circular Economy</li>
                    </ul>
                  </div>
                  <div>
                    <strong>🔬 Science & Environment</strong>
                    <ul style={{ fontSize: 13, marginTop: 4, paddingLeft: 18 }}>
                      <li>Climate Change Mitigation</li>
                      <li>Biodiversity Conservation</li>
                      <li>Pollution Control Tech</li>
                    </ul>
                  </div>
                  <div>
                    <strong>🏙️ Interdisciplinary</strong>
                    <ul style={{ fontSize: 13, marginTop: 4, paddingLeft: 18 }}>
                      <li>Smart & Sustainable Cities</li>
                      <li>Policy & Governance</li>
                      <li>Social Innovation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tracks */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📚 Conference Tracks
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[
                    'Green Technology & Renewable Energy',
                    'Smart Cities & Urban Sustainability',
                    'AI, IoT & Data Science for Green Future',
                    'Environmental Engineering & Waste Management',
                    'Green Finance, CSR & Sustainable Business',
                    'Climate Policy & International Relations',
                  ].map((track) => (
                    <span
                      key={track}
                      style={{
                        background: '#ede9fe',
                        color: '#4c1d95',
                        fontSize: 12,
                        padding: '4px 12px',
                        borderRadius: 30,
                      }}
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              {/* Important Dates (updated to match your original) */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📌 Important Dates
                </h4>
                <ul style={{ fontSize: 14, color: '#334155', paddingLeft: 20 }}>
                  <li><strong>Paper Submission Deadline:</strong> 24 April 2026</li>
                  <li><strong>Acceptance Notification:</strong> 26 April 2026</li>
                  <li><strong>Registration Deadline:</strong> 24 April 2026</li>
                  <li><strong>Conference Date:</strong> 28 April 2026</li>
                </ul>
              </div>

              {/* Call for Papers */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📄 Call for Papers
                </h4>
                <p style={{ fontSize: 14, color: '#334155' }}>
                  We invite original, unpublished papers from:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                  {['UG/PG Students', 'PhD Scholars', 'Academicians', 'Industry Experts', 'Policy Makers'].map(
                    (group) => (
                      <span
                        key={group}
                        style={{
                          background: '#f1f5f9',
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          color: '#1e293b',
                        }}
                      >
                        {group}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Publication & Fees */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📖 Publication & Registration
                </h4>
                <p style={{ fontSize: 14, color: '#334155' }}>
                  <strong>Publication:</strong> All accepted papers will be published in the{' '}
                  <strong>Universal Journal of Green Sci-Tech and Management (UORA)</strong> – ISSN, Double‑blind peer review.
                </p>
                <p style={{ fontSize: 14, color: '#334155', marginTop: 8 }}>
                  <strong>Registration Fees:</strong>
                </p>
                <ul style={{ fontSize: 13, color: '#334155', paddingLeft: 20 }}>
                  <li>UG / PG Students: ₹1500</li>
                  <li>PhD / Faculty / Industry: ₹2000</li>
                  <li>International Participants: ₹3000 (includes conference kit + publication fee)</li>
                </ul>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
                  * Early bird discount available until 15 April 2026.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
                  📞 Contact
                </h4>
                <p style={{ fontSize: 14, color: '#334155' }}>
                  <strong>Conference Secretariat (UORA)</strong><br />
                  Email: <a href="mailto:contact@uorapublications.com" style={{ color: '#7c3aed' }}>contact@uorapublications.com</a><br />
                  Phone: +91 9766930707 / 9096499989<br />
                  Website: <a href="#" style={{ color: '#7c3aed' }}>www.uora.org/imcsgs2026</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes tkscroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }
        `}
      </style>
    </>
  );
};