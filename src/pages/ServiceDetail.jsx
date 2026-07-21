import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceDetail.css';

// SVG Icons
const ChevronLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);

const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

const CheckBadgeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#C5A059" stroke="#C5A059" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ServiceDetail = () => {
    const { serviceName } = useParams();
    const navigate = useNavigate();

    // Active Tab & Slider State
    const [activeTab, setActiveTab] = useState('overview');
    const [currentSlide, setCurrentSlide] = useState(0);

    // --- FUNCTIONAL MODAL STATES ---
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    // Reservation Form State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isBooked, setIsBooked] = useState(false);

    // Call Schedule State
    const [callDate, setCallDate] = useState('');
    const [callTime, setCallTime] = useState('10:00 AM');
    const [callType, setCallType] = useState('phone'); // 'phone' | 'whatsapp'
    const [isCallScheduled, setIsCallScheduled] = useState(false);

    // Database
    const details = {
        'supercars': {
            title: 'Elite Supercars Fleet',
            tagline: 'Experience Absolute Automotive Perfection',
            price: '$2,800 / day',
            numericPrice: 2800,
            location: 'Monaco • Dubai • Zurich • Los Angeles',
            desc: 'Drive the world\'s most iconic engineering masterpieces. Our handpicked fleet features the absolute latest high-performance models from Ferrari, Lamborghini, Porsche, and Aston Martin.',
            longDesc: 'Every vehicle in our collection is maintained to track-ready perfection. Whether you are looking to conquer scenic alpine passes or make a grand entrance at an elite event, our supercars deliver unmatched raw power, state-of-the-art aerodynamics, and prestigious comfort.',
            specs: [
                { label: '0-100 km/h', value: '2.8 sec' },
                { label: 'Top Speed', value: '340 km/h' },
                { label: 'Engine', value: 'V12 Twin-Turbo' },
                { label: 'Insurance', value: 'Full VIP Cover' }
            ],
            features: [
                'Track-Day Custom Configurations Available',
                '24/7 VIP Roadside Technical Assistance',
                'Fully Comprehensive Premium Insurance Frame',
                'On-Demand Delivery to Airport or Villa Terminals',
                'Personal Telemetry & Lap Timing Setup'
            ],
            images: [
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',
                'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200',
                'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200',
                'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200'
            ],
            userExperiences: [
                {
                    name: 'Zain Malik',
                    role: 'Verified Client',
                    avatar: 'ZM',
                    rating: 5,
                    comment: 'Renting the Ferrari F8 was an absolute dream. Delivered directly to my hotel runway in pristine condition. The exhaust note through the mountains is unforgettable!'
                },
                {
                    name: 'Sarah Jenkins',
                    role: 'Car Enthusiast',
                    avatar: 'SJ',
                    rating: 5,
                    comment: 'Flawless execution from booking to drop-off. The 24/7 technical support team gave me complete confidence during my cross-country trip.'
                }
            ]
        },
        'hotels': {
            title: 'Ultra-Luxury Stays',
            tagline: 'Architectural Wonders Meet Tailored Hospitality',
            price: '$4,500 / night',
            numericPrice: 4500,
            location: 'Swiss Alps • Bora Bora • Amalfi • Kyoto',
            desc: 'From stunning over-water private bungalows in Bora Bora to historic mountain-top castles in Switzerland, we secure the most exclusive suites at prestigious estates.',
            longDesc: 'We go beyond standard five-star hospitality. Our partnerships grant you access to high-tier club privileges, restricted penthouse bookings, and hyper-personalized hospitality ecosystems.',
            specs: [
                { label: 'Butler Service', value: '24/7 Dedicated' },
                { label: 'Privacy Tier', value: '100% Confidential' },
                { label: 'Dining', value: '3 Michelin Stars' },
                { label: 'Transfer', value: 'Private Heli / Yacht' }
            ],
            features: [
                'Private Helipad & Jet Docking Access',
                'Dedicated 24-Hour Certified Butler Framework',
                'Custom Michelin-Star In-Suite Gastronomy',
                'Complimentary Luxury Yacht Airport Transfers',
                'Private Spa & Cryotherapy Chambers'
            ],
            images: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
                'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200',
                'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200'
            ],
            userExperiences: [
                {
                    name: 'Amara Lodhi',
                    role: 'Executive Traveler',
                    avatar: 'AL',
                    rating: 5,
                    comment: 'The panoramic suite secured for us in the Swiss Alps exceeded all expectations. Our private butler managed everything seamlessly. Pure perfection.'
                },
                {
                    name: 'David Thorne',
                    role: 'Frequent Flyer',
                    avatar: 'DT',
                    rating: 5,
                    comment: 'Hidden luxury at its finest. Private check-in bypassed all queues, and the culinary menu was custom curated by a world-class chef.'
                }
            ]
        }
    };

    const data = details[serviceName] || details['supercars'];
    // Aaj ki date format (YYYY-MM-DD)
    const todayDate = new Date().toISOString().split('T')[0];



    // Calculate Total Price Based on Dates
    const calculateTotal = () => {
        if (!startDate || !endDate) return data.numericPrice;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays > 0 ? diffDays : 1) * data.numericPrice;
    };

    // Form Submit Handlers
    // 1. Reservation Submit Handler
const handleReservationSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://travel-backend-blue.vercel.app/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assetTitle: data.title,
        startDate,
        endDate,
        fullName,
        email,
        phone,
        totalPrice: calculateTotal()
      })
    });

    const result = await response.json();
    if (result.success) {
      setIsBooked(true);
      setTimeout(() => {
        setIsBooked(false);
        setIsReserveModalOpen(false);
        setStartDate('');
        setEndDate('');
        setFullName('');
        setEmail('');
        setPhone('');
      }, 2800);
    } else {
      alert('Email bhejney me masla hua. Wapas try karein.');
    }
  } catch (err) {
    console.error(err);
    alert('Server connect nahi ho saka!');
  }
};

// 2. Schedule Call Submit Handler
const handleCallSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://travel-backend-blue.vercel.app/api/schedule-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assetTitle: data.title,
        phone,
        callDate,
        callTime,
        callType
      })
    });

    const result = await response.json();
    if (result.success) {
      setIsCallScheduled(true);
      setTimeout(() => {
        setIsCallScheduled(false);
        setIsCallModalOpen(false);
        setCallDate('');
        setPhone('');
      }, 2800);
    } else {
      alert('Email bhejney me masla hua.');
    }
  } catch (err) {
    console.error(err);
    alert('Server connect nahi ho saka!');
  }
};
   

    
    // Auto Slider Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % data.images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data.images.length]);

    return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="service-detail-master"
  >
    <div className="container custom-container py-3 py-md-4">

      {/* Navigation Bar - Responsive Row */}
      <div className="nav-action-bar d-flex justify-content-between align-items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="back-link-btn text-nowrap">
          <ChevronLeftIcon /> Return to Collections
        </button>
        <div className="nav-badge-pill text-nowrap flex-shrink-0">
          <span className="dot-active"></span> Verified Fleet Asset
        </div>
      </div>


      
                {/* Hero Slider Section */}
                <div className="hero-slider-card mb-5">
                    <div className="slider-viewport">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={data.images[currentSlide]}
                                alt={`${data.title} Slide ${currentSlide + 1}`}
                                className="slider-active-image"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        </AnimatePresence>

                        <div className="slider-overlay-gradient">
                            <div className="slider-controls">
                                <button onClick={() => setCurrentSlide((prev) => (prev - 1 + data.images.length) % data.images.length)} className="slider-arrow-btn">
                                    <ChevronLeftIcon />
                                </button>
                                <div className="slider-indicators">
                                    {data.images.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={`indicator-dot ${currentSlide === idx ? 'active' : ''}`}
                                            onClick={() => setCurrentSlide(idx)}
                                        />
                                    ))}
                                </div>
                                <button onClick={() => setCurrentSlide((prev) => (prev + 1) % data.images.length)} className="slider-arrow-btn">
                                    <ChevronRightIcon />
                                </button>
                            </div>
                        </div>

                        <div className="hero-floating-badge">
                            <span className="price-tag">{data.price}</span>
                            <span className="location-tag">{data.location}</span>
                        </div>
                    </div>
                </div>

                {/* Header Title Block */}
                <header className="hero-header-block mb-4 text-start">
                    <span className="category-label">Bespoke Concierge Matrix</span>
                    <h1 className="main-title">{data.title}</h1>
                    <p className="main-tagline">{data.tagline}</p>
                </header>

                {/* Key Metrics Grid */}
                <div className="metrics-grid mb-5">
                    {data.specs.map((spec, idx) => (
                        <div key={idx} className="metric-box">
                            <span className="metric-label">{spec.label}</span>
                            <span className="metric-value">{spec.value}</span>
                        </div>
                    ))}
                </div>

                {/* Tabs Bar */}
                <div className="tabs-header-bar mb-4">
                    <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>Privileges & Features</button>
                    <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>Visual Portfolio</button>
                    <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Guest Chronicles</button>
                </div>

                {/* Tab Content Panel */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="tab-content-panel text-start"
                        >
                            <div className="row g-4 align-items-center">
                                <div className="col-12 col-lg-7">
                                    <div className="overview-text-card">
                                        <h4 className="card-mini-title">Bespoke Experience</h4>
                                        <p className="lead-description">{data.desc}</p>
                                        <p className="body-description">{data.longDesc}</p>
                                    </div>
                                </div>

                                {/* --- FUNCTIONAL RESERVATION WIDGET --- */}
                                <div className="col-12 col-lg-5">
                                    <div className="reservation-card">
                                        <h4 className="reservation-title">Reserve This Asset</h4>
                                        <p className="reservation-sub">
                                            Inquire now for customized dates, security protocols, and private transport.
                                        </p>

                                        <div className="price-display-row">
                                            <span className="price-big">{data.price}</span>
                                            <span className="price-unit">All Inclusive VIP</span>
                                        </div>

                                        {/* Functional Buttons */}
                                        <button
                                            className="cta-primary-gold"
                                            onClick={() => setIsReserveModalOpen(true)}
                                        >
                                            Request Reservation
                                        </button>

                                        <button
                                            className="cta-secondary-outline"
                                            onClick={() => setIsCallModalOpen(true)}
                                        >
                                            Schedule Concierge Call
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'features' && (
                        <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="tab-content-panel text-start">
                            <div className="features-container">
                                <h4 className="card-mini-title mb-3">Included Dynamic Privileges</h4>
                                <div className="row g-3">
                                    {data.features.map((feat, idx) => (
                                        <div key={idx} className="col-12 col-md-6">
                                            <div className="feature-item-card">
                                                <CheckBadgeIcon />
                                                <span>{feat}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'gallery' && (
                        <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="tab-content-panel">
                            <div className="row g-4">
                                {data.images.map((img, idx) => (
                                    <div key={idx} className="col-12 col-sm-6 col-lg-3">
                                        <div className="gallery-grid-card" onClick={() => setCurrentSlide(idx)}>
                                            <img src={img} alt={`Gallery Asset ${idx + 1}`} />
                                            <div className="gallery-card-overlay"><span>Click to Preview</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="tab-content-panel text-start">
                            <div className="row g-4">
                                {data.userExperiences.map((exp, idx) => (
                                    <div key={idx} className="col-12 col-md-6">
                                        <div className="review-card">
                                            <div className="review-header">
                                                <div className="avatar-circle">{exp.avatar}</div>
                                                <div>
                                                    <h6 className="reviewer-name">{exp.name}</h6>
                                                    <span className="reviewer-role">{exp.role}</span>
                                                </div>
                                                <div className="ms-auto rating-stars">
                                                    {[...Array(exp.rating)].map((_, i) => <StarIcon key={i} />)}
                                                </div>
                                            </div>
                                            <p className="review-comment">"{exp.comment}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* ========================================================================= */}
            {/* 1. RESERVATION MODAL POPUP */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {isReserveModalOpen && (
                    <div className="modal-backdrop">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="luxury-modal-container"
                        >
                            <button className="modal-close-btn" onClick={() => setIsReserveModalOpen(false)}>
                                <CloseIcon />
                            </button>

                            {!isBooked ? (
                                <>
                                    <div className="modal-header-zone">
                                        <span className="modal-badge">Bespoke Reservation</span>
                                        <h3>Reserve {data.title}</h3>
                                        <p>Specify your preferred dates and client information.</p>
                                    </div>

                                    <form onSubmit={handleReservationSubmit} className="modal-form-grid">
                                        <div className="row g-3">



                                            {/* Start Date */}
                                            <div className="col-6">
                                                <label className="form-label-custom">Start Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    min={todayDate} // Past dates block karne ke liye
                                                    className="form-input-custom"
                                                    value={startDate}
                                                    onChange={(e) => {
                                                        setStartDate(e.target.value);
                                                        if (endDate && e.target.value > endDate) {
                                                            setEndDate(e.target.value); // Agar start date end date se aage ho jaye
                                                        }
                                                    }}
                                                />
                                            </div>

                                            {/* End Date */}
                                            <div className="col-6">
                                                <label className="form-label-custom">End Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    min={startDate || todayDate} // Start date se pehle ki date disable ho jayegi
                                                    className="form-input-custom"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </div>



                                            <div className="col-12">
                                                <label className="form-label-custom">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. Lord Alexander Vance"
                                                    className="form-input-custom"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label-custom">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="alexander@vance.com"
                                                    className="form-input-custom"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label-custom">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+1 (555) 019-2834"
                                                    className="form-input-custom"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Price Breakdown Calculation */}
                                        <div className="modal-price-summary my-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="text-muted">Estimated Total Cost:</span>
                                                <span className="modal-total-price">${calculateTotal().toLocaleString()} USD</span>
                                            </div>
                                            <small className="text-muted d-block text-start">Includes all priority insurances, security protocols & direct terminal transport.</small>
                                        </div>

                                        <button type="submit" className="cta-primary-gold w-100 py-3 mt-2">
                                            Confirm Reservation Request
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-state-container py-4">
                                    <div className="success-check-circle mb-3">✦</div>
                                    <h4>Reservation Request Dispatched</h4>
                                    <p>Thank you, <strong>{fullName || 'Valued Client'}</strong>. Your dedicated Concierge Desk is processing the clearance for {data.title}. Expect a call shortly.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ========================================================================= */}
            {/* 2. CONCIERGE CALL MODAL POPUP */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {isCallModalOpen && (
                    <div className="modal-backdrop">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="luxury-modal-container"
                        >
                            <button className="modal-close-btn" onClick={() => setIsCallModalOpen(false)}>
                                <CloseIcon />
                            </button>

                            {!isCallScheduled ? (
                                <>
                                    <div className="modal-header-zone">
                                        <span className="modal-badge">Direct Line</span>
                                        <h3>Schedule Concierge Call</h3>
                                        <p>Select your time slot and connection channel.</p>
                                    </div>

                                    <form onSubmit={handleCallSubmit} className="modal-form-grid">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label-custom">Your Contact Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+1 (555) 000-0000"
                                                    className="form-input-custom"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>


                                            <div className="col-6">
                                                <label className="form-label-custom">Preferred Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    min={todayDate} // Past dates block
                                                    className="form-input-custom"
                                                    value={callDate}
                                                    onChange={(e) => setCallDate(e.target.value)}
                                                />
                                            </div>



                                            <div className="col-6">
                                                <label className="form-label-custom">Preferred Time</label>
                                                <select
                                                    className="form-input-custom"
                                                    value={callTime}
                                                    onChange={(e) => setCallTime(e.target.value)}
                                                >
                                                    <option>09:00 AM EST</option>
                                                    <option>12:00 PM EST</option>
                                                    <option>03:00 PM EST</option>
                                                    <option>07:00 PM EST</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label-custom">Connection Channel</label>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className={`channel-pill-btn ${callType === 'phone' ? 'active' : ''}`}
                                                        onClick={() => setCallType('phone')}
                                                    >
                                                        Direct Phone Call
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`channel-pill-btn ${callType === 'whatsapp' ? 'active' : ''}`}
                                                        onClick={() => setCallType('whatsapp')}
                                                    >
                                                        Encrypted WhatsApp
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="cta-primary-gold w-100 py-3 mt-4">
                                            Lock In Call Slot
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-state-container py-4">
                                    <div className="success-check-circle mb-3">✦</div>
                                    <h4>Concierge Call Scheduled</h4>
                                    <p>Our VIP Private Desk will reach out to you via <strong>{callType === 'phone' ? 'Phone Call' : 'WhatsApp'}</strong> on <strong>{callDate || 'your selected date'}</strong> at <strong>{callTime}</strong>.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default ServiceDetail;