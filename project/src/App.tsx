import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGuard from './components/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SymptomsPage from './pages/SymptomsPage';
import ChatbotPage from './pages/ChatbotPage';
import HistoryPage from './pages/HistoryPage';
import FAQPage from './pages/FAQPage';
import ChatWidget from './components/ChatWidget';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Routes protégées */}
        <Route path="/symptomes" element={<AuthGuard><SymptomsPage /></AuthGuard>} />
        <Route path="/chatbot" element={<AuthGuard><ChatbotPage /></AuthGuard>} />
        <Route path="/historique" element={<AuthGuard><HistoryPage /></AuthGuard>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === '/chatbot';

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white ${isChatbotPage ? 'h-screen' : ''}`}>
      {/* Navbar toujours visible */}
      <Navbar />

      {/* Contenu principal */}
      <main className={`flex-grow ${isChatbotPage ? 'h-full' : ''}`}>
        <AnimatedRoutes />
      </main>

      {/* Footer caché sur la page chatbot */}
      {!isChatbotPage && <Footer />}

      {/* Chatbot flottant visible partout */}
      <ChatWidget />

      {/* Notifications Toast */}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
