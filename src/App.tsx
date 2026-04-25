import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Index from "./pages/Index";

const GavrioPortPickupGuide = lazy(() => import("./pages/GavrioPortPickupGuide"));
const ChoosingTheRightCar = lazy(() => import("./pages/ChoosingTheRightCar"));
const DrivingGuide = lazy(() => import("./pages/DrivingGuide"));
const DayTrips = lazy(() => import("./pages/DayTrips"));
const ParkingOnAndros = lazy(() => import("./pages/ParkingOnAndros"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
      <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gavrio-port-pickup-guide" element={<GavrioPortPickupGuide />} />
            <Route path="/choosing-the-right-car" element={<ChoosingTheRightCar />} />
            <Route path="/driving-in-andros" element={<DrivingGuide />} />
            <Route path="/day-trips-from-andros" element={<DayTrips />} />
            <Route path="/parking-on-andros" element={<ParkingOnAndros />} />
            <Route path="/andros-car-rental-faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
