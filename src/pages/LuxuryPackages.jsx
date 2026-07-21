import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './LuxuryPackages.css';

const LuxuryPackages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. System & Date Config
  const todayStr = new Date().toISOString().split('T')[0];

  // 2. Core Package & Selection States
  const [activePackage, setActivePackage] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // 3. Room & Stay Configuration States
  const [roomType, setRoomType] = useState('luxury');
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState('2026-08-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-15');

  // 4. Transit & Dynamic Rates States
  const [flightClass, setFlightClass] = useState('first');
  const [departureCountry, setDepartureCountry] = useState('Pakistan');

  const countryFlightSurcharges = {
    Pakistan: 0,
    UAE: 400,
    UK: 950,
    USA: 1400,
  };

  // 5. VIP Promo & Discount System States (Updated with Random Generator)
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [generatedPromo, setGeneratedPromo] = useState({ code: '', discountPercent: 0 });

  // 6. Guest Details States
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [noOfPeople, setNoOfPeople] = useState(1);

  // 7. UI & Modal Control States
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeployedSuccess, setIsDeployedSuccess] = useState(false);

  // Package Data Matrix
  const allPackages = [
    {
      id: 1,
      title: 'New Destination for 2026',
      destinationCountry: 'Switzerland (Europe)',
      placesCount: '47 Places',
      basePrice: 4200,
      img: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600',
      placesList: [
        { id: 'p1_1', name: 'Private Terrace View of Alps', cost: 150, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400' },
        { id: 'p1_2', name: 'Chamonix Mont-Blanc Alpine Pass', cost: 280, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400' },
        { id: 'p1_3', name: 'Hidden Emerald Lake Sanctuary', cost: 120, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400' },
        { id: 'p1_4', name: 'Zermatt Village Secret Overlook', cost: 110, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400' },
        { id: 'p1_5', name: 'Interlaken Panoramic Ridge Trail', cost: 140, img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400' },
        { id: 'p1_6', name: 'Lauterbrunnen Valley Valley Waterfall Base', cost: 90, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400' },
        { id: 'p1_7', name: 'Jungfraujoch Sphinx Observatory Deck', cost: 350, img: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?q=80&w=400' },
        { id: 'p1_8', name: 'Lake Geneva Private Pier Rest', cost: 160, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400' },
        { id: 'p1_9', name: 'Lucerne Chapel Bridge Night View', cost: 75, img: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=400' },
        { id: 'p1_10', name: 'Grindelwald First Cliff Walk Peak', cost: 190, img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=400' }
      ],
      hotels: [
        { name: 'The Ritz-Carlton Alpine Resort', price: 450, stars: '5 Star Luxury', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500' },
        { name: 'Aman Private Chalets & Spa', price: 950, stars: '7 Star Ultra-Elite', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500' }
      ],
      menus: [
        { name: 'Michelin Star French Gastronomy', price: 250, type: 'Fine Dining', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500' },
        { name: 'Artisanal White Truffle & Alpine Fondue', price: 180, type: 'Swiss Heritage', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500' }
      ],
      activities: [
        { name: 'Private Helicopter Matterhorn Tour', price: 950 },
        { name: 'Sunset Supercar Alpine Drive', price: 500 }
      ]
    },
    {
      id: 2,
      title: 'Best Winter Destination',
      destinationCountry: 'Japan (Asia)',
      placesCount: '36 Places',
      basePrice: 5500,
      img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600',
      placesList: [
        { id: 'p2_1', name: 'Hokkaido Private Ski Trail', cost: 200, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400' }
      ],
      hotels: [
        { name: 'Kyoto Elite Ryokan Resort', price: 600, stars: '5 Star Traditional', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500' }
      ],
      menus: [
        { name: 'Authentic Kobe Beef Omakase', price: 350, type: 'Traditional', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500' }
      ],
      activities: [
        { name: 'Private Hot Spring (Onsen) Retreat', price: 400 }
      ]
    },
    {
      id: 3,
      title: 'Experiences Away from Crowd',
      destinationCountry: 'Norway',
      placesCount: 'Bespoke',
      basePrice: 3800,
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600',
      placesList: [
        { id: 'p3_1', name: 'Deep Fjords Private Anchorage', cost: 180, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400' }
      ],
      hotels: [
        { name: 'Arctic Fjord Luxury Lodge', price: 500, stars: '5 Star Scenic', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500' }
      ],
      menus: [
        { name: 'Nordic Organic Fusion Feast', price: 220, type: 'Boutique Cuisine', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500' }
      ],
      activities: [
        { name: 'Northern Lights Private Hunting', price: 600 }
      ]
    }
  ];

  // Monitor location state from Home Page navigation
  useEffect(() => {
    if (location.state && location.state.packageId) {
      const matchedPkg = allPackages.find((pkg) => pkg.id === location.state.packageId);
      if (matchedPkg) {
        setActivePackage(matchedPkg);
      }
    }
  }, [location.state]);

  // Set default selections & TRIGGER AUTOMATIC RANDOM PROMO POP-UP
  useEffect(() => {
    if (activePackage) {
      setSelectedPlaces(activePackage.placesList ? activePackage.placesList.slice(0, 1) : []);
      setSelectedHotel(activePackage.hotels ? activePackage.hotels[0] : null);
      setSelectedMenu(activePackage.menus ? activePackage.menus[0] : null);
      setSelectedActivities([]);
      setRoomType('luxury');
      setNoOfRooms(1);
      setFlightClass('first');
      setDepartureCountry('Pakistan');
      setPromoInput('');
      setAppliedDiscount(0);
      setPromoError('');
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
      setNoOfPeople(1);

      // --- RANDOM PROMO CODE & DISCOUNT GENERATION ---
      const prefixes = ['VIP', 'LUXURY', 'ROYAL', 'HERITAGE', 'GOLD'];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomNumber = Math.floor(100 + Math.random() * 900); // 3 Digit random number
      const newCode = `${randomPrefix}${randomNumber}`; // e.g., VIP742

      const discounts = [5, 10, 15]; // Random discount options
      const newDiscount = discounts[Math.floor(Math.random() * discounts.length)];

      setGeneratedPromo({ code: newCode, discountPercent: newDiscount });

      // Pop-up display timer (1.5 Seconds)
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [activePackage]);

  // Dynamic Calculation Helpers
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    if (end <= start) return 1;
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const getTransitCost = () => {
    let classCost = 0;
    if (flightClass === 'business') classCost = 800;
    if (flightClass === 'first') classCost = 1800;
    if (flightClass === 'private-jet') classCost = 6500;

    const countrySurcharge = countryFlightSurcharges[departureCountry] || 0;
    return classCost + countrySurcharge;
  };

  const calculateHotelUnitCost = () => {
    if (!selectedHotel) return 0;
    return roomType === 'luxury' ? selectedHotel.price + 250 : selectedHotel.price;
  };

  const calculateTotal = () => {
    if (!activePackage) return 0;
    const nights = calculateNights();

    const perPersonItems =
      activePackage.basePrice +
      selectedPlaces.reduce((sum, p) => sum + p.cost, 0) +
      (selectedMenu ? selectedMenu.price : 0) +
      selectedActivities.reduce((sum, act) => sum + act.price, 0) +
      getTransitCost();

    const totalLodgingCost = calculateHotelUnitCost() * noOfRooms * nights;
    const grossTotal = perPersonItems * noOfPeople + totalLodgingCost;

    return grossTotal - grossTotal * (appliedDiscount / 100);
  };

  // Toggle handlers
  const togglePlace = (place) => {
    if (selectedPlaces.some((p) => p.id === place.id)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p.id !== place.id));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const toggleActivity = (activity) => {
    if (selectedActivities.some((act) => act.name === activity.name)) {
      setSelectedActivities(selectedActivities.filter((act) => act.name !== activity.name));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const isFormInvalid =
    !guestName.trim() ||
    !guestEmail.trim() ||
    !guestPhone.trim() ||
    selectedPlaces.length === 0 ||
    noOfPeople < 1 ||
    noOfRooms < 1;

  // API Call Handler
  const handleDeployBlueprint = async () => {
    setIsSubmitting(true);

    const payload = {
      guestName,
      guestEmail,
      guestPhone,
      noOfPeople,
      departureCountry,
      destinationCountry: activePackage ? activePackage.destinationCountry : '',
      flightClass,
      roomType,
      noOfRooms,
      nights: calculateNights(),
      selectedPlaces: selectedPlaces.map((p) => p.name),
      selectedHotel: selectedHotel ? selectedHotel.name : 'Standard Lodging',
      selectedMenu: selectedMenu ? selectedMenu.name : 'Standard Dining',
      selectedActivities: selectedActivities.map((a) => a.name),
      totalPrice: calculateTotal(),
      promoCode: appliedDiscount > 0 ? (promoInput.trim().toUpperCase() || generatedPromo.code) : '',
      appliedDiscount: appliedDiscount,
    };

    try {
      const response = await fetch('http://localhost:5000/api/deploy-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setIsDeployedSuccess(true);
      } else {
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Server connection failed! Please ensure server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // PROMO HANDLERS (UPDATED TO CHECK GENERATED RANDOM PROMO CODE)
  // 1. State add karein (return se upar)
  const [alertModal, setAlertModal] = useState({ show: false, title: '', message: '' });


  // 1. Promo modal se discount apply karne wala function:
  const handleApplyFromModal = (code) => {
    setPromoInput(code);
    setAppliedDiscount(5);
    setShowPromoModal(false); // Code apply hoga aur popup seedha band ho jayega
  };

  // 2. Main Promo Code input button ka function:
  const handlePromoApply = () => {
    if (!promoInput) return;

    const code = promoInput.trim().toUpperCase();

    if (code === 'LUXURY5' || code === 'GOLD509') {
      setAppliedDiscount(5);
      // ❌ YAHAN PELE ALERT() LIKHA HUA THA, USAY REMOVE KAR DIYA HAI
    } else if (code === 'VIP648') {
      setAppliedDiscount(15);
    } else {
      // Single custom error modal ke liye agar lagana chahen:
      setAlertModal({
        show: true,
        title: 'Invalid Code',
        message: 'Invalid promo code. Please try again.'
      });
    }
  };




  return (
    <div className="luxury-master-wrapper" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>

      {/* CARD GRID DASHBOARD */}
      {!activePackage && (
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
            <div>
              <span className="text-muted text-uppercase tracking-widest fs-7">Curated Heritage</span>
              <h1 className="fw-bold text-uppercase m-0 main-title">All Luxury Packages</h1>
            </div>
            <button className="btn btn-outline-dark rounded-pill px-4 py-2 text-uppercase tracking-wider" onClick={() => navigate(-1)}>
              ← Back to Home
            </button>
          </div>

          <div className="row g-4">
            {allPackages.map((pkg) => (
              <div key={pkg.id} className="col-12 col-md-6 col-lg-4">
                <div
                  onClick={() => setActivePackage(pkg)}
                  className="luxury-pkg-card shadow-sm position-relative rounded-4 overflow-hidden"
                  style={{ backgroundImage: `url(${pkg.img})`, cursor: 'pointer' }}
                >
                  <div className="card-luxury-overlay"></div>
                  <div className="card-luxury-content">
                    <span className="badge-luxury-places">{pkg.placesCount}</span>
                    <h3 className="luxury-card-title">{pkg.title}</h3>
                    <p className="text-white-50 small mb-2">Target: {pkg.destinationCountry}</p>
                    <p className="luxury-starting-price">Starting from ${pkg.basePrice.toLocaleString()}</p>
                    <div className="luxury-explore-btn-wrap">
                      <span className="luxury-explore-txt">Bespoke Customizer →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORE CUSTOMIZER PIPELINE */}
      <AnimatePresence>
        {activePackage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="customizer-container container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
              <div>
                <button className="btn btn-link text-decoration-none text-muted p-0 mb-2 fs-6 fw-medium" onClick={() => setActivePackage(null)}>
                  ← Return to Collections
                </button>
                <h1 className="fw-bold text-uppercase m-0 customizer-main-title">{activePackage.title}</h1>
              </div>
              <div className="text-end">
                <span className="text-muted fs-7 text-uppercase tracking-wider">Live Active Invoice</span>
                <h2 className="text-dark fw-bold m-0 text-gradient-gold">${calculateTotal().toLocaleString()}</h2>
              </div>
            </div>

            <div className="row g-5">
              <div className="col-12 col-lg-8">

                {/* 01: DATE RANGE SELECTOR */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>01</span> Choose Expedition Schedule</h4>
                  <div className="bg-white p-4 rounded-4 border border-light-subtle text-start">
                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Check-In Date</label>
                        <input
                          type="date"
                          className="form-control luxury-input-field"
                          min={todayStr}
                          value={checkInDate}
                          onChange={(e) => {
                            setCheckInDate(e.target.value);
                            if (new Date(e.target.value) >= new Date(checkOutDate)) {
                              setCheckOutDate(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Check-Out Date</label>
                        <input
                          type="date"
                          className="form-control luxury-input-field"
                          min={checkInDate || todayStr}
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-secondary fs-7 fw-medium bg-light p-2 rounded text-center">
                      ⏳ Stay Duration Framework: <span className="text-dark fw-bold">{calculateNights()} Night(s)</span>
                    </div>
                  </div>
                </div>

                {/* 02: CURATED ROUTE */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>02</span> Curate Your Custom Route</h4>
                  <div className="row g-3">
                    {activePackage.placesList.map((place) => {
                      const isPlaceSelected = selectedPlaces.some(p => p.id === place.id);
                      return (
                        <div key={place.id} className="col-12 col-md-6">
                          <div className={`selectable-place-card position-relative rounded-4 overflow-hidden shadow-sm ${isPlaceSelected ? 'place-card-active' : ''}`} onClick={() => togglePlace(place)}>
                            <img src={place.img} className="w-100 h-100 object-fit-cover" alt={place.name} />
                            <div className="place-card-overlay"></div>
                            <div className={`place-select-indicator ${isPlaceSelected ? 'selected' : ''}`}>{isPlaceSelected ? '✓' : '+'}</div>
                            <div className="place-card-details">
                              <h6 className="text-white fw-bold m-0 lh-sm">{place.name}</h6>
                              <span className="place-premium-tag">+${place.cost} per person</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 03: HOTEL BRAND & INVENTORY */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>03</span> Luxury Lodging Allocation</h4>
                  <div className="d-flex flex-column gap-3 mb-4">
                    {activePackage.hotels.map((hotel, hIdx) => (
                      <div key={hIdx} className={`custom-select-row d-flex align-items-center p-3 rounded-4 border ${selectedHotel?.name === hotel.name ? 'active-luxury border-dark shadow-sm' : 'border-light-subtle'}`} onClick={() => setSelectedHotel(hotel)}>
                        <div className="hotel-img-container rounded-3 overflow-hidden me-3"><img src={hotel.img} className="w-100 h-100 object-fit-cover" alt={hotel.name} /></div>
                        <div className="text-start flex-grow-1">
                          <span className="badge bg-dark text-white rounded-pill px-2.5 py-1 fs-9 mb-1 text-uppercase tracking-wider">{hotel.stars}</span>
                          <h5 className="fw-bold m-0 fs-5 text-dark">{hotel.name}</h5>
                        </div>
                        <div className="text-end ps-2"><span className="fw-bold fs-5 text-dark">+${hotel.price} <span className="fs-8 text-muted fw-normal">/night</span></span></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-light p-4 rounded-4 text-start">
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-md-7">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Select Room Class</label>
                        <div className="d-flex gap-2">
                          <button type="button" className={`btn w-50 py-2 rounded-3 fw-bold fs-8 ${roomType === 'simple' ? 'btn-dark' : 'btn-outline-dark bg-white'}`} onClick={() => setRoomType('simple')}>Standard Room</button>
                          <button type="button" className={`btn w-50 py-2 rounded-3 fw-bold fs-8 ${roomType === 'luxury' ? 'btn-dark' : 'btn-outline-dark bg-white'}`} onClick={() => setRoomType('luxury')}>Luxury Suite (+$250)</button>
                        </div>
                      </div>
                      <div className="col-12 col-md-5">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Room Count</label>
                        <input type="number" min="1" className="form-control luxury-input-field fw-bold" value={noOfRooms} onChange={(e) => setNoOfRooms(Math.max(1, parseInt(e.target.value) || 1))} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 04: FLIGHT CORRIDOR */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>04</span> Premium Flight Corridor & Origin Rates</h4>
                  <p className="text-muted mb-3">Rates scale dynamically based on route length from origin country.</p>

                  <div className="bg-white p-4 rounded-4 border border-light-subtle text-start mb-4">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Fly From (Departure Origin)</label>
                        <select
                          className="form-select luxury-input-field fw-semibold text-dark"
                          value={departureCountry}
                          onChange={(e) => setDepartureCountry(e.target.value)}
                        >
                          <option value="Pakistan">Pakistan (Base Fare)</option>
                          <option value="UAE">UAE (+$400 Surcharge)</option>
                          <option value="UK">United Kingdom (+$950 Surcharge)</option>
                          <option value="USA">United States (+$1,400 Surcharge)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 text-start">
                    {[
                      { id: 'business', label: '💼 Business Class Elite', price: 800 },
                      { id: 'first', label: '👑 Sovereign First Class', price: 1800 },
                      { id: 'private-jet', label: '✈️ Private Jet Charter', price: 6500 }
                    ].map((tier) => (
                      <div key={tier.id} className="col-12 col-md-4">
                        <div
                          className={`p-3 rounded-4 border text-center cursor-pointer h-100 d-flex flex-column justify-content-between ${flightClass === tier.id ? 'active-luxury border-dark fw-bold' : 'bg-white border-light-subtle'}`}
                          onClick={() => setFlightClass(tier.id)}
                        >
                          <span className="fs-7 text-dark mb-2 d-block">{tier.label}</span>
                          <span className="fw-bold fs-6 text-secondary">+${(tier.price + (countryFlightSurcharges[departureCountry] || 0))} <span className="fs-9 text-muted fw-normal">/pax</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 05: FINE DINING */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>05</span> Culinary Gastronomy Menus</h4>
                  <div className="row g-3">
                    {activePackage.menus.map((menu, mIdx) => (
                      <div key={mIdx} className="col-12 col-md-6">
                        <div className={`custom-menu-card h-100 overflow-hidden text-center rounded-4 border d-flex flex-column justify-content-between ${selectedMenu?.name === menu.name ? 'active-luxury border-dark' : 'border-light-subtle'}`} onClick={() => setSelectedMenu(menu)}>
                          <div className="menu-img-header-wrap"><img src={menu.img} className="w-100 h-100 object-fit-cover" alt={menu.name} /></div>
                          <div className="p-3 text-start flex-grow-1 d-flex flex-column justify-content-between">
                            <div>
                              <span className="fs-8 text-muted text-uppercase tracking-wider d-block mb-1">{menu.type}</span>
                              <h6 className="fw-bold text-dark m-0 fs-6">{menu.name}</h6>
                            </div>
                            <div className="border-top pt-2 mt-2 w-100 text-end"><span className="fw-bold text-dark fs-6">+${menu.price} /pax</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 06: SIGNATURE ACTIVITIES */}
                <div className="mb-5">
                  <h4 className="section-step-title"><span>06</span> Unmissable Signature Activities</h4>
                  <div className="d-flex flex-column gap-2 mt-2">
                    {activePackage.activities.map((act, aIdx) => {
                      const isSelected = selectedActivities.some(item => item.name === act.name);
                      return (
                        <div key={aIdx} className={`custom-select-row d-flex justify-content-between align-items-center p-3 rounded-4 border ${isSelected ? 'active-luxury border-dark' : 'border-light-subtle'}`} onClick={() => toggleActivity(act)}>
                          <div className="d-flex align-items-center gap-3 text-start">
                            <div className={`custom-checkbox-circle ${isSelected ? 'checked' : ''}`}></div>
                            <h5 className="fw-semibold m-0 fs-6 text-dark">{act.name}</h5>
                          </div>
                          <span className="fw-bold text-dark">+${act.price} /pax</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 07: GUEST PASSPORT FORM */}
                <div className="mb-4">
                  <h4 className="section-step-title"><span>07</span> Concierge Passport & Guest Details</h4>
                  <div className="bg-white p-4 rounded-4 border border-light-subtle text-start">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Full Lead Name</label>
                        <input type="text" className="form-control luxury-input-field" placeholder="Shahzaib Khan" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Active Contact Number</label>
                        <input type="tel" className="form-control luxury-input-field" placeholder="+92 300 1234567" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-8">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Secure Email Address</label>
                        <input
                          type="email"
                          required
                          className="form-control luxury-input-field"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">Total Headcount</label>
                        <input type="number" min="1" className="form-control luxury-input-field fw-bold" value={noOfPeople} onChange={(e) => setNoOfPeople(Math.max(1, parseInt(e.target.value) || 1))} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* STICKY BILLING MANIFEST */}
              <div className="col-12 col-lg-4">
                <div className="sticky-summary-card p-4 rounded-4 shadow-sm border bg-white text-start">
                  <h4 className="fw-bold text-uppercase fs-5 mb-4 tracking-wide border-bottom pb-3 text-dark">Build Manifest</h4>

                  <div className="mb-2 fs-7 bg-light p-2 rounded text-secondary fw-medium">
                    🛫 Origin Transit: <span className="text-dark fw-bold">{departureCountry}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Base rate ({noOfPeople} Pax):</span>
                    <span className="fw-semibold text-dark">${(activePackage.basePrice * noOfPeople).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Route Landmarks:</span>
                    <span className="fw-semibold text-dark">+${(selectedPlaces.reduce((s, p) => s + p.cost, 0) * noOfPeople).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Air Fare & Country Fee:</span>
                    <span className="fw-semibold text-dark">+${(getTransitCost() * noOfPeople).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Hotel ({calculateNights()} Nights):</span>
                    <span className="fw-semibold text-dark">+${(calculateHotelUnitCost() * noOfRooms * calculateNights()).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Fine Dining:</span>
                    <span className="fw-semibold text-dark">+${((selectedMenu ? selectedMenu.price : 0) * noOfPeople).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 fs-6 border-top pt-2">
                    <span className="text-muted">Signature Activities:</span>
                    <span className="fw-semibold text-dark">+${(selectedActivities.reduce((s, a) => s + a.price, 0) * noOfPeople).toLocaleString()}</span>
                  </div>

                  {/* PROMO CODE SECTION */}
                  <div className="promo-input-wrapper border-top pt-3 mt-2">
                    <label className="form-label fw-bold text-muted fs-8 text-uppercase tracking-wider">VIP Voucher Code</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm text-uppercase fw-bold text-dark"
                        placeholder="LUXURY5"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        disabled={appliedDiscount > 0}
                      />
                      {appliedDiscount > 0 ? (
                        <button
                          className="btn btn-outline-danger btn-sm px-3 fw-bold"
                          type="button"
                          onClick={() => {
                            setAppliedDiscount(0);
                            setPromoInput('');
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button className="btn btn-dark btn-sm px-3 fw-bold" type="button" onClick={handlePromoApply}>
                          Apply
                        </button>
                      )}
                    </div>

                    {appliedDiscount > 0 && (
                      <span className="text-success fs-8 fw-semibold mt-1 d-block">
                        ✓ {appliedDiscount}% Elite Discount Active
                      </span>
                    )}
                  </div>

                  <div className="total-highlight-banner p-3 rounded-3 my-4 d-flex justify-content-between align-items-center bg-light border">
                    <div>
                      <span className="fw-bold text-uppercase tracking-wider fs-8 text-secondary d-block">Grand Total</span>
                      <span className="fs-8 text-muted">{noOfPeople} Pax / {calculateNights()} Nights</span>
                    </div>
                    <span className="fw-extrabold fs-3 text-dark">${calculateTotal().toLocaleString()}</span>
                  </div>

                  <button
                    className="btn btn-dark w-100 rounded-pill py-3 text-uppercase tracking-widest fw-bold btn-confirm-trigger"
                    disabled={isFormInvalid}
                    onClick={() => setShowSummaryModal(true)}
                  >
                    {selectedPlaces.length === 0 ? 'Select a Place First' : isFormInvalid ? 'Fill Credentials' : 'Confirm Experience'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECURE CHECKOUT MODAL */}
      <AnimatePresence>
        {showSummaryModal && activePackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay-fixed d-flex align-items-center justify-content-center p-3"
            onClick={() => {
              if (!isSubmitting) {
                setShowSummaryModal(false);
                setIsDeployedSuccess(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="popup-content-box bg-white p-4 p-md-5 rounded-4 shadow-lg text-center position-relative"
              onClick={(e) => e.stopPropagation()}
            >

              {!isDeployedSuccess ? (
                /* STATE 1: MANIFEST SUMMARY & CONFIRMATION BUTTON */
                <>
                  <button className="popup-close-btn" onClick={() => setShowSummaryModal(false)}>✕</button>

                  <div className="success-icon-wrap mb-3">✓</div>
                  <h2 className="fw-extrabold text-uppercase text-dark mb-1 tracking-wide fs-3">Manifest Securely Locked</h2>

                  <div className="receipt-breakdown-box p-4 rounded-4 text-start mb-4 bg-light">
                    <h5 className="fw-bold text-dark text-uppercase fs-7 tracking-wide mb-2 label-gold-receipt">Passenger Passport</h5>
                    <div className="mb-1 fs-7"><strong className="text-secondary">Lead Passenger:</strong> <span className="float-end text-dark fw-bold">{guestName}</span></div>
                    <div className="mb-3 fs-7"><strong className="text-secondary">Total Party Size:</strong> <span className="float-end text-dark badge bg-dark text-white rounded-pill px-2">{noOfPeople} Guests</span></div>

                    <h5 className="fw-bold text-dark text-uppercase fs-7 tracking-wide mb-2 pt-2 border-top label-gold-receipt">Elite Flight Routing Matrix</h5>
                    <div className="mb-1 fs-7"><strong className="text-secondary">Departure Origin:</strong> <span className="float-end text-dark fw-bold text-uppercase">{departureCountry}</span></div>
                    <div className="mb-1 fs-7"><strong className="text-secondary">Target Destination:</strong> <span className="float-end text-success fw-bold text-uppercase">{activePackage.destinationCountry}</span></div>
                    <div className="mb-3 fs-7"><strong className="text-secondary">Air Transit Corridor:</strong> <span className="float-end text-dark fw-bold text-uppercase">{flightClass}</span></div>

                    <h5 className="fw-bold text-dark text-uppercase fs-7 tracking-wide mb-2 pt-2 border-top label-gold-receipt">Lodging Configuration</h5>
                    <div className="mb-1 fs-7"><strong className="text-secondary">Hotel Layout:</strong> <span className="float-end text-dark fw-bold text-success">{roomType === 'luxury' ? '✨ Luxury Suite' : '🛏️ Standard Room'}</span></div>
                    <div className="mb-3 fs-7"><strong className="text-secondary">Timeframe Framework:</strong> <span className="float-end text-dark fw-bold">{noOfRooms} Room(s) × {calculateNights()} Night(s)</span></div>

                    <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-dark text-uppercase tracking-wider fs-6">Grand Total Invoice:</span>
                      <span className="fw-extrabold text-dark fs-3">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark w-100 rounded-pill py-2.5 text-uppercase tracking-widest fw-bold shadow-sm"
                    disabled={isSubmitting}
                    onClick={handleDeployBlueprint}
                  >
                    {isSubmitting ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending Blueprint...
                      </span>
                    ) : (
                      'Deploy Luxury Blueprint'
                    )}
                  </button>
                </>
              ) : (
                /* STATE 2: SUCCESS MESSAGE SCREEN */
                <div className="py-4 text-center">
                  <div className="mb-3 text-success display-4">✨</div>
                  <h2 className="fw-extrabold text-dark text-uppercase mb-2 tracking-wide">Blueprint Deployed!</h2>

                  <div className="alert alert-success border-0 bg-success-subtle text-success-emphasis fw-bold fs-5 my-3 py-3 rounded-3">
                    We will contact you soon
                  </div>

                  <p className="text-muted small mb-4 px-3">
                    Your customized luxury experience has been transmitted to our VIP Concierge team. We have also sent a copy to <strong>{guestEmail}</strong>.
                  </p>

                  <button
                    className="btn btn-dark rounded-pill px-5 py-2.5 text-uppercase tracking-wider fw-bold shadow-sm"
                    onClick={() => {
                      setIsDeployedSuccess(false);
                      setShowSummaryModal(false);
                      setActivePackage(null);
                    }}
                  >
                    Back to Collections
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROMO CODE OFFER POPUP MODAL */}
      <AnimatePresence>
        {showPromoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay-fixed d-flex align-items-center justify-content-center p-3"
            style={{ zIndex: 1100, backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', inset: 0 }}
            onClick={() => setShowPromoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="popup-content-box bg-white p-4 p-md-5 rounded-4 shadow-lg text-center position-relative"
              style={{ maxWidth: '420px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="popup-close-btn border-0 bg-transparent fs-5 fw-bold position-absolute top-0 end-0 m-3"
                onClick={() => setShowPromoModal(false)}
              >
                ✕
              </button>

              <div className="fs-1 mb-2">🎁</div>
              <span className="badge bg-warning text-dark fw-bold text-uppercase px-3 py-2 rounded-pill fs-8 mb-2">
                Exclusive VIP Offer
              </span>

              <h3 className="fw-extrabold text-dark text-uppercase tracking-wide fs-4 mt-2">
                Get 5% Instant Discount
              </h3>

              <p className="text-muted fs-7 mb-4">
                Use special promo code <strong className="text-dark">LUXURY5</strong> at checkout or claim it directly now!
              </p>

              {/* PROMO CODE DISPLAY BOX */}
              <div className="border border-2 border-dashed border-warning rounded-3 p-3 bg-light mb-4 d-flex justify-content-between align-items-center">
                <span className="fw-extrabold fs-5 text-dark tracking-widest">LUXURY5</span>
                <span className="badge bg-dark text-white px-2 py-1 fs-8">5% OFF</span>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark rounded-pill py-2.5 fw-bold text-uppercase tracking-wider shadow-sm"
                  onClick={() => handleApplyFromModal('LUXURY5')}
                >
                  Claim 5% Discount
                </button>
                <button
                  className="btn btn-link text-muted text-decoration-none fs-8 fw-semibold"
                  onClick={() => setShowPromoModal(false)}
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* CUSTOM ALERT POPUP (Replaces native browser alert) */}
      {/* CUSTOM POPUP (No localhost heading) */}
      <AnimatePresence>
        {alertModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay-fixed d-flex align-items-center justify-content-center p-3"
            style={{ zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', inset: 0 }}
            onClick={() => setAlertModal({ show: false, title: '', message: '' })}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-4 rounded-4 shadow-lg text-center position-relative"
              style={{ maxWidth: '360px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="fs-1 mb-2">🎉</div>
              <h4 className="fw-bold text-dark mb-2">{alertModal.title}</h4>
              <p className="text-muted fs-7 mb-4">{alertModal.message}</p>

              <button
                className="btn btn-dark rounded-pill w-100 py-2 fw-bold text-uppercase fs-8"
                onClick={() => setAlertModal({ show: false, title: '', message: '' })}
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default LuxuryPackages;