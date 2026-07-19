import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMapPin, FiCompass, FiCalendar, FiUsers, FiSearch, FiX, FiCheck, FiChevronRight, FiUser, FiHeart } from 'react-icons/fi';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Pakistan');
  const [index, setIndex] = useState(0);

  // New Interactive States for Features
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isTripBuilderOpen, setIsTripBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Expanded Database Grouped By Destinations (Dynamic Explorer Hub)
  const destDatabase = {
    Pakistan: [
      { id: 101, country: 'Pakistan', title: 'HUNZA VALLEY LUXE', price: '$1,800', img: 'https://images.unsplash.com/photo-1624531054366-027598813353?q=80&w=600&auto=format&fit=crop', desc: 'Experience the premium cultural retreat under Mount Rakaposhi.', days: ['Arrival in Gilgit & luxury transfer to Hunza', 'Private tour of Altit & Baltit forts', 'Attabad Lake high-speed luxury boating', 'Departure via scenic helicopter flight'] },
      { id: 102, country: 'Pakistan', title: 'SKARDU GLACIAL TRAILS', price: '$2,200', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop', desc: 'Witness the surreal cold deserts and Shangrila resorts.', days: ['Landing at Skardu Airport', 'Boating at Upper Kachura lake', 'Deosai Plains private safari tour', 'Corporate high-tea at Shigar Fort'] }
    ],
    Switzerland: [
      { id: 201, country: 'Switzerland', title: 'SWISS ALPINE ESCAPE', price: '$2,500', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop', desc: 'Premium chalets and private ski passes in Zermatt.', days: ['Zurich Airport private limousine meetup', 'Zermatt eco-resort check-in', 'Private skiing session with world champions', 'Panoramic glacier helicopter tour'] }
    ],
    Iceland: [
      { id: 301, country: 'Iceland', title: 'AURORA GLASSHOUSE', price: '$4,100', img: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600&auto=format&fit=crop', desc: 'Sleep under Northern Lights in customized transparent luxury domes.', days: ['Reykjavík golden circle customized drive', 'Blue Lagoon private spa reservation', 'Ice Cave dynamic exploration', 'Superjeep hunting for Northern Lights'] }
    ],
    Norway: [
      { id: 401, country: 'Norway', title: 'FJORD SUPERYACHT', price: '$5,400', img: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?q=80&w=600&auto=format&fit=crop', desc: 'Sail deep inside private fjords with on-board elite chefs.', days: ['Oslo luxury yacht onboarding', 'Fjord cruising through Geirangerfjord', 'Kayaking in glassy crystal waters', 'Seafood gourmet processing experience'] }
    ],
    Europe: [
      { id: 501, country: 'Peru', title: 'MACHU PICCHU PRIVÉ', price: '$1,400', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94adb1?q=80&w=600&auto=format&fit=crop', desc: 'Luxury train transfers and heritage VIP access vouchers.', days: ['Cusco colonial suite check-in', 'Hiram Bingham train cruise to Machu Picchu', 'Exclusive expert historical briefing tour', 'Andean wellness spa treatment'] }
    ],
    Japan: [
      { id: 601, country: 'Japan', title: 'MOUNT FUJI RETREAT', price: '$3,100', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', desc: 'Private dynamic onsen resorts overlooking iconic volcanic peak vistas.', days: ['Bullet train green-car transfer to Hakone', 'Private ryokan check-in with private onsen', 'Mount Fuji helicopter photo flyover', 'Exclusive Tokyo premium culinary night'] }
    ]
  };

  const destinations = ['Pakistan', 'Switzerland', 'Iceland', 'Norway', 'Europe', 'Japan'];
  const activeExperiences = destDatabase[activeTab] || [];

  const images = [
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg",
    "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
    "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg",
    "https://images.pexels.com/photos/19153163/pexels-photo-19153163.jpeg",
    "https://images.pexels.com/photos/18161138/pexels-photo-18161138.jpeg",
    "https://images.pexels.com/photos/7743274/pexels-photo-7743274.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="home-wrapper">

      {/* --- HERO SECTION --- */}
      <div className="hero-container">
        <div className="slider-background">
          <AnimatePresence initial={false}>
            <motion.img
              key={images[index]}
              src={images[index]}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="slider-image"
              alt="hero-slide"
            />
          </AnimatePresence>
        </div>

        <div className="image-overlay"></div>

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent custom-navbar px-4 px-md-5 py-4">
          <div className="container-fluid px-0">
            <a className="navbar-brand fw-bold logo-text" href="#">NOVA TRAILS</a>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav gap-4">
                <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                <li className="nav-item">
                  <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => { setIsTripBuilderOpen(true); setBuilderStep(1); }}>Book with us</span>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
                <li className="nav-item">
                  <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => setIsDashboardOpen(true)}>Nova Club</span>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Luxury Package</a></li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-transparent text-white border-0 p-0 fs-5" onClick={() => setIsDashboardOpen(true)}>
                <FiUser />
              </button>
              <a href="tel:#" className="btn btn-outline-light rounded-pill px-4 call-btn text-lowercase">call us</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container hero-content text-center text-white d-flex flex-column justify-content-center align-items-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '2px' }}
            animate={{ opacity: 1, letterSpacing: '4px' }}
            transition={{ duration: 1 }}
            className="hero-subtitle text-uppercase"
          >
            The World's Most
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-title text-uppercase"
          >
            Escape To <br />
            <span className="extraordinary-text">Extraordinary</span> Places
          </motion.h1>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="search-card-container position-relative"
            onClick={() => { setIsTripBuilderOpen(true); setBuilderStep(1); }}
            style={{ cursor: 'pointer' }}
          >
            <div className="find-journey-badge text-uppercase">
              Find Your Journey
            </div>

            <div className="search-card bg-white shadow-lg text-dark">
              <div className="row g-0 align-items-center justify-content-between text-start w-100 px-4">
                <div className="col-6 col-md-3 search-item py-3">
                  <div className="d-flex align-items-center gap-2 mb-1 text-muted label-text">
                    <FiMapPin className="icon-style" /> <span>Destination</span>
                  </div>
                  <div className="val-text fw-semibold">Where are you going?</div>
                </div>
                <div className="col-6 col-md-3 search-item py-3 px-md-3 border-start-md">
                  <div className="d-flex align-items-center gap-2 mb-1 text-muted label-text">
                    <FiCompass className="icon-style" /> <span>Travel type</span>
                  </div>
                  <div className="val-text fw-semibold">Adventure Travel</div>
                </div>
                <div className="col-6 col-md-2 search-item py-3 px-md-3 border-start-md">
                  <div className="d-flex align-items-center gap-2 mb-1 text-muted label-text">
                    <FiCalendar className="icon-style" /> <span>When</span>
                  </div>
                  <div className="val-text fw-semibold">15 july 2026</div>
                </div>
                <div className="col-6 col-md-2 search-item py-3 px-md-3 border-start-md">
                  <div className="d-flex align-items-center gap-2 mb-1 text-muted label-text">
                    <FiUsers className="icon-style" /> <span>Traveller</span>
                  </div>
                  <div className="val-text fw-semibold">2 Person</div>
                </div>
                <div className="col-12 col-md-auto text-center py-2">
                  <button className="search-submit-btn">
                    <FiSearch size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- EXPERIENCES SECTION (DYNAMIC HUB) --- */}
      <section className="experiences-section py-5">
        <div className="container pt-5">
          <h2 className="section-title text-center text-capitalize mb-4">
            Top Rated Experiences
          </h2>

          <div className="d-flex flex-wrap justify-content-center gap-4 md-gap-5 filter-tabs mb-5">
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setActiveTab(dest)}
                className={`filter-btn btn bg-transparent border-0 px-0 position-relative ${activeTab === dest ? 'active fw-bold' : 'text-muted'}`}
              >
                {dest}
                {activeTab === dest && (
                  <motion.div layoutId="activeLine" className="active-line" />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Cards Grid */}
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="row g-4"
          >
            {activeExperiences.map((exp) => (
              <div key={exp.id} className="col-12 col-sm-6 col-md-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedPackage(exp)}
                  className="experience-card position-relative shadow-sm"
                  style={{ backgroundImage: `url(${exp.img})`, cursor: 'pointer' }}
                >
                  <div className="card-gradient-overlay"></div>

                  <div className="card-content-wrapper d-flex justify-content-between align-items-end w-100 p-4 position-absolute bottom-0 start-0">
                    <div className="card-info text-white text-start">
                      <span className="country-tag d-block text-lowercase opacity-75">
                        at {exp.country}
                      </span>
                      <h4 className="card-main-title fw-bold m-0 text-uppercase">{exp.title}</h4>
                      <span className="card-price d-block mt-1 fw-medium opacity-90">From {exp.price}</span>
                    </div>

                    <div className="card-stars d-flex gap-1 text-warning pb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: LUXURY PACKAGES (MOSAIC GRID) --- */}
      <section className="luxury-packages-section py-5">
        <div className="container py-4">
          <div className="row align-items-start">
            <div className="col-12 col-lg-3 text-start mb-5 mb-lg-0 sticky-lg-top" style={{ top: '100px', zIndex: 2 }}>
              <h2 className="luxury-title text-capitalize mb-4">
                Luxury <br />Packages
              </h2>
              <button className="btn btn-outline-dark rounded-pill view-all-btn px-4 py-2">
                View all
              </button>
            </div>

            <div className="col-12 col-lg-9">
              <div className="mosaic-grid-wrapper">
                <div className="mosaic-column mosaic-col-first">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600&auto=format&fit=crop')` }}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">New Destination for 2026</h4>
                      <div className="diamond-badge-wrapper">
                        <div className="diamond-badge">
                          <span>47 Places</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="mosaic-column">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop')` }}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">Best Winter Destination</h4>
                      <div className="diamond-badge-wrapper">
                        <div className="diamond-badge">
                          <span>36 Places</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-short shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop')` }}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content justify-content-center text-center">
                      <h4 className="fw-normal fs-5 m-0 px-2 text-white">Experiences Away from Crowd</h4>
                    </div>
                  </motion.div>
                </div>

                <div className="mosaic-column">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop')` }}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">World Most Extraordinary places</h4>
                      <div className="diamond-badge-wrapper">
                        <div className="diamond-badge">
                          <span>29 Places</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-short shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop')` }}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content justify-content-center text-center">
                      <h4 className="fw-normal fs-5 m-0 px-2 text-white">Your Health is matter</h4>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SERVICES/EXCLUSIVE OFFERS --- */}
      <section className="services-fleet-section py-5">
        <div className="container text-center py-4">
          <h2 className="services-main-heading mb-5">Exclusive Services</h2>

          <div className="row g-4">
            {[
              { title: 'SUPERCARS', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop' },
              { title: 'HOTELS', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop' },
              { title: 'VILLAS', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop' },
              { title: 'YACHTS', img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=600&auto=format&fit=crop' },
              { title: 'PRIVATE HELICOPTER', img: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?q=80&w=600&auto=format&fit=crop' },
              { title: 'PRIVATE JET', img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop' }
            ].map((service, idx) => (
              <div key={idx} className="col-12 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="service-card position-relative overflow-hidden rounded-0 shadow-sm"
                >
                  <motion.div
                    className="service-bg"
                    style={{ backgroundImage: `url(${service.img})` }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <div className="service-overlay"></div>

                  <div className="service-text-container position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3">
                    <h3 className="service-title text-white m-0 text-uppercase text-center">
                      {service.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: WHY NOVA TRAILS --- */}
      <section className="why-nova-section py-5">
        <div className="container py-4">
          <div className="row align-items-start mb-5">
            <div className="col-12 col-md-6 text-start">
              <h2 className="why-main-title text-uppercase m-0">
                Why <br />Nova Trails
              </h2>
            </div>
            <div className="col-12 col-md-6 text-start mt-3 mt-md-0">
              <p className="why-top-desc text-muted lh-base">
                We create unforgettable journeys with handpicked destinations,
                luxurious stays, and personalized experiences, ensuring every trip is
                seamless, memorable, and truly extraordinary.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="why-banner position-relative overflow-hidden shadow-sm"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')` }}
          >
            <div className="banner-dark-overlay"></div>
            <div className="banner-text-overlay position-absolute bottom-0 start-0 p-4 p-md-5 text-start text-white">
              <h3 className="banner-heading fw-normal lh-sm m-0">
                Providing Exclusive <br />Expertise to Deliver <br />the Very Best for...
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 6: NEWSLETTER BAR --- */}
      <section className="newsletter-section position-relative overflow-hidden">
        <div
          className="newsletter-bg-layer"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1400&auto=format&fit=crop')` }}
        ></div>

        <div className="newsletter-light-overlay"></div>

        <div className="container position-relative z-3 text-white py-5 d-flex flex-column align-items-start justify-content-center text-start min-vh-50 px-4 px-md-5">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="newsletter-title mb-3 display-5 fw-normal text-white"
          >
            Get Weekly <br />Inspiration And <br />Expert Advice
          </motion.h2>

          <p className="newsletter-subtitle mb-4 text-white opacity-90">
            Sign up for our weekly newsletter
          </p>

          <div className="newsletter-input-pill d-flex align-items-center w-100 max-w-600 p-1">
            <input
              type="email"
              placeholder="Enter your email address"
              className="form-control bg-transparent text-white border-0 px-4 shadow-none newsletter-field"
            />
            <button className="btn btn-light newsletter-subscribe-btn text-uppercase fw-medium px-4 py-2 rounded-pill">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: TESTIMONIALS --- */}
      <section className="testimonials-section position-relative py-5">
        <div className="testimonials-backdrop-img"></div>

        <div className="container position-relative z-3 py-4 text-center">
          <h2 className="testimonials-main-heading mb-5">
            What Our Customers Say
          </h2>

          <div className="row g-4 justify-content-center">
            {[
              { name: 'Sophia L.', text: 'Every detail of our Switzerland trip was flawlessly planned. From luxury hotels to breathtaking views, Nova Trails exceeded every expectation.' },
              { name: 'Michel A.', text: 'Professional service, hidden gems, and exceptional hospitality. I can\'t wait to book my next adventure with Nova Trails.' },
              { name: 'Emily R.', text: 'From start to finish, everything was seamless. The recommendations were outstanding, and every destination felt magical.' }
            ].map((item, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -12 }}
                  className="testimonial-card"
                >
                  <FaQuoteLeft className="quote-icon mb-3" />
                  <p className="testimonial-text mb-4">
                    {item.text}
                  </p>

                  <div className="mt-auto w-100">
                    <div className="testimonial-stars d-flex justify-content-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="star-icon" />
                      ))}
                    </div>
                    <h5 className="testimonial-author m-0">
                      {item.name}
                    </h5>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: CONTACT OVERLAY FORM --- */}
      <section className="contact-section position-relative d-flex align-items-center justify-content-center py-5">
        <div
          className="contact-bg-layer"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')` }}
        ></div>

        <div className="container position-relative z-3 d-flex justify-content-center py-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-glass-card p-4 p-md-5 text-center shadow"
          >
            <h3 className="contact-card-title mb-4">Contact</h3>

            <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3 align-items-center w-100">
              <div className="w-100 max-w-400">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control contact-input text-center rounded-pill px-4 py-2"
                />
              </div>

              <div className="w-100 max-w-400 mb-2">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="form-control contact-input text-center rounded-pill px-4 py-2"
                />
              </div>

              <button className="btn btn-dark w-100 max-w-400 rounded-pill call-back-btn text-uppercase fw-medium py-2 mt-2">
                Call Me Back
              </button>
            </form>
          </motion.div>
        </div>
      </section>


      {/* ==========================================================================
         --- INTERACTIVE OVERLAYS / INTERACTIVE COMPONENT EXPANSIONS ---
         ========================================================================== */}

      {/* 1. INTERACTIVE PACKAGES DEEP DIVE MODAL / DRAWER */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end"
            // zIndex inline set kiya takay overlap issue completely block ho jaye 👇
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white h-100 p-4 p-md-5 d-flex flex-column justify-content-between overflow-auto"
              style={{ width: '100%', maxWidth: '550px', color: '#111' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-muted text-uppercase tracking-wider small">Nova Premium Itinerary</span>
                  <button className="btn p-0 border-0 fs-4" onClick={() => setSelectedPackage(null)}><FiX /></button>
                </div>

                <div className="rounded-4 overflow-hidden mb-4" style={{ height: '220px', backgroundImage: `url(${selectedPackage.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

                <h3 className="fw-bold tracking-tight mb-2">{selectedPackage.title}</h3>
                <p className="text-muted mb-4">{selectedPackage.desc}</p>

                <h5 className="fw-bold mb-3 border-bottom pb-2">Day-by-Day Journey</h5>
                <div className="position-relative ps-3 border-start border-2 border-dark mb-4">
                  {selectedPackage.days.map((dayText, i) => (
                    <div key={i} className="position-relative mb-3 pb-1">
                      <div className="position-absolute bg-dark rounded-circle" style={{ width: '8px', height: '8px', left: '-18px', top: '7px' }} />
                      <span className="d-block fw-bold small text-muted">Day 0{i + 1}</span>
                      <span className="small d-block fw-medium">{dayText}</span>
                    </div>
                  ))}
                </div>

                <h5 className="fw-bold mb-3 border-bottom pb-2">Premium Inclusions</h5>
                <div className="row g-2 small text-muted">
                  <div className="col-6 d-flex align-items-center gap-2"><FiCheck className="text-success" /> 5-Star Boutique Stays</div>
                  <div className="col-6 d-flex align-items-center gap-2"><FiCheck className="text-success" /> 24/7 Concierge Support</div>
                  <div className="col-6 d-flex align-items-center gap-2"><FiCheck className="text-success" /> Luxury Ground Transfers</div>
                  <div className="col-6 d-flex align-items-center gap-2"><FiCheck className="text-success" /> Curated Food Menus</div>
                </div>
              </div>

              {/* Cut-off Code Completed Here 👇 */}
              <div className="pt-4 border-top mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <span className="small text-muted d-block">Total Value</span>
                    <span className="fs-4 fw-bold">{selectedPackage.price}</span>
                  </div>
                  <button 
                    className="btn btn-dark rounded-pill px-4 py-2 text-uppercase tracking-wide btn-sm fw-medium" 
                    onClick={() => { setSelectedPackage(null); setIsTripBuilderOpen(true); setBuilderStep(1); }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CUSTOM INTERACTIVE TRIP BUILDER WIZARD */}
      <AnimatePresence>
        {isTripBuilderOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 9999 }}
            onClick={() => setIsTripBuilderOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-4 p-md-5 rounded-4 position-relative shadow-lg text-dark"
              style={{ width: '90%', maxWidth: '500px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btn position-absolute top-0 end-0 m-3 fs-4 p-0 border-0" onClick={() => setIsTripBuilderOpen(false)}>
                <FiX />
              </button>
              
              <div className="text-start">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Step {builderStep} of 3 • Design Custom Journey</span>
                
                {builderStep === 1 && (
                  <div>
                    <h4 className="fw-bold mb-3">Kahan jana chahte hain?</h4>
                    <p className="text-muted small mb-4">Choose your preferred premium geographic zone.</p>
                    <div className="d-flex flex-column gap-2">
                      {destinations.map((dest) => (
                        <button key={dest} className="btn btn-light border text-start d-flex justify-content-between align-items-center py-2 px-3 rounded-3" onClick={() => setBuilderStep(2)}>
                          <span>{dest} Areas</span>
                          <FiChevronRight />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {builderStep === 2 && (
                  <div>
                    <h4 className="fw-bold mb-3">Kab nikalna hai?</h4>
                    <p className="text-muted small mb-4">Select your luxurious timing setup.</p>
                    <div className="d-flex flex-column gap-2">
                      {['July 2026 (Peak Season)', 'August 2026 (Serene Blend)', 'Winter Golden Slot'].map((time) => (
                        <button key={time} className="btn btn-light border text-start d-flex justify-content-between align-items-center py-2 px-3 rounded-3" onClick={() => setBuilderStep(3)}>
                          <span>{time}</span>
                          <FiChevronRight />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {builderStep === 3 && (
                  <div className="text-center py-3">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FiCheck size={30} />
                    </div>
                    <h4 className="fw-bold mb-2">Request Submitted!</h4>
                    <p className="text-muted small mb-4">Our premium lifestyle concierge team will call you within 15 minutes.</p>
                    <button className="btn btn-dark rounded-pill w-100 py-2 text-uppercase" onClick={() => setIsTripBuilderOpen(false)}>
                      Perfect
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. NOVA CLUB LOYALTY DASHBOARD DRAWER */}
      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-start"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setIsDashboardOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-dark text-white h-100 p-4 p-md-5 d-flex flex-column justify-content-between overflow-auto"
              style={{ width: '100%', maxWidth: '450px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-secondary rounded-circle" style={{ width: '10px', height: '10px' }} />
                    <span className="text-uppercase tracking-wider small opacity-75">Nova Club Tier: Black Elite</span>
                  </div>
                  <button className="btn text-white p-0 border-0 fs-4" onClick={() => setIsDashboardOpen(false)}><FiX /></button>
                </div>

                <div className="mb-5 text-start">
                  <h3 className="fw-bold m-0 mb-1">Welcome Back</h3>
                  <p className="text-muted small">kzarlish792@gmail.com</p>
                </div>

                <div className="d-flex flex-column gap-4 text-start">
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-4">
                    <span className="d-block text-muted small text-uppercase mb-1">Active Bookings</span>
                    <h5 className="m-0 fw-bold">No upcoming trips listed</h5>
                  </div>
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-4">
                    <span className="d-block text-muted small text-uppercase mb-1">Saved Experiences</span>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <FiHeart className="text-danger" />
                      <span className="small">Hunza Valley Luxe</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-top border-secondary text-start">
                <p className="small text-muted m-0">In partnership with Marrie792-design</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;