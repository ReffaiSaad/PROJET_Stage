import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Avertissement Important</h3>
            <p className="text-sm text-blue-200">
              Les informations fournies par SmartMedAssist ne remplacent pas une consultation médicale réelle. 
              En cas d'urgence, contactez immédiatement un professionnel de santé ou les services d'urgence.
            </p>
          </div>
          
          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-700 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} SmartMedAssist. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;