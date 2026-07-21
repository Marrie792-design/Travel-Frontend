import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import LuxuryPackages from './pages/LuxuryPackages.jsx';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About.jsx'; // 1. Import About component

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<LuxuryPackages />} />
        <Route path="/about" element={<About />} /> {/* 2. Add /about Route */}
        <Route path="/service/:serviceName" element={<ServiceDetail />} />
      </Routes>
      
      {/* <Footer /> */}
    </Router>
  );
}

export default App;