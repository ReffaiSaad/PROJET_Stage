import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Symptômes', path: '/symptomes', protected: true },
    { name: 'Chatbot', path: '/chatbot', protected: true },
    { name: 'Historique', path: '/historique', protected: true },
    { name: 'FAQ', path: '/faq' },
  ];

  const filteredNavLinks = navLinks.filter(
    (link) => !link.protected || (link.protected && currentUser)
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-blue-600">SmartMedAssist</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-700 hover:text-blue-600 font-medium ${
                  location.pathname === link.path ? 'text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            {currentUser ? (
              <button onClick={handleSignOut} className="flex items-center text-red-600">
                <LogOut className="h-5 w-5 mr-1" />
                Déconnexion
              </button>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-blue-600">
                  <LogIn className="h-5 w-5 mr-1" />
                  Connexion
                </Link>
                <Link to="/signup" className="flex items-center text-green-600">
                  <UserPlus className="h-5 w-5 mr-1" />
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
