import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside id="secondary" className="widget-area c-sidebar c-sidebar-right w-full md:w-80 lg:w-96 pl-0 md:pl-6 mt-8 md:mt-0">
      <div className="inner-wrapper-sticky" style={{ position: 'relative' }}>
        {/* Journal Cover */}
        <section className="widget widget_block widget_media_image mb-6">
          <div className="wp-block-image wp-duotone-unset-1">
            <figure className="aligncenter size-full is-resized flex justify-center">
              <a href="https://qtanalytics.in/journals/index.php/IJERR/issue/view/222">
                <img
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={424}
                  src="https://iaph.in/wp-content/uploads/2025/01/Journal-Cover-1.jpg"
                  alt="Journal Cover"
                  className="wp-image-938 rounded-lg shadow-md"
                  style={{ width: '242px', height: 'auto' }}
                  srcSet="https://iaph.in/wp-content/uploads/2025/01/Journal-Cover-1.jpg 300w, https://iaph.in/wp-content/uploads/2025/01/Journal-Cover-1-212x300.jpg 212w"
                  sizes="auto, (max-width: 300px) 100vw, 300px"
                />
              </a>
            </figure>
          </div>
        </section>

        {/* Make a Submission Button */}
        <section className="widget widget_block mb-6">
          <div className="wp-block-group">
            <div className="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
              <div className="wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
                <div className="wp-block-button is-style-fill">
                  <a
                    className="wp-block-button__link text-white bg-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 inline-block"
                    href="https://qtanalytics.in/journals/index.php/IJERR/about/submissions"
                  >
                    Make a Submission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database Heading */}
        <section className="widget widget_block mb-6">
          <h4 className="wp-block-heading text-lg font-bold text-gray-800 text-center">
            <strong>Click to view us on the world's database -</strong>
          </h4>
        </section>

        {/* Database Links */}
        {[
          {
            id: 'block-23',
            href: 'https://wbsubregistration.academia.edu/InternationalJournalofExperimentalResearchandReviewIAPH',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/ae.png',
            alt: 'Academia.edu'
          },
          {
            id: 'block-24',
            href: 'https://search.crossref.org/?q=2455-4855&from_ui=yes%20',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/CR_doi.png',
            alt: 'Crossref'
          },
          {
            id: 'block-25',
            href: 'https://qtanalytics.in/journals/index.php/IJERR/crossmarkpolicy',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/CU.png',
            alt: 'Crossmark'
          },
          {
            id: 'block-26',
            href: 'https://europub.co.uk/journals/international-journal-of-experimental-research-and-review-J-29269',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/EP.png',
            alt: 'EuroPub'
          },
          {
            id: 'block-27',
            href: 'https://scholar.google.com/citations?hl=en&user=C_RSGo8AAAAJ&scilu=&scisig=AMD79ooAAAAAYJFPJwVUjnSdHJMirwAuM1AE9Xyt29Qf&gmla=AJsN-F6C6FOcC1BVTsciMh_jJzbvDlMEAG7iXtc54pVkOEW1hM7YEYd0LOg2Y8qtljAtMcH7BVFXYAhy5RDj-qOlv86g_Xbpuk9zP4-L0jeteDVxAP9q5gI4HuzCkta1GM4nN1_wzT3Z&sciund=9397875962564903239',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/GS.png',
            alt: 'Google Scholar'
          },
          {
            id: 'block-28',
            href: 'https://archive.org/details/@international_journal_of_experimental_research_and_review',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/iA.png',
            alt: 'Internet Archive'
          },
          {
            id: 'block-29',
            href: 'https://www.icmje.org/journals-following-the-icmje-recommendations/',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/icmje.png',
            alt: 'ICMJE'
          },
          {
            id: 'block-30',
            href: 'https://journals.indexcopernicus.com/search/journal/issue?issueId=all&journalId=122825',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/INDEX_COPERNICUS.png',
            alt: 'Index Copernicus'
          },
          {
            id: 'block-31',
            href: 'https://qtanalytics.in/journals/index.php/IJERR/Acceptance_Rate_AR',
            src: 'https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/AR2.png',
            alt: 'Acceptance Rate'
          }
        ].map((item) => (
          <section key={item.id} className="widget widget_block widget_media_image mb-4">
            <div className="wp-block-image">
              <figure className="aligncenter size-large is-resized flex justify-center">
                <a href={item.href}>
                  <img
                    decoding="async"
                    src={item.src}
                    alt={item.alt}
                    className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{ width: '302px' }}
                  />
                </a>
              </figure>
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;