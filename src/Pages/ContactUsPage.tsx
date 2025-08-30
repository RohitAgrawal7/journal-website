import React from 'react';

const ContactUsPage = () => {
  return (
    <main className="site-main max-w-6xl mx-auto px-4 py-8">
      <article className="pb-article pb-singular">
        <header className="entry-header mb-8">
          <h1 className="entry-title text-3xl font-bold text-gray-800">Contact Us</h1>
        </header>

        <div className="pb-content">
          <div className="entry-content space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Get in Touch</h2>
              <p>
                We welcome your questions, comments, and feedback. Please feel free to contact us using 
                the information below or through the provided contact forms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Publisher */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-light-green mb-4">
                  <strong>Contact Publisher</strong>
                </h2>
                <p className="mb-3"><strong>Sri Manoranjan Madhu</strong></p>
                <div className="mb-3">
                  <a 
                    href="mailto:iaphjournal@gmail.com" 
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
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

              {/* Contact Chief Editor */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-light-green mb-4">
                  <strong>Contact Chief Editor</strong>
                </h2>
                <p className="mb-3"><strong>Dr. Nithar Ranjan Madhu</strong></p>
                <div className="mb-3">
                  <a 
                    href="mailto:chiefeditoriaph@gmail.com" 
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    chiefeditoriaph@gmail.com
                  </a>
                </div>
                <div className="mb-3">
                  <a 
                    href="tel:+919733697736" 
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
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
            </div>

            {/* International Office */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-light-green mb-4">International Office</h2>
              <div className="mb-3">
                <a 
                  href="mailto:publisher@iaph.co.in" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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

            {/* Map and QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-light-green mb-4">Our Location</h2>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.9033901768535!2d88.46040727048637!3d22.711220482356882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f898b3885a75f3%3A0x59381ad832ac4b04!2sNivedita%20Park%20Rd%2C%20Ramkrishnapally%2C%20Madhyamgram%2C%20West%20Bengal%20700127!5e1!3m2!1sen!2sin!4v1737113297092!5m2!1sen!2sin" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-light-green mb-4">Scan to Contact</h2>
                <div className="flex justify-center">
                  <img 
                    decoding="async" 
                    src="https://qtanalytics.in/journals/public/site/images/chiefeditoriaph/barcode.png" 
                    alt="QR Code for contact"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-center mt-4 text-gray-600">
                  Scan this QR code to save our contact information
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-light-green mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter the subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Type your message here"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-teal-700 hover:bg-light-green text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ContactUsPage;