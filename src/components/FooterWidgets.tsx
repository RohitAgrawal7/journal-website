import React from 'react';

const FooterWidgets: React.FC = () => {
  return (
    <div className="footer-widgets footer-widgets-4 bg-black py-8 mt-12">
      <div className="u-wrapper footer-widgets-wrap max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Publisher */}
          <aside id="sidebar-footer-1" className="widget-area c-sidebar-footer c-sidebar-footer-1">
            <section className="widget widget_block">
              <div className="wp-block-jetpack-contact-info">
                <h2 className="wp-block-heading text-lg font-bold mb-4">
                  <strong>Contact Publisher</strong>
                </h2>
                <p className="mb-2"><strong>Sri Manoranjan Madhu</strong></p>
                <div className="wp-block-jetpack-email mb-3">
                  <a 
                    href="mailto:iaphjournal@gmail.com" 
                    className="text-blue-600 hover:underline"
                  >
                    iaphjournal@gmail.com
                  </a>
                </div>
                <div className="wp-block-jetpack-address">
                  <a 
                    href="https://www.google.com/maps/search/Village+&amp; Post. Thakurnagar, ,P.S. Gaighata,,Dist. North 24 Parganas,+West Bengal,+743287+India" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Open address in Google Maps"
                    className="text-blue-600 hover:underline"
                  >
                    <div className="jetpack-address__address jetpack-address__address1">
                      Village & Post. Thakurnagar,
                    </div>
                    <div className="jetpack-address__address jetpack-address__address2">
                      P.S. Gaighata,
                    </div>
                    <div className="jetpack-address__address jetpack-address__address3">
                      Dist. North 24 Parganas
                    </div>
                    <div>
                      <span className="jetpack-address__region">West Bengal</span>{' '}
                      <span className="jetpack-address__postal">743287</span>
                    </div>
                    <div className="jetpack-address__country">India</div>
                  </a>
                </div>
              </div>
            </section>
          </aside>

          {/* Contact Chief Editor */}
          <aside id="sidebar-footer-2" className="widget-area c-sidebar-footer c-sidebar-footer-2">
            <section className="widget widget_block mb-4">
              <h2 className="wp-block-heading text-lg font-bold">
                <strong>Contact Chief Editor</strong>
              </h2>
            </section>
            <section className="widget widget_block widget_text mb-4">
              <p><strong>Dr. Nithar Ranjan Madhu</strong></p>
            </section>
            <section className="widget widget_block">
              <div className="wp-block-jetpack-contact-info">
                <div className="wp-block-jetpack-email mb-3">
                  <a 
                    href="mailto:chiefeditoriaph@gmail.com" 
                    className="text-blue-600 hover:underline"
                  >
                    chiefeditoriaph@gmail.com
                  </a>
                </div>
                <div className="wp-block-jetpack-phone mb-3">
                  <a 
                    href="tel:+919733697736" 
                    className="text-blue-600 hover:underline"
                  >
                    +91 9733697736
                  </a>
                </div>
                <div className="wp-block-jetpack-address">
                  <a 
                    href="https://www.google.com/maps/search/Nivedita+Park, ,Sarada Sarani,,P.S.-Barasat,,+Dist. North 24 Parganas,+West Bengal,+700127+India" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Open address in Google Maps"
                    className="text-blue-600 hover:underline"
                  >
                    <div className="jetpack-address__address jetpack-address__address1">
                      Nivedita Park,
                    </div>
                    <div className="jetpack-address__address jetpack-address__address2">
                      Sarada Sarani,
                    </div>
                    <div className="jetpack-address__address jetpack-address__address3">
                      P.S.-Barasat,
                    </div>
                    <div>
                      <span className="jetpack-address__city">Dist. North 24 Parganas</span>,{' '}
                      <span className="jetpack-address__region">West Bengal</span>{' '}
                      <span className="jetpack-address__postal">700127</span>
                    </div>
                    <div className="jetpack-address__country">India</div>
                  </a>
                </div>
              </div>
            </section>
          </aside>

          {/* International Office */}
          <aside id="sidebar-footer-3" className="widget-area c-sidebar-footer c-sidebar-footer-3">
            <section className="widget widget_block mb-4">
              <h2 className="wp-block-heading text-lg font-bold">
                International Office<br />
              </h2>
            </section>
            <section className="widget widget_block">
              <div className="wp-block-jetpack-contact-info">
                <div className="wp-block-jetpack-email mb-3">
                  <a 
                    href="mailto:publisher@iaph.co.in" 
                    className="text-blue-600 hover:underline"
                  >
                    publisher@iaph.co.in
                  </a>
                </div>
                <div className="wp-block-jetpack-address">
                  <a 
                    href="https://www.google.com/maps/search/91+Victoria Road, ,SN13BD,+Swindon,+ENGLAND" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Open address in Google Maps"
                    className="text-blue-600 hover:underline"
                  >
                    <div className="jetpack-address__address jetpack-address__address1">
                      91 Victoria Road,
                    </div>
                    <div className="jetpack-address__address jetpack-address__address2">
                      SN13BD
                    </div>
                    <div className="jetpack-address__city">Swindon</div>
                    <div className="jetpack-address__country">ENGLAND</div>
                  </a>
                </div>
              </div>
            </section>
          </aside>

          {/* QR Code and Map */}
          <aside id="sidebar-footer-4" className="widget-area c-sidebar-footer c-sidebar-footer-4">
            <section className="widget widget_block widget_media-image mb-6 flex justify-center">
              <figure className="wp-block-image size-large">
                <img 
                  decoding="async" 
                  src="https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/barcode.png" 
                  alt="QR Code"
                  className="max-w-full h-auto"
                />
              </figure>
            </section>
            <section className="widget widget_block">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.9033901768535!2d88.46040727048637!3d22.711220482356882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f898b3885a75f3%3A0x59381ad832ac4b04!2sNivedita%20Park%20Rd%2C%20Ramkrishnapally%2C%20Madhyamgram%2C%20West%20Bengal%20700127!5e1!3m2!1sen!2sin!4v1737113297092!5m2!1sen!2sin" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FooterWidgets;