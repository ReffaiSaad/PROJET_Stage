import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Vérifie si l'utilisateur est connecté

  // Fonction pour gérer la navigation protégée
  const handleProtectedNavigation = (path: string) => {
    if (!currentUser) {
      // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/login', { state: { from: path } });
    } else {
      // Redirige vers la page demandée si l'utilisateur est connecté
      navigate(path);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <div className="pt-16 pb-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover"></div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto relative z-10"
          >
            <div className="text-center">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Bienvenue sur SmartMedAssist
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
              >
                Votre assistant intelligent pour un pré-diagnostic médical rapide et fiable.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProtectedNavigation('/chatbot')}
                  className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg flex items-center justify-center transition-all hover:shadow-xl"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Commencer la consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProtectedNavigation('/symptomes')}
                  className="px-8 py-4 bg-teal-500 text-white font-medium rounded-lg shadow-lg flex items-center justify-center transition-all hover:shadow-xl"
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Analyser mes symptômes
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-gray-800"
            >
              Nos services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-xl p-6 transition-all hover:shadow-lg border border-blue-100"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                  <Activity className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Analyse de symptômes</h3>
                <p className="text-gray-600">
                  Renseignez vos symptômes pour obtenir une première évaluation et des conseils personnalisés.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-xl p-6 transition-all hover:shadow-lg border border-blue-100"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                  <MessageSquare className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Consultation virtuelle</h3>
                <p className="text-gray-600">
                  Discutez avec notre assistant intelligent pour obtenir des réponses à vos questions médicales.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
              Prêt à commencer?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl mb-8 text-blue-100">
              Utilisez SmartMedAssist dès maintenant pour mieux comprendre vos symptômes.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProtectedNavigation('/chatbot')}
                className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg transition-all hover:shadow-xl"
              >
                Démarrer une consultation
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default HomePage;