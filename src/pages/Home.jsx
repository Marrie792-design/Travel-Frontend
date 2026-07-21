import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiMapPin, FiCompass, FiCalendar, FiUsers, FiSearch, FiX,
  FiCheck, FiChevronRight, FiUser, FiHeart, FiClock, FiDollarSign, FiInfo
} from 'react-icons/fi';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useNavigate, Link } from 'react-router-dom';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pakistan');
  const [index, setIndex] = useState(0);

  // Core Dynamic Data Panels for Wishlist
  const [savedExperiences, setSavedExperiences] = useState([
    {
      id: 'default-1',
      title: "HUNZA VALLEY LUXE",
      img: "https://media.istockphoto.com/id/1257163955/photo/northern-areas-of-pakistan.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ln5xTGOaAo0WY8_yX_edoa1XpvQGfoP29d3-HFT-sbw=",
      fullTripData: {
        id: 101,
        country: 'Pakistan',
        title: 'HUNZA VALLEY LUXE',
        price: '$1,800',
        img: 'https://media.istockphoto.com/id/1257163955/photo/northern-areas-of-pakistan.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ln5xTGOaAo0WY8_yX_edoa1XpvQGfoP29d3-HFT-sbw=',
        desc: 'Experience the premium cultural retreat under Mount Rakaposhi.',
        days: ['Arrival in Gilgit & luxury transfer to Hunza', 'Private tour of Altit & Baltit forts', 'Attabad Lake high-speed luxury boating', 'Departure via scenic helicopter flight']
      }
    }
  ]);

  // Unified States for Overlays & Drawers
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageBooking, setShowPackageBooking] = useState(false);
  const [packageUserInfo, setPackageUserInfo] = useState({ name: '', email: '', phone: '', numPeople: 1 });
  const [packageSuccessMsg, setPackageSuccessMsg] = useState(false);

  // States for Book With Us (Custom Trip Builder Wizard)
  const [isTripBuilderOpen, setIsTripBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripTime, setTripTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [wizardUserInfo, setWizardUserInfo] = useState({ name: '', email: '', phone: '' });

  // States for Nova Club & Tickets
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedTicketTrip, setSelectedTicketTrip] = useState(null);
  const [ticketUserInfo, setTicketUserInfo] = useState({ name: '', email: '', phone: '', numPeople: 1 });
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Newsletter & Contact Form States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);

  const [contactData, setContactData] = useState({ name: '', phone: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);

  const todayDateStr = new Date().toISOString().split('T')[0];

  // Enriched Upcoming Trips Data Structure (Nova Club)
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
      hotelImg: "https://media.istockphoto.com/id/1257163955/photo/northern-areas-of-pakistan.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ln5xTGOaAo0WY8_yX_edoa1XpvQGfoP29d3-HFT-sbw=",
      menuInfo: "Organic Farm-to-Table Breakfasts, Traditional Walnut Cakes & Mountain Sage Tea",
      activities: "Altit & Baltit Fort VIP Guided Access, Attabad Lake Jet Skiing & Eagle's Nest Sunset Photography"
    }
  ];

  // Favorite Toggle Handler
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
      { id: 101, country: 'Pakistan', title: 'HUNZA VALLEY LUXE', price: '$1,800', img: 'https://media.istockphoto.com/id/1257163955/photo/northern-areas-of-pakistan.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ln5xTGOaAo0WY8_yX_edoa1XpvQGfoP29d3-HFT-sbw=', desc: 'Experience the premium cultural retreat under Mount Rakaposhi.', days: ['Arrival in Gilgit & luxury transfer to Hunza', 'Private tour of Altit & Baltit forts', 'Attabad Lake high-speed luxury boating', 'Departure via scenic helicopter flight'] },
      { id: 102, country: 'Pakistan', title: 'SKARDU GLACIAL TRAILS', price: '$2,200', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop', desc: 'Witness the surreal cold deserts and Shangrila resorts.', days: ['Landing at Skardu Airport', 'Boating at Upper Kachura lake', 'Deosai Plains private safari tour', 'Corporate high-tea at Shigar Fort'] },
      { id: 103, country: 'UAE', title: 'DUBAI DESERT DIAMOND', price: '$3,800', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop', desc: 'Experience the ultimate luxury of Burj Al Arab and private dune yachting.', days: ['VIP arrival at Dubai Airport', 'Private yacht cruise at Marina', 'Sunset safari with private chef', 'Helicopter tour over Palm Jumeirah'] },
      { id: 104, country: 'Turkey', title: 'CAPPADOCIA SKYWARD JOURNEY', price: '$2,900', img: 'https://images.unsplash.com/photo-1772865024393-ab25d0061bc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q0FQUEFET0NJQSUyMFNLWVdBUkQlMjBKT1VSTkVZfGVufDB8fDB8fHww', desc: 'Fly over ancient fairy chimneys in a private hot air balloon.', days: ['Arrival at luxury cave suite', 'Private sunrise balloon expedition', 'Guided tour of underground cities', 'Wine tasting in volcanic valleys'] },
      { id: 105, country: 'Japan', title: 'KYOTO CHERRY BLOSSOM ELITE', price: '$4,500', img: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop', desc: 'Immerse yourself in traditional tea ceremonies and private Zen garden tours.', days: ['Arrival in Kyoto traditional Ryokan', 'Private Geisha cultural performance', 'Bamboo forest meditation tour', 'Michelin-star Kaiseki dinner'] },
      { id: 106, country: 'Italy', title: 'AMALFI COAST VELVET ESCAPE', price: '$5,200', img: 'https://media.istockphoto.com/id/1326101971/photo/famous-fiordo-di-furore-beach-at-amalfi-coast-campania-italy.webp?a=1&b=1&s=612x612&w=0&k=20&c=h2t8dbT3N9HVgHI4tSMbADnEUv3BJU6Rbn3qghBva0I=', desc: 'Luxury cliffside villas overlooking the sparkling Tyrrhenian Sea.', days: ['Private transfer to Positano villa', 'Yacht tour along Capri islands', 'Cooking masterclass with local chef', 'Sunset dinner at cliffside terrace'] }
    ],
    Switzerland: [
      { id: 201, country: 'Switzerland', title: 'SWISS ALPINE ESCAPE', price: '$2,500', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop', desc: 'Premium chalets and private ski passes in Zermatt.', days: ['Zurich Airport private limousine meetup', 'Zermatt eco-resort check-in', 'Private skiing session with world champions', 'Panoramic glacier helicopter tour'] },
      { id: 202, country: 'Switzerland', title: 'LUCERNE LAKE SERENITY', price: '$3,100', img: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop', desc: 'Breathtaking lakeside retreats and private boat cruises through the heart of Switzerland.', days: ['Arrival at Lucerne luxury waterfront suite', 'Private sunset yacht cruise on Lake Lucerne', 'Mount Pilatus exclusive VIP cable car ride', 'Traditional Swiss chocolate atelier masterclass'] },
      { id: 203, country: 'Switzerland', title: 'ST. MORITZ WINTER GLAMOUR', price: '$4,200', img: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600&auto=format&fit=crop', desc: 'Experience elite winter sports and high-end shopping in the legendary St. Moritz.', days: ['Private jet transfer to Samedan Airport', 'Check-in to five-star palace resort', 'Horse-drawn carriage tour of frozen lake', 'Gourmet fine dining in private mountain cabin'] },
      { id: 204, country: 'Switzerland', title: 'GRINDELWALD CLIFFSIDE ADVENTURE', price: '$2,800', img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop', desc: 'Unmatched views of the Eiger North Face from your private cliffside balcony.', days: ['Arrival in Interlaken and private train transit', 'First Cliff Walk private photography tour', 'Eiger glacier hiking with expert guide', 'Relaxation in mountain thermal infinity pool'] }
    ],
    Iceland: [
      { id: 301, country: 'Iceland', title: 'AURORA GLASSHOUSE', price: '$4,100', img: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600&auto=format&fit=crop', desc: 'Sleep under Northern Lights in customized transparent luxury domes.', days: ['Reykjavík golden circle customized drive', 'Blue Lagoon private spa reservation', 'Ice Cave dynamic exploration', 'Superjeep hunting for Northern Lights'] },
      { id: 302, country: 'Iceland', title: 'VOLCANIC HELI-SAFARI', price: '$4,800', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600&auto=format&fit=crop', desc: 'Exclusive helicopter tours over active volcanoes and black sand beaches.', days: ['Private helicopter transfer from Reykjavík', 'Aerial tour of Fagradalsfjall volcano', 'VIP picnic on Diamond Beach', 'Exclusive access to geothermal secret lagoon'] },
      { id: 303, country: 'Iceland', title: 'ARCTIC WHALE & GLACIER LODGE', price: '$3,900', img: 'https://media.istockphoto.com/id/2183614993/photo/picturesque-village-on-coast-of-greenland-colorful-houses-in-tasiilaq-east-greenland.webp?a=1&b=1&s=612x612&w=0&k=20&c=NpJC5NA3MwuUzBFoC9fal__b1MHUcnoL21ONtJ7toMA=', desc: 'Stay in a secluded glacier lodge with private whale watching expeditions.', days: ['Arrival at luxury remote glacier lodge', 'Private yacht whale watching in Husavik', 'Guided ice climbing on Vatnajökull', 'Gourmet Nordic dinner by a private chef'] }
    ],
    Norway: [
      { id: 401, country: 'Norway', title: 'FJORD SUPERYACHT', price: '$5,400', img: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?q=80&w=600&auto=format&fit=crop', desc: 'Sail deep inside private fjords with on-board elite chefs.', days: ['Oslo luxury yacht onboarding', 'Fjord cruising through Geirangerfjord', 'Kayaking in glassy crystal waters', 'Seafood gourmet processing experience'] },
      { id: 402, country: 'Norway', title: 'LOFOTEN ARCTIC VILLAS', price: '$4,600', img: 'https://images.unsplash.com/photo-1685821085722-2885f04a4610?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fExPRk9URU4lMjBBUkNUSUMlMjBWSUxMQVN8ZW58MHx8MHx8fDA%3D', desc: 'Seafront luxury cabins in the Lofoten Islands with midnight sun photography.', days: ['Transfer to private sea-facing rorbu villa', 'Midnight sun photography masterclass', 'Private RIB boat eagle safari', 'Traditional Nordic fishing and culinary prep'] },
      { id: 403, country: 'Norway', title: 'TROMSØ AURORA RETREAT', price: '$4,200', img: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=600&auto=format&fit=crop', desc: 'Dog sledding and arctic dome living under the mesmerizing auroras.', days: ['Check-in to transparent Arctic dome', 'Exclusive husky sledding expedition', 'Sami culture and reindeer feeding experience', 'Private aurora hunting with expert guides'] }
    ],
    Europe: [
      { id: 501, country: 'Peru', title: 'MACHU PICCHU PRIVÉ', price: '$1,400', img: 'https://images.unsplash.com/photo-1530999811698-221aa9eb1739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE1BQ0hVJTIwUElDQ0hVfGVufDB8fDB8fHww', desc: 'Luxury train transfers and heritage VIP access vouchers.', days: ['Cusco colonial suite check-in', 'Hiram Bingham train cruise to Machu Picchu', 'Exclusive expert historical briefing tour', 'Andean wellness spa treatment'] },
      { id: 502, country: 'France', title: 'PARISIAN CHÂTEAU ELITE', price: '$5,800', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop', desc: 'Stay in a historic chateau with exclusive access to Parisian art and couture.', days: ['VIP airport transfer to Versailles-adjacent Château', 'After-hours private tour of the Louvre', 'Exclusive fashion house atelier visit', 'Michelin-star dinner on the Seine river'] },
      { id: 503, country: 'Greece', title: 'SANTORINI CALDERA YACHTING', price: '$4,500', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop', desc: 'Infinity pools, cliffside dining, and private catamaran sailing in the Aegean.', days: ['Helicopter arrival at Oia luxury suite', 'Private sunset catamaran cruise', 'Santorini ancient winery VIP tasting', 'Cliffside romantic private dining'] }
    ],
    Japan: [
      { id: 601, country: 'Japan', title: 'MOUNT FUJI RETREAT', price: '$3,100', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', desc: 'Private dynamic onsen resorts overlooking iconic volcanic peak vistas.', days: ['Bullet train green-car transfer to Hakone', 'Private ryokan check-in with private onsen', 'Mount Fuji helicopter photo flyover', 'Exclusive Tokyo premium culinary night'] },
      { id: 602, country: 'Japan', title: 'HOKKAIDO POWDER RESERVE', price: '$4,300', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop', desc: 'Elite snowboarding and skiing in the pristine powder snow of Niseko.', days: ['Arrival at Niseko ski-in ski-out luxury chalet', 'Private backcountry skiing with Olympic guide', 'Exclusive snowmobile forest expedition', 'Premium Wagyu beef and sake tasting'] }
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

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Universal Email / Reservation Backend Dispatcher
  const sendTripNotification = async (payload) => {
    try {
      const response = await fetch('https://travel-backend-blue.vercel.app/api/send-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        console.log('Notification Sent Successfully!');
      }
    } catch (error) {
      console.error('Notification dispatch failed:', error);
    }
  };

  // 1️⃣ Experience Section Submit Handler
  const handlePackageBookSubmit = async (e) => {
    e.preventDefault();
    const rawPrice = parseFloat(selectedPackage?.price?.replace(/[^0-9.]/g, '') || 0);
    const totalCalc = rawPrice * (packageUserInfo.numPeople || 1);

    const bodyData = {
      bookingType: "Experience Booking",
      title: selectedPackage?.title || "N/A",
      country: selectedPackage?.country || "N/A",
      name: packageUserInfo.name,
      email: packageUserInfo.email,
      phone: packageUserInfo.phone,
      numPeople: packageUserInfo.numPeople,
      totalPrice: `$${totalCalc.toLocaleString()}`
    };

    await sendTripNotification(bodyData);
    setPackageSuccessMsg(true);

    setTimeout(() => {
      setSelectedPackage(null);
      setShowPackageBooking(false);
      setPackageSuccessMsg(false);
      setPackageUserInfo({ name: '', email: '', phone: '', numPeople: 1 });
    }, 3000);
  };



  // wizard
  // 💡 Pass calculatedTotal & basePricePerPerson on submit
  const handleWizardSubmit = async (e, totalAmount, basePrice) => {
    e.preventDefault();

    // Backend '/api/send-reservation' route key matching schema
    const bodyData = {
      bookingType: "Custom Trip Builder",
      title: `Custom Trail: ${selectedCountry} (${selectedPlace})`,
      country: selectedCountry,
      place: selectedPlace,
      startDate: tripDate,
      preferredTime: tripTime,
      numPeople: numPeople,
      pricePerPerson: `$${basePrice.toLocaleString()}`,
      totalPrice: `$${totalAmount.toLocaleString()} USD`,
      name: wizardUserInfo.name,
      email: wizardUserInfo.email,
      phone: wizardUserInfo.phone
    };

    try {
      const res = await fetch('https://travel-backend-blue.vercel.app/api/send-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (res.ok) {
        setBuilderStep(4);

        // Auto Reset Form & Close Modal after 3 seconds
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
      }
    } catch (err) {
      console.error("Booking submission error:", err);
    }
  };



  // 3️⃣ Nova Club Ticket Booking Submit Handler
  const handleTicketCheckoutSubmit = async (e) => {
    e.preventDefault();
    const rawPrice = parseFloat(selectedTicketTrip?.price?.replace(/[^0-9.]/g, '') || 0);
    const totalCalc = rawPrice * (ticketUserInfo.numPeople || 1);

    const bodyData = {
      bookingType: "Nova Club Ticket Pass",
      title: selectedTicketTrip?.title || "N/A",
      startDate: selectedTicketTrip?.date || "N/A",
      menuInfo: selectedTicketTrip?.menuInfo || "N/A",
      name: ticketUserInfo.name,
      email: ticketUserInfo.email,
      phone: ticketUserInfo.phone,
      numPeople: ticketUserInfo.numPeople,
      totalPrice: `$${totalCalc.toLocaleString()}`
    };

    await sendTripNotification(bodyData);
    setTicketSuccess(true);

    setTimeout(() => {
      setSelectedTicketTrip(null);
      setTicketSuccess(false);
      setTicketUserInfo({ name: '', email: '', phone: '', numPeople: 1 });
    }, 3000);
  };

  // Newsletter Form Handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsNewsletterLoading(true);
    try {
      const res = await fetch('https://travel-backend-blue.vercel.app/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setNewsletterSuccess(false), 5000);
      } else {
        alert(data.message || 'Error occurred');
      }
    } catch (err) {
      console.error('Newsletter Error:', err);
      alert('Server error, please try again.');
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  // Contact Form Handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) return;

    setIsContactLoading(true);
    try {
      const res = await fetch('https://travel-backend-blue.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      const data = await res.json();
      if (data.success) {
        setContactSuccess(true);
        setContactData({ name: '', phone: '' });
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        alert(data.message || 'Error occurred');
      }
    } catch (err) {
      console.error('Contact Error:', err);
      alert('Server error, please try again.');
    } finally {
      setIsContactLoading(false);
    }
  };


  // Search Bar Submit Handler
  const handleHeroSearch = async (e) => {
    e.preventDefault();

    // Validate user inputs before sending email
    if (!heroUserInfo.name || !heroUserInfo.email) {
      // Direct notification bhejne ke bajaye user ko booking modal dikhayen
      setShowBookingModal(true);
      return;
    }

    const bodyData = {
      bookingType: "Hero Search Bar Inquiry",
      title: `Search Query: ${searchDestination}`,
      name: heroUserInfo.name,
      email: heroUserInfo.email,
      phone: heroUserInfo.phone || "N/A",
      numPeople: searchGuests || 1,
      totalPrice: "N/A"
    };

    await sendTripNotification(bodyData);
  };


  // Har Country aur Hub/City ka apna rate
  const countryPricing = {
    "Japan": {
      "Tokyo Hub": 1800,
      "Kyoto Trail": 1500,
      "Osaka Central": 1300
    },
    "Pakistan": {
      "Skardu Valley": 800,
      "Hunza Trail": 750,
      "Fairy Meadows": 900
    },
    "Switzerland": {
      "Interlaken Alps": 2500,
      "Zurich Express": 2200,
      "Zermatt Peak": 2800
    }
  };

  return (
    <div className="home-wrapper">
      {/* --- HERO SECTION --- */}
      <div className="hero-container position-relative overflow-hidden">

        {/* Background Video instead of Images */}
        <div className="slider-background position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="slider-video w-100 h-100 object-fit-cover"
          >
            <source src="/video3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>

        <div className="image-overlay position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0, 0, 0, 0.4)' }}></div>

        {/* Hero Content */}



        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar px-3 px-md-5 py-3">
          <div className="container-fluid px-0 d-flex justify-content-between align-items-center">

            {/* 1. Brand Logo */}
            <Link className="navbar-brand fw-bold logo-text m-0" to="/">NOVA TRAILS</Link>

            {/* 2. Navigation Links Collapse Menu */}
            <div className={`collapse navbar-collapse justify-content-center ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav gap-3 gap-lg-4 text-center py-2 py-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => { setIsTripBuilderOpen(true); setBuilderStep(1); setIsMobileMenuOpen(false); }}>Book with us</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => { setIsDashboardOpen(true); setIsMobileMenuOpen(false); }}>Nova Club</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/packages" onClick={() => setIsMobileMenuOpen(false)}>Luxury Package</Link>
                </li>
                <li className="nav-item d-lg-none">
                  <span
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact Us
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Right Side Group: Toggler & User Icon together */}
            <div className="d-flex align-items-center gap-3">
              {/* Mobile Toggler Button (Sath mein rakha hai) */}
              <button
                className="navbar-toggler border-0 shadow-none text-white p-0 d-lg-none"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* User Profile Icon */}
              <button className="btn btn-transparent text-white border-0 p-0 fs-5" onClick={() => setIsDashboardOpen(true)}>
                <FiUser />
              </button>

              {/* Call Us Button */}
              <a
                href="#contact-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline-light rounded-pill px-3 px-md-4 call-btn text-lowercase d-none d-sm-inline-block"
              >
                call us
              </a>
            </div>

          </div>
        </nav>




        {/* Hero Content */}
        {/* Hero Content */}
        <div className="container hero-content text-center text-white d-flex flex-column justify-content-center align-items-center position-relative z-1">

          <motion.p
            initial={{ opacity: 0, letterSpacing: '2px' }}
            whileInView={{ opacity: 1, letterSpacing: '4px' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="hero-subtitle text-uppercase"
          >
            The World's Most
          </motion.p>

          {/* 3-Line Heading with Left/Right Animations on Scroll & Refresh */}
          <h1 className="hero-title text-uppercase fw-bold">

            {/* Line 1: Escape To (from Left) */}
            <motion.span
              className="d-block"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Escape To
            </motion.span>

            {/* Line 2: Extraordinary (from Right) */}
            <motion.span
              className="d-block extraordinary-text"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Extraordinary
            </motion.span>

            {/* Line 3: Places (from Left) */}
            <motion.span
              className="d-block"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              Places
            </motion.span>

          </h1>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="search-card-container position-relative mt-4"
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
                  <button
                    className="search-submit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTripBuilderOpen(true);
                      setBuilderStep(1);
                      sendTripNotification({
                        title: 'Hero Search Bar Inquiry',
                        travelType: 'Adventure Travel',
                        date: '15 July 2026',
                        travellers: '2 Person',
                        source: 'Hero Search Bar'
                      });
                    }}
                  >
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
                  onClick={() => {
                    setSelectedPackage(exp);
                    sendTripNotification({
                      title: exp.title,
                      country: exp.country,
                      price: exp.price,
                      source: 'Experience Card Clicked'
                    });
                  }}
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

              <button
                className="btn btn-outline-dark rounded-pill view-all-btn px-4 py-2"
                onClick={() => navigate('/packages')}
              >
                View all
              </button>
            </div>

            <div className="col-12 col-lg-9">
              <div className="mosaic-grid-wrapper">

                {/* COLUMN 1 */}
                <div className="mosaic-column mosaic-col-first">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=600&auto=format&fit=crop')`, cursor: 'pointer' }}
                    onClick={() => navigate('/packages', { state: { packageId: 1 } })}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">New Destination for 2026</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>47 Places</span></div></div>
                    </div>
                  </motion.div>
                </div>

                {/* COLUMN 2 */}
                <div className="mosaic-column">
                  {/* Best Winter Destination */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop')`, cursor: 'pointer' }}
                    onClick={() => navigate('/packages', { state: { packageId: 2 } })}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">Best Winter Destination</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>36 Places</span></div></div>
                    </div>
                  </motion.div>

                  {/* Experiences Away from Crowd */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-short shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop')`, cursor: 'pointer' }}
                    onClick={() => navigate('/packages', { state: { packageId: 3 } })}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal fs-5 m-0 px-2 text-white">Experiences Away from Crowd</h4>
                    </div>
                  </motion.div>
                </div>

                {/* COLUMN 3 */}
                <div className="mosaic-column">
                  {/* World Most Extraordinary places */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-tall shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop')`, cursor: 'pointer' }}
                    onClick={() => navigate('/packages', { state: { packageId: 4 } })}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal text-white">World Most Extraordinary places</h4>
                      <div className="diamond-badge-wrapper"><div className="diamond-badge"><span>29 Places</span></div></div>
                    </div>
                  </motion.div>

                  {/* Your Health is matter */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mosaic-card card-short shadow-sm"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop')`, cursor: 'pointer' }}
                    onClick={() => navigate('/packages', { state: { packageId: 5 } })}
                  >
                    <div className="mosaic-overlay"></div>
                    <div className="mosaic-content">
                      <h4 className="fw-normal fs-5 m-0 px-2 text-white">Your Health is matter</h4>
                    </div>
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
              <div
                key={idx}
                className="col-12 col-md-6"
                onClick={() => navigate(`/service/${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
                style={{ cursor: 'pointer' }}
              >
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

          {newsletterSuccess ? (
            <div className="alert alert-success rounded-pill px-4 py-2 bg-success text-white border-0 shadow">
              ✓ Thank you for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="newsletter-input-pill d-flex align-items-center w-100 max-w-600 p-1">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="form-control bg-transparent text-white border-0 px-4 shadow-none newsletter-field"
              />
              <button
                type="submit"
                disabled={isNewsletterLoading}
                className="btn btn-light newsletter-subscribe-btn text-uppercase fw-medium px-4 py-2 rounded-pill"
              >
                {isNewsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
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
      {/* --- CONTACT OVERLAY FORM --- */}
      <section id="contact-section" className="contact-section position-relative d-flex align-items-center justify-content-center py-5">
        <div className="contact-bg-layer" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')` }}></div>
        <div className="container position-relative z-3 d-flex justify-content-center py-5">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="contact-glass-card p-4 p-md-5 text-center shadow">
            <h3 className="contact-card-title mb-4">Contact</h3>

            {contactSuccess ? (
              <div className="alert alert-success rounded-pill px-4 py-3 bg-success text-white border-0 shadow">
                ✓ Request received! We will call you back shortly.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="d-flex flex-column gap-3 align-items-center w-100">
                <div className="w-100 max-w-400">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="form-control contact-input text-center rounded-pill px-4 py-2"
                  />
                </div>
                <div className="w-100 max-w-400 mb-2">
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="form-control contact-input text-center rounded-pill px-4 py-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isContactLoading}
                  className="btn btn-dark w-100 max-w-400 rounded-pill call-back-btn text-uppercase fw-medium py-2 mt-2"
                >
                  {isContactLoading ? 'Sending...' : 'Call Me Back'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>







      {/* ==========================================================================
          --- INTERACTIVE OVERLAYS / DRAWERS ---
          ========================================================================== */}

      {/* 1. INTERACTIVE PACKAGES DEEP DIVE MODAL */}
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
        {isTripBuilderOpen && (() => {
          // 💡 Dynamic Price Lookup based on Country & Selected Place
          const currentCountryPlaces = countryPricing[selectedCountry] || {};
          const basePricePerPerson = currentCountryPlaces[selectedPlace] || 1000; // Fallback price agar select na ho
          const calculatedTotal = numPeople * basePricePerPerson;

          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(10, 12, 15, 0.85)', backdropFilter: 'blur(16px)', zIndex: 10000 }}>
              <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-4 p-4 p-md-5 text-dark position-relative shadow-2xl w-100 mx-3" style={{ maxWidth: '640px' }}>
                <button className="position-absolute top-0 end-0 m-4 btn btn-light rounded-circle p-2" onClick={() => setIsTripBuilderOpen(false)}><FiX size={20} /></button>

                <div className="mb-4 d-flex align-items-center gap-2 text-muted uppercase tracking-widest fs-7">
                  <span>Step {builderStep} of 3</span>
                  {builderStep < 4 && <div className="progress flex-grow-1 ms-2" style={{ height: '4px' }}><div className="progress-bar bg-dark" style={{ width: `${(builderStep / 3) * 100}%` }}></div></div>}
                </div>

                {/* STEP 1: Country & Region Selection */}
                {builderStep === 1 && (
                  <div>
                    <h3 className="fw-bold mb-3">Where should we craft your trail?</h3>
                    <div className="mb-3">
                      <label className="form-label text-muted fs-7 fw-medium text-uppercase">Select Target Country</label>
                      <select className="form-select py-2" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedPlace(""); }}>
                        <option value="">-- Choose Country --</option>
                        {Object.keys(countryPricing).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {selectedCountry && (
                      <div className="mb-4">
                        <label className="form-label text-muted fs-7 fw-medium text-uppercase">Select Curated Hub</label>
                        <select className="form-select py-2" value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
                          <option value="">-- Choose Region --</option>
                          {Object.keys(currentCountryPlaces).map(place => (
                            <option key={place} value={place}>
                              {place} (${currentCountryPlaces[place]} / person)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button className="btn btn-dark w-100 py-2 rounded-pill mt-3" disabled={!selectedPlace} onClick={() => setBuilderStep(2)}>
                      Continue <FiChevronRight />
                    </button>
                  </div>
                )}

                {/* STEP 2: Temporal Logistics & Dynamic Persons Calculation */}
                {builderStep === 2 && (
                  <div>
                    <h3 className="fw-bold mb-3">Temporal Logistics</h3>
                    <div className="row g-3 mb-3">
                      <div className="col-12"><label className="form-label text-muted fs-7">Departure Target Date</label><input type="date" min={todayDateStr} className="form-control" value={tripDate} onChange={e => setTripDate(e.target.value)} /></div>
                      <div className="col-6"><label className="form-label text-muted fs-7">Preferred Slot</label><input type="time" className="form-control" value={tripTime} onChange={e => setTripTime(e.target.value)} /></div>
                      <div className="col-6"><label className="form-label text-muted fs-7">Total Enlisted Guests</label><input type="number" min="1" max="50" className="form-control" value={numPeople} onChange={e => setNumPeople(parseInt(e.target.value) || 1)} /></div>
                    </div>

                    {/* 💰 DYNAMIC PRICE BREAKDOWN */}
                    <div className="bg-light rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center border">
                      <div>
                        <span className="fw-bold text-dark d-block">{selectedPlace}, {selectedCountry}</span>
                        <small className="text-muted fs-8">${basePricePerPerson.toLocaleString()} x {numPeople} guest(s)</small>
                      </div>
                      <div className="fw-bold fs-4 text-success">
                        ${calculatedTotal.toLocaleString()} USD
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-light flex-grow-1 rounded-pill" onClick={() => setBuilderStep(1)}>Back</button>
                      <button className="btn btn-dark flex-grow-1 rounded-pill" disabled={!tripDate} onClick={() => setBuilderStep(3)}>Next Sequence</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Confirm Booking */}
                {builderStep === 3 && (
                  <form onSubmit={(e) => handleWizardSubmit(e, calculatedTotal, basePricePerPerson)}>
                    {/* Form fields */}
                    <button type="submit" className="btn btn-dark w-100">Confirm Booking</button>


                    {/* 📋 FINAL SUMMARY BOX */}
                    <div className="bg-light rounded-3 p-3 mb-4 border">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold text-dark">{selectedCountry} &bull; {selectedPlace}</span>
                        <span className="fw-bold text-success fs-5">${calculatedTotal.toLocaleString()} USD</span>
                      </div>
                      <div className="text-muted fs-7">
                        📅 {tripDate} {tripTime && `| ⏰ ${tripTime}`} | 👥 {numPeople} Person(s) (${basePricePerPerson}/person)
                      </div>
                    </div>

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

                {/* STEP 4: Success Message */}
                {builderStep === 4 && (
                  <div className="text-center py-4">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}><FiCheck size={32} /></div>
                    <h3 className="fw-bold text-uppercase">We will contact you soon</h3>
                    <p className="text-muted">Our travel curation executives are verifying your details.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
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
                    <span
                      className="nav-link"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsDashboardOpen(true);
                        sendTripNotification({
                          title: 'Nova Club Member Interest',
                          source: 'Nova Club Navbar Link'
                        });
                      }}
                    >
                      Nova Club
                    </span>
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

                  {/* --- FORM SECTION --- */}
                  <form onSubmit={handleTicketCheckoutSubmit}>
                    <label className="form-label text-muted fs-8 tracking-wider text-uppercase fw-bold mb-2.5">
                      Enter Your Info To Book Ticket
                    </label>

                    <div className="d-flex flex-column gap-3 mb-3">
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
                            max="20"
                            placeholder="Guests"
                            required
                            className="form-control py-2 px-3 border border-light-subtle rounded"
                            value={ticketUserInfo.numPeople || 1}
                            onChange={e => setTicketUserInfo({ ...ticketUserInfo, numPeople: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center my-3 border border-light">
                      <span className="text-muted fs-7 text-uppercase tracking-wider fw-medium">Total Amount:</span>
                      <span className="fw-bold text-dark fs-5">
                        ${(parseFloat(selectedTicketTrip.price.replace(/[^0-9.]/g, '')) * (ticketUserInfo.numPeople || 1)).toLocaleString()}
                      </span>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 rounded-pill py-2.5 text-uppercase fw-medium tracking-wider">
                      Confirm Ticket Booking
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <FiCheck size={32} />
                  </div>
                  <h4 className="fw-bold text-uppercase">Ticket Confirmed!</h4>
                  <p className="text-muted">We will contact you soon with your booking confirmation.</p>
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