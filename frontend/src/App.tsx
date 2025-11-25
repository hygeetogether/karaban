import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CaravanListPage from './pages/CaravanListPage';
import CaravanDetailPage from './pages/CaravanDetailPage';
import ReservationListPage from './pages/ReservationListPage';
import PaymentPage from './pages/PaymentPage'; // Added import for PaymentPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/caravans" element={<CaravanListPage />} />
        <Route path="/caravans/:id" element={<CaravanDetailPage />} />
        <Route path="/trips" element={<ReservationListPage />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* Added route for PaymentPage */}
      </Routes>
    </Router>
  );
}

export default App;
