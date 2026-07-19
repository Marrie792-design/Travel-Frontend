import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMapPin, FiCompass, FiCalendar, FiUsers, FiSearch, FiX, FiCheck, FiChevronRight, FiUser, FiHeart, FiClock, FiDollarSign, FiInfo } from 'react-icons/fi';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

// Animation Variants for Staggered Grid Content
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('Pakistan');
  const [index, setIndex] = useState(0);

  // Core Dynamic Data Panels for Wishlist
  const [savedExperiences, setSavedExperiences] = useState([
    {
      id: 'default-1',
      title: "HUNZA VALLEY LUXE",
      img: "https://images.unsplash.com/photo-1624531054366-027598813353?q=80&w=600",
      fullTripData: { id: 101, country: 'Pakistan', title: 'HUNZA VALLEY LUXE', price: '$1,800', img: 'https://images.unsplash.com/photo-1624531054366-027598813353?q=80&w=600&auto=format&fit=crop', desc: 'Experience the premium cultural retreat under Mount Rakaposhi.', days: ['Arrival in Gilgit & luxury transfer to Hunza', 'Private tour of Altit & Baltit forts', 'Attabad Lake high-speed luxury boating', 'Departure via scenic helicopter flight'] }
    }
  ]);

  // Unified States for Overlays & Drawers
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageBooking, setShowPackageBooking] = useState(false);
  const [packageUserInfo, setPackageUserInfo] = useState({ name: '', email: '', phone: '', numPeople: 1 });
  const [packageSuccessMsg, setPackageSuccessMsg] = useState(false);

  const [isTripBuilderOpen, setIsTripBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // States for Nova Club's "View Ticket" Interactive Flow
  const [selectedTicketTrip, setSelectedTicketTrip] = useState(null);
  const [ticketUserInfo, setTicketUserInfo] = useState({ name: '', email: '', phone: '', numPeople: 1 });
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // States for Custom Trip Builder Wizard
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripTime, setTripTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [wizardUserInfo, setWizardUserInfo] = useState({ name: '', email: '', phone: '' });

  const todayDateStr = new Date().toISOString().split('T')[0];

  // Enriched Upcoming Trips Data Structure
  const upcomingTrips = [
    {
      id: 'up-1',
      title: "Premium Skardu Glacial Trail",
      date: "12th Aug 2026",
      duration: "5 Days",
      price: "$2,200",
      hotelImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
      menuInfo: "Continental Breakfast, Specialized Baltic Hotpots & Nightly BBQ Buffets",
      activities: "Kachura Lake Boating, Cold Desert Dune Gliding & Upper Glacier Base Camp Trekking"
    },
    {
      id: 'up-2',
      title: "Hunza Elite Cultural Escape",
      date: "05th Oct 2026",
      duration: "4 Days",
      price: "$1,800",
      hotelImg: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
      menuInfo: "Organic Farm-to-Table Breakfasts, Traditional Walnut Cakes & Mountain Sage Tea",
      activities: "Altit & Baltit Fort VIP Guided Access, Attabad Lake Jet Skiing & Eagle's Nest Sunset Photography"
    }
  ];

  // Enhanced Favorite Toggle Handler
  const toggleFavoriteTrip = (tripObj) => {
    const exists = savedExperiences.some(item => item.title === tripObj.title);
    if (exists) {
      setSavedExperiences(prev => prev.filter(item => item.title !== tripObj.title));
    } else {
      setSavedExperiences(prev => [...prev, {
        id: tripObj.id || Date.now(),
        title: tripObj.title,
        img: tripObj.img || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
        fullTripData: tripObj
      }]);
    }
  };

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

  const countryData = {
    "Pakistan": ["Hunza Valley", "Skardu", "Swat", "Murree"],
    "Turkey": ["Istanbul", "Cappadocia", "Antalya"],
    "UAE": ["Dubai", "Abu Dhabi", "Sharjah"]
  };

  const destinations = ['Pakistan', 'Switzerland', 'Iceland', 'Norway', 'Europe', 'Japan'];
  const activeExperiences = destDatabase[activeTab] || [];

  const images = [
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg",
    "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
    "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePackageBookSubmit = (e) => {
    e.preventDefault();
    setPackageSuccessMsg(true);
    setTimeout(() => {
      setSelectedPackage(null);
      setShowPackageBooking(false);
      setPackageSuccessMsg(false);
      setPackageUserInfo({ name: '', email: '', phone: '', numPeople: 1 });
    }, 3000);
  };

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    setBuilderStep(4);
    setTimeout(() => {
      setIsTripBuilderOpen(false);
      setBuilderStep(1);
      setSelectedCountry("");
      setSelectedPlace("");
      setTripDate("");
      setTripTime("");
      setNumPeople(1);
      setWizardUserInfo({ name: '', email: '', phone: '' });
    }, 3000);
  };

  const handleTicketCheckoutSubmit = (e) => {
    e.preventDefault();
    setTicketSuccess(true);
    setTimeout(() => {
      setSelectedTicketTrip(null);
      setTicketSuccess(false);
      setTicketUserInfo({ name: '', email: '', phone: '', numPeople: 1 });
    }, 3000);
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

      {/* --- EXPERIENCES SECTION --- */}
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
                      <span className="country-tag d-block text-lowercase opacity-75">at {exp.country}</span>
                      <h4 className="card-main-title fw-bold m-0 text-uppercase">{exp.title}</h4>
                      <span className="card-price d-block mt-1 fw-medium opacity-90">From {exp.price}</span>
                    </div>
                    <div className="card-stars d-flex gap-1 text-warning pb-2">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: LUXURY PACKAGES --- */}
      <section className="luxury-packages-section py-5">
        <div className="container py-4">
          <div className="row align-items-start">
            <div className="col-12 col-lg-3 text-start mb-5 mb-lg-0 sticky-lg-top" style={{ top: '100px', zIndex: 2 }}>
              <h2 className="luxury-title text-capitalize mb-4">Luxury <br />Packages</h2>
              <button className="btn btn-outline-dark rounded-pill view-all-btn px-4 py-2">View all</button>
            </div>
            <div className="col-12 col-lg-9">
              <div className="mosaic-grid-wrapper">
                <div className="mosaic-column mosaic-col-first">
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="mosaic-card card-tall shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">New Destination for 2026</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>47 Places</span></div></div>
                    </div>
                  </motion.div>
                </div>
                <div className="mosaic-column">
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="mosaic-card card-tall shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">Best Winter Destination</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>36 Places</span></div></div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="mosaic-card card-short shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content"><h4 className="fw-normal fs-5 m-0 px-2 text-white">Experiences Away from Crowd</h4></div>
                  </motion.div>
                </div>
                <div className="mosaic-column">
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="mosaic-card card-tall shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">World Most Extraordinary places</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>29 Places</span></div></div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="mosaic-card card-short shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content"><h4 className="fw-normal fs-5 m-0 px-2 text-white">Your Health is matter</h4></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES/EXCLUSIVE OFFERS --- */}
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
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="service-card position-relative overflow-hidden rounded-0 shadow-sm">
                  <motion.div className="service-bg" style={{ backgroundImage: `url(${service.img})` }} whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                  <div className="service-overlay"></div>
                  <div className="service-text-container position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3">
                    <h3 className="service-title text-white m-0 text-uppercase text-center">{service.title}</h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY NOVA TRAILS --- */}
      <section className="why-nova-section py-5">
        <div className="container py-4">
          <div className="row align-items-start mb-5">
            <div className="col-12 col-md-6 text-start"><h2 className="why-main-title text-uppercase m-0">Why <br />Nova Trails</h2></div>
            <div className="col-12 col-md-6 text-start mt-3 mt-md-0"><p className="why-top-desc text-muted lh-base">We create unforgettable journeys with handpicked destinations, luxurious stays, and personalized experiences, ensuring every trip is seamless, memorable, and truly extraordinary.</p></div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="why-banner position-relative overflow-hidden shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')` }}>
            <div className="banner-dark-overlay"></div>
            <div className="banner-text-overlay position-absolute bottom-0 start-0 p-4 p-md-5 text-start text-white"><h3 className="banner-heading fw-normal lh-sm m-0">Providing Exclusive <br />Expertise to Deliver <br />the Very Best for...</h3></div>
          </motion.div>
        </div>
      </section>

      {/* --- NEWSLETTER BAR --- */}
      <section className="newsletter-section position-relative overflow-hidden">
        <div className="newsletter-bg-layer" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1400&auto=format&fit=crop')` }}></div>
        <div className="newsletter-light-overlay"></div>
        <div className="container position-relative z-3 text-white py-5 d-flex flex-column align-items-start justify-content-center text-start min-vh-50 px-4 px-md-5">
          <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="newsletter-title mb-3 display-5 fw-normal text-white">Get Weekly <br />Inspiration And <br />Expert Advice</motion.h2>
          <p className="newsletter-subtitle mb-4 text-white opacity-90">Sign up for our weekly newsletter</p>
          <div className="newsletter-input-pill d-flex align-items-center w-100 max-w-600 p-1">
            <input type="email" placeholder="Enter your email address" className="form-control bg-transparent text-white border-0 px-4 shadow-none newsletter-field" />
            <button className="btn btn-light newsletter-subscribe-btn text-uppercase fw-medium px-4 py-2 rounded-pill">Subscribe</button>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="testimonials-section position-relative py-5">
        <div className="testimonials-backdrop-img"></div>
        <div className="container position-relative z-3 py-4 text-center">
          <h2 className="testimonials-main-heading mb-5">What Our Customers Say</h2>
          <div className="row g-4 justify-content-center">
            {[
              { name: 'Sophia L.', text: 'Every detail of our Switzerland trip was flawlessly planned. From luxury hotels to breathtaking views, Nova Trails exceeded every expectation.' },
              { name: 'Michel A.', text: 'Professional service, hidden gems, and exceptional hospitality. I can\'t wait to book my next adventure with Nova Trails.' },
              { name: 'Emily R.', text: 'From start to finish, everything was seamless. The recommendations were outstanding, and every destination felt magical.' }
            ].map((item, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }} whileHover={{ y: -12 }} className="testimonial-card">
                  <FaQuoteLeft className="quote-icon mb-3" />
                  <p className="testimonial-text mb-4">{item.text}</p>
                  <div className="mt-auto w-100">
                    <div className="testimonial-stars d-flex justify-content-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="star-icon" />)}
                    </div>
                    <h5 className="testimonial-author m-0">{item.name}</h5>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT OVERLAY FORM --- */}
      <section className="contact-section position-relative d-flex align-items-center justify-content-center py-5">
        <div className="contact-bg-layer" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')` }}></div>
        <div className="container position-relative z-3 d-flex justify-content-center py-5">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="contact-glass-card p-4 p-md-5 text-center shadow">
            <h3 className="contact-card-title mb-4">Contact</h3>
            <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3 align-items-center w-100">
              <div className="w-100 max-w-400"><input type="text" placeholder="Name" className="form-control contact-input text-center rounded-pill px-4 py-2" /></div>
              <div className="w-100 max-w-400 mb-2"><input type="tel" placeholder="Phone" className="form-control contact-input text-center rounded-pill px-4 py-2" /></div>
              <button className="btn btn-dark w-100 max-w-400 rounded-pill call-back-btn text-uppercase fw-medium py-2 mt-2">Call Me Back</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
          --- INTERACTIVE OVERLAYS / DRAWERS ---
          ========================================================================== */}

      {/* 1. INTERACTIVE PACKAGES DEEP DIVE MODAL / DRAWER (UPDATED WITH RESPONSIVE IMAGE CARD) */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end"
            style={{ backgroundColor: 'rgba(13, 15, 18, 0.7)', backdropFilter: 'blur(12px)', zIndex: 9999 }}
            onClick={() => { setSelectedPackage(null); setShowPackageBooking(false); setPackageSuccessMsg(false); }}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 190 }}
              className="bg-white h-100 p-4 p-md-5 d-flex flex-column justify-content-between overflow-auto"
              style={{ width: '100%', maxWidth: '560px', color: '#1a1d20', fontFamily: '"Playfair Display", serif' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-muted text-uppercase tracking-wider fs-7">{selectedPackage.country}</span>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => toggleFavoriteTrip(selectedPackage)}>
                      <FiHeart fill={savedExperiences.some(item => item.title === selectedPackage.title) ? "#dc3545" : "none"} stroke={savedExperiences.some(item => item.title === selectedPackage.title) ? "#dc3545" : "currentColor"} />
                    </button>
                    <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => setSelectedPackage(null)}><FiX size={20} /></button>
                  </div>
                </div>

                {/* Newly Added Rich Destination Preview Image Container */}
                <div className="rounded-3 overflow-hidden mb-4 shadow-sm" style={{ height: '220px' }}>
                  <img src={selectedPackage.img} className="w-100 h-100 object-fit-cover" alt={selectedPackage.title} />
                </div>

                <h2 className="fw-bold text-uppercase mb-3">{selectedPackage.title}</h2>
                <h4 className="text-primary fw-semibold mb-4">{selectedPackage.price} <span className="fs-6 text-muted fw-normal">/ person</span></h4>
                <p className="text-muted mb-4">{selectedPackage.desc}</p>
                <hr />
                <h5 className="fw-bold my-3 text-uppercase fs-6 tracking-wide">Detailed Itinerary</h5>
                <div className="itinerary-timeline ps-3 border-start border-2 border-light">
                  {selectedPackage.days?.map((day, dIdx) => (
                    <div key={dIdx} className="mb-3 position-relative">
                      <div className="fw-bold fs-7 text-secondary">Day {dIdx + 1}</div>
                      <div className="text-dark fs-6">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                {packageSuccessMsg ? (
                  <div className="alert alert-success d-flex align-items-center gap-2 rounded-pill py-3 px-4 justify-content-center text-center fw-medium shadow-sm"><FiCheck /> We will contact you soon</div>
                ) : showPackageBooking ? (
                  <form onSubmit={handlePackageBookSubmit} className="d-flex flex-column gap-3">
                    <input type="text" placeholder="Your Name" required className="form-control" value={packageUserInfo.name} onChange={e => setPackageUserInfo({ ...packageUserInfo, name: e.target.value })} />
                    <input type="email" placeholder="Email Address" required className="form-control" value={packageUserInfo.email} onChange={e => setPackageUserInfo({ ...packageUserInfo, email: e.target.value })} />
                    <div className="row g-2">
                      <div className="col-8"><input type="tel" placeholder="Phone" required className="form-control" value={packageUserInfo.phone} onChange={e => setPackageUserInfo({ ...packageUserInfo, phone: e.target.value })} /></div>
                      <div className="col-4"><input type="number" min="1" max="20" required className="form-control" value={packageUserInfo.numPeople} onChange={e => setPackageUserInfo({ ...packageUserInfo, numPeople: parseInt(e.target.value) || 1 })} /></div>
                    </div>
                    <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center my-1 border border-light">
                      <span className="text-muted fs-7 text-uppercase tracking-wider fw-medium">Total Amount:</span>
                      <span className="fw-bold text-dark fs-5">${(parseFloat(selectedPackage.price.replace(/[^0-9.]/g, '')) * (packageUserInfo.numPeople || 1)).toLocaleString()}</span>
                    </div>
                    <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 text-uppercase">Confirm Reservation</button>
                  </form>
                ) : (
                  <button className="btn btn-dark w-100 rounded-pill py-3 text-uppercase tracking-wider fw-medium" onClick={() => setShowPackageBooking(true)}>Book This Experience</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CUSTOM TRIP BUILDER WIZARD OVERLAY */}
      <AnimatePresence>
        {isTripBuilderOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(10, 12, 15, 0.85)', backdropFilter: 'blur(16px)', zIndex: 10000 }}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-4 p-4 p-md-5 text-dark position-relative shadow-2xl w-100 mx-3" style={{ maxWidth: '640px' }}>
              <button className="position-absolute top-0 end-0 m-4 btn btn-light rounded-circle p-2" onClick={() => setIsTripBuilderOpen(false)}><FiX size={20} /></button>
              <div className="mb-4 d-flex align-items-center gap-2 text-muted uppercase tracking-widest fs-7">
                <span>Step {builderStep} of 3</span>
                {builderStep < 4 && <div className="progress flex-grow-1 ms-2" style={{ height: '4px' }}><div className="progress-bar bg-dark" style={{ width: `${(builderStep / 3) * 100}%` }}></div></div>}
              </div>
              {builderStep === 1 && (
                <div>
                  <h3 className="fw-bold mb-3">Where should we craft your trail?</h3>
                  <div className="mb-3">
                    <label className="form-label text-muted fs-7 fw-medium text-uppercase">Select Target Country</label>
                    <select className="form-select py-2" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedPlace(""); }}>
                      <option value="">-- Choose Country --</option>
                      {Object.keys(countryData).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {selectedCountry && (
                    <div className="mb-4">
                      <label className="form-label text-muted fs-7 fw-medium text-uppercase">Select Curated Hub</label>
                      <select className="form-select py-2" value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
                        <option value="">-- Choose Region --</option>
                        {countryData[selectedCountry]?.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  )}
                  <button className="btn btn-dark w-100 py-2 rounded-pill mt-3" disabled={!selectedPlace} onClick={() => setBuilderStep(2)}>Continue <FiChevronRight /></button>
                </div>
              )}
              {builderStep === 2 && (
                <div>
                  <h3 className="fw-bold mb-3">Temporal Logistics</h3>
                  <div className="row g-3 mb-4">
                    <div className="col-12"><label className="form-label text-muted fs-7">Departure Target Date</label><input type="date" min={todayDateStr} className="form-control" value={tripDate} onChange={e => setTripDate(e.target.value)} /></div>
                    <div className="col-6"><label className="form-label text-muted fs-7">Preferred Slot</label><input type="time" className="form-control" value={tripTime} onChange={e => setTripTime(e.target.value)} /></div>
                    <div className="col-6"><label className="form-label text-muted fs-7">Total Enlisted Guests</label><input type="number" min="1" max="50" className="form-control" value={numPeople} onChange={e => setNumPeople(parseInt(e.target.value) || 1)} /></div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light flex-grow-1 rounded-pill" onClick={() => setBuilderStep(1)}>Back</button>
                    <button className="btn btn-dark flex-grow-1 rounded-pill" disabled={!tripDate} onClick={() => setBuilderStep(3)}>Next Sequence</button>
                  </div>
                </div>
              )}
              {builderStep === 3 && (
                <form onSubmit={handleWizardSubmit}>
                  <h3 className="fw-bold mb-3">Confirm Booking</h3>
                  <div className="d-flex flex-column gap-3 mb-4">
                    <input type="text" placeholder="Full Legal Name" required className="form-control" value={wizardUserInfo.name} onChange={e => setWizardUserInfo({ ...wizardUserInfo, name: e.target.value })} />
                    <input type="email" placeholder="Digital Mailing Address" required className="form-control" value={wizardUserInfo.email} onChange={e => setWizardUserInfo({ ...wizardUserInfo, email: e.target.value })} />
                    <input type="tel" placeholder="Mobile Loop" required className="form-control" value={wizardUserInfo.phone} onChange={e => setWizardUserInfo({ ...wizardUserInfo, phone: e.target.value })} />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-light flex-grow-1 rounded-pill" onClick={() => setBuilderStep(2)}>Back</button>
                    <button type="submit" className="btn btn-dark flex-grow-1 rounded-pill">Confirm Booking</button>
                  </div>
                </form>
              )}
              {builderStep === 4 && (
                <div className="text-center py-4">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}><FiCheck size={32} /></div>
                  <h3 className="fw-bold text-uppercase">We will contact you soon</h3>
                  <p className="text-muted">Our travel curation executives are verifying your details.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. NOVA CLUB PERSONAL PROFILE & DATA DASHBOARD DRAWER */}
      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-start" style={{ backgroundColor: 'rgba(15, 17, 20, 0.65)', backdropFilter: 'blur(8px)', zIndex: 9999 }} onClick={() => setIsDashboardOpen(false)}>
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 160 }}
              className="bg-dark text-white h-100 p-4 p-md-5 d-flex flex-column justify-content-between overflow-auto"
              style={{ width: '100%', maxWidth: '480px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>N</div>
                    <span className="fw-bold tracking-wider fs-5">NOVA CLUB</span>
                  </div>
                  <button className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => setIsDashboardOpen(false)}><FiX size={18} /></button>
                </div>
                <h5 className="text-uppercase text-muted fs-7 tracking-widest mb-3">Upcoming Trips</h5>
                <div className="d-flex flex-column gap-3 mb-5">
                  {upcomingTrips.map(trip => (
                    <div key={trip.id} className="bg-secondary bg-opacity-20 p-3 rounded text-start d-flex justify-content-between align-items-center border border-secondary border-opacity-20">
                      <div>
                        <h6 className="fw-bold m-0 mb-1">{trip.title}</h6>
                        <div className="text-muted fs-7">{trip.date} • {trip.duration}</div>
                      </div>
                      <button className="btn btn-sm btn-outline-light rounded-pill px-3 fs-7 text-capitalize" onClick={() => setSelectedTicketTrip(trip)}>view ticket</button>
                    </div>
                  ))}
                </div>
                <h5 className="text-uppercase text-muted fs-7 tracking-widest mb-3">Favourites</h5>
                <div className="row g-3">
                  {savedExperiences.length === 0 ? (
                    <div className="col-12 text-muted fs-7 text-center py-3">No favorite items listed.</div>
                  ) : (
                    savedExperiences.map(s => (
                      <div key={s.id} className="col-6">
                        <div
                          className="position-relative rounded overflow-hidden shadow-sm favorite-item-card"
                          style={{ height: '110px', backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}
                          onClick={() => {
                            if (s.fullTripData) {
                              setSelectedPackage(s.fullTripData);
                              setIsDashboardOpen(false);
                            }
                          }}
                        >
                          <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
                          <div className="position-absolute bottom-0 start-0 p-2 text-start w-100">
                            <p className="m-0 fw-bold text-white text-uppercase text-truncate" style={{ fontSize: '0.72rem', letterSpacing: '0.4px', lineHeight: '1.2' }}>{s.title}</p>
                          </div>
                          <button
                            className="position-absolute top-0 end-0 m-1.5 btn p-0 border-0 bg-transparent"
                            style={{ zIndex: 10 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedExperiences(prev => prev.filter(item => item.title !== s.title));
                            }}
                          >
                            <FiX size={13} className="bg-white rounded-circle p-0.5 text-dark shadow-sm" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-5 border-top border-secondary border-opacity-30 pt-4 text-center text-muted fs-8">Premium Elite Member Access Token Active</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. UPCOMING TRIP DETAIL & USER INFO CHECKOUT MODAL */}
      <AnimatePresence>
        {selectedTicketTrip && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(10, 12, 15, 0.85)', backdropFilter: 'blur(16px)', zIndex: 10001 }}
            onClick={() => { setSelectedTicketTrip(null); setTicketSuccess(false); }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              className="bg-white rounded-4 p-4 p-md-5 text-dark position-relative shadow-lg w-100 mx-3 overflow-auto"
              style={{ maxWidth: '580px', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="position-absolute top-0 end-0 m-4 btn btn-light rounded-circle p-2" onClick={() => setSelectedTicketTrip(null)}><FiX size={18} /></button>

              {!ticketSuccess ? (
                <div>
                  <span className="text-muted text-uppercase tracking-widest fs-8 fw-semibold d-block mb-1">Company Pass Checkout</span>
                  <h3 className="fw-bold text-dark mb-2">{selectedTicketTrip.title}</h3>
                  <span className="badge bg-dark text-white rounded px-3 py-1.5 fs-7 mb-4">{selectedTicketTrip.date}</span>

                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <div className="rounded-3 overflow-hidden position-relative mb-2" style={{ height: '160px' }}>
                        <img src={selectedTicketTrip.hotelImg} className="w-100 h-100 object-fit-cover" alt="Luxury Hotel Stay" />
                        <span className="position-absolute bottom-0 start-0 m-2 bg-white text-dark px-2 py-1 rounded fs-8 fw-bold shadow-sm">Premium 5-Star Stay Included</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded text-start h-100">
                        <div className="text-muted fs-8 text-uppercase tracking-wider fw-semibold mb-1"><FiClock className="me-1" /> Duration</div>
                        <div className="fw-bold text-dark fs-6">{selectedTicketTrip.duration}</div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded text-start h-100">
                        <div className="text-muted fs-8 text-uppercase tracking-wider fw-semibold mb-1"><FiDollarSign className="me-1" /> Fare Base</div>
                        <div className="fw-bold text-primary fs-6">{selectedTicketTrip.price} <span className="fs-8 text-muted fw-normal">/ person</span></div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="p-3 bg-light rounded border-start border-3 border-dark text-start">
                        <div className="fw-bold text-dark fs-7 text-uppercase mb-1">Gourmet Menu Blueprint</div>
                        <p className="text-muted fs-7 m-0">{selectedTicketTrip.menuInfo}</p>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="p-3 bg-light rounded border-start border-3 border-secondary text-start">
                        <div className="fw-bold text-dark fs-7 text-uppercase mb-1">Enlisted Itinerary Activities</div>
                        <p className="text-muted fs-7 m-0">{selectedTicketTrip.activities}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4 text-muted opacity-20" />

                  {/* --- FORM WITH GAPS ADDED --- */}
                  <form onSubmit={handleTicketCheckoutSubmit}>
                    <label className="form-label text-muted fs-8 tracking-wider text-uppercase fw-bold mb-2.5">
                      Enter Your Info To Book Ticket
                    </label>

                    {/* Changed gap-2 to gap-3 for proper vertical spacing */}
                    <div className="d-flex flex-column gap-3 mb-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="form-control py-2 px-3 border border-light-subtle rounded"
                        value={ticketUserInfo.name}
                        onChange={e => setTicketUserInfo({ ...ticketUserInfo, name: e.target.value })}
                      />

                      <input
                        type="email"
                        placeholder="Corporate Email"
                        required
                        className="form-control py-2 px-3 border border-light-subtle rounded"
                        value={ticketUserInfo.email}
                        onChange={e => setTicketUserInfo({ ...ticketUserInfo, email: e.target.value })}
                      />

                      <div className="row g-2">
                        <div className="col-8">
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            className="form-control py-2 px-3 border border-light-subtle rounded"
                            value={ticketUserInfo.phone}
                            onChange={e => setTicketUserInfo({ ...ticketUserInfo, phone: e.target.value })}
                          />
                        </div>
                        <div className="col-4">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            required
                            className="form-control py-2 px-3 border border-light-subtle rounded"
                            value={ticketUserInfo.numPeople}
                            onChange={e => setTicketUserInfo({ ...ticketUserInfo, numPeople: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center my-3 border border-light-subtle">
                      <span className="text-muted fs-7 text-uppercase tracking-wider fw-medium">Total Amount:</span>
                      <span className="fw-bold text-dark fs-5">
                        ${(parseFloat(selectedTicketTrip.price.replace(/[^0-9.]/g, '')) * (ticketUserInfo.numPeople || 1)).toLocaleString()}
                      </span>
                    </div>

                    <button type="submit" className="btn btn-secondary w-100 py-2.5 rounded text-uppercase fw-bold tracking-wide shadow-sm" style={{ backgroundColor: '#6c757d', border: 'none' }}>
                      Confirm & Book Ticket
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '56px', height: '56px' }}><FiCheck size={28} /></div>
                  <h3 className="fw-bold text-uppercase m-0 mb-1">We will contact you soon</h3>
                  <p className="text-muted fs-6 mb-0">Your corporate luxury ticket request has been logged successfully.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;