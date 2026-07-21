import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCompass, FiShield, FiAward, FiHeart, FiArrowLeft } from 'react-icons/fi';
import './About.css';

export default function About() {
  const stats = [
    { label: "Curated Trails", value: "120+" },
    { label: "Satisfaction Rate", value: "99.8%" },
    { label: "VIP Travelers", value: "15,000+" },
    { label: "Global Hubs", value: "35" },
  ];

  const features = [
    {
      icon: <FiCompass className="feature-icon" />,
      title: "Bespoke Itineraries",
      desc: "Every journey is custom-tailored to your precise preferences, schedule, and tastes."
    },
    {
      icon: <FiShield className="feature-icon" />,
      title: "Encrypted Security",
      desc: "Private logistics, encrypted comms, and VIP discreet handling from start to finish."
    },
    {
      icon: <FiAward className="feature-icon" />,
      title: "Unrivaled Luxury",
      desc: "Exclusive access to 5-star private estates, charter flights, and luxury yachts."
    },
    {
      icon: <FiHeart className="feature-icon" />,
      title: "24/7 VIP Concierge",
      desc: "A dedicated personal concierge assigned to handle every whim during your trip."
    }
  ];

  return (
    <div className="about-page position-relative overflow-hidden">
      {/* Header Nav Bar */}
      <header className="container py-4 position-relative z-3">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="btn btn-outline-dark rounded-pill px-3 py-2 d-flex align-items-center gap-2 back-btn">
            <FiArrowLeft /> Back to Home
          </Link>
          <span className="fw-bold logo-text fs-4 text-dark">NOVA TRAILS</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-5 text-center position-relative z-3">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <span className="text-uppercase tracking-widest sub-title mb-2 d-block">Crafting Extraordinary Escapes</span>
          <h1 className="display-3 fw-bold mb-4 text-dark">Redefining Luxury Travel</h1>
          <p className="lead text-muted max-w-700 mx-auto">
            At Nova Trails, we don't just organize trips—we engineer timeless experiences. Built for discerning travelers who seek uncompromised luxury, absolute privacy, and seamless exploration.
          </p>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="container py-4 position-relative z-3">
        <div className="row g-4 justify-content-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="about-light-card text-center py-4 px-2 shadow-sm"
              >
                <h2 className="display-5 fw-bold text-gold mb-1">{stat.value}</h2>
                <p className="small text-uppercase text-muted mb-0 tracking-wider fw-semibold">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container py-5 my-4 position-relative z-3">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-image-wrapper position-relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" 
                alt="Luxury Travel" 
                className="img-fluid rounded-4 shadow main-img"
              />
              <div className="light-badge p-3 rounded-3 position-absolute bottom-0 end-0 m-4 shadow-sm">
                <span className="fw-bold d-block text-dark">100% Tailored</span>
                <small className="text-muted">Designed Around You</small>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="h1 fw-bold mb-3 text-dark">Our Legacy & Ethos</h2>
              <p className="text-muted mb-4">
                Founded with a vision to connect high-profile adventurers to the world's most remote and enchanting destinations, Nova Trails bridges ultra-luxury hospitality with raw, untamed exploration.
              </p>
              <p className="text-muted mb-4">
                Whether chartering a private jet through Alpine corridors or booking exclusive island sanctuaries, our relentless attention to detail ensures your comfort is never compromised.
              </p>
              <Link to="/packages" className="btn btn-gold rounded-pill px-4 py-3 fw-semibold text-uppercase text-white">
                Explore Luxury Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Features Grid */}
      <section className="container py-5 position-relative z-3">
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark">The Nova Standard</h2>
          <p className="text-muted">What elevates us above conventional travel agencies.</p>
        </div>

        <div className="row g-4">
          {features.map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="about-feature-card p-4 h-100 rounded-4 text-center d-flex flex-column align-items-center shadow-sm"
              >
                <div className="icon-wrapper mb-3 p-3 rounded-circle">{item.icon}</div>
                <h4 className="fw-semibold mb-2 text-dark">{item.title}</h4>
                <p className="small text-muted mb-0">{item.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-5 my-5 text-center position-relative z-3">
        <div className="about-cta-card p-5 rounded-4 shadow-sm position-relative overflow-hidden">
          <h2 className="display-6 fw-bold mb-3 text-dark">Ready to Design Your Escape?</h2>
          <p className="lead mb-4 max-w-600 mx-auto text-muted">
            Connect with our VIP Concierge team today and lock in your bespoke blueprint.
          </p>
          <Link to="/" className="btn btn-dark rounded-pill px-5 py-3 fw-bold text-uppercase">
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
}