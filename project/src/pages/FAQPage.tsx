import React, { useState } from 'react';
import { Search, BookOpen, Plus, Minus } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const faqData: FAQ[] = [
    {
      id: 1,
      question: "Comment fonctionne le système d'analyse de symptômes?",
      answer: "Notre système utilise des algorithmes d'intelligence artificielle pour analyser les symptômes que vous saisissez. Il les compare à une vaste base de données médicales pour identifier les causes possibles. Les résultats sont présentés avec des probabilités et des recommandations, mais ne remplacent pas un diagnostic médical professionnel.",
      category: "general"
    },
    {
      id: 2,
      question: "Les informations fournies sont-elles fiables?",
      answer: "Notre système est basé sur des données médicales validées et régulièrement mises à jour. Cependant, il est important de noter que les informations fournies sont uniquement à titre indicatif et ne remplacent pas l'avis d'un professionnel de santé qualifié. Consultez toujours un médecin pour un diagnostic et un traitement appropriés.",
      category: "general"
    },
    {
      id: 3,
      question: "Comment interpréter les résultats de l'analyse de symptômes?",
      answer: "Les résultats présentent des conditions potentielles avec leur probabilité et leur gravité. Une probabilité élevée indique une correspondance forte avec vos symptômes, mais pas nécessairement un diagnostic correct. La gravité (faible, modérée, élevée) indique l'urgence de consulter un médecin. Utilisez ces informations comme point de départ pour discuter avec votre médecin.",
      category: "symptoms"
    },
    {
      id: 4,
      question: "Mes données médicales sont-elles sécurisées?",
      answer: "Oui, la confidentialité et la sécurité de vos données sont notre priorité. Toutes les informations que vous fournissez sont cryptées et stockées en toute sécurité. Nous respectons strictement le RGPD et autres réglementations sur la protection des données. Vos informations ne sont jamais partagées avec des tiers sans votre consentement explicite.",
      category: "privacy"
    },
    {
      id: 5,
      question: "Comment fonctionne l'analyse d'images médicales?",
      answer: "Notre système d'analyse d'images utilise des algorithmes de vision par ordinateur et d'apprentissage profond pour examiner les images téléchargées. Il peut détecter des anomalies dans les images de lésions cutanées, radiographies et autres types d'imagerie médicale. Le système compare l'image à des milliers d'exemples annotés par des professionnels pour fournir une analyse préliminaire.",
      category: "images"
    },
    {
      id: 6,
      question: "Puis-je télécharger mes rapports de consultation?",
      answer: "Oui, tous vos rapports de consultation sont disponibles dans la section 'Historique'. Vous pouvez télécharger chaque rapport au format PDF en cliquant sur le bouton 'PDF' à côté de la consultation correspondante. Ces rapports contiennent un résumé de vos symptômes, l'analyse effectuée et les recommandations fournies.",
      category: "general"
    },
    {
      id: 7,
      question: "Le chatbot médical est-il géré par de vrais médecins?",
      answer: "Non, notre chatbot médical est un système automatisé basé sur l'intelligence artificielle. Il utilise le traitement du langage naturel pour comprendre vos questions et fournir des informations médicales générales. Aucun médecin humain n'interagit directement avec vous via le chatbot. C'est pourquoi nous recommandons toujours de consulter un professionnel de santé qualifié pour un diagnostic et des conseils personnalisés.",
      category: "chatbot"
    },
    {
      id: 8,
      question: "Que faire en cas d'urgence médicale?",
      answer: "En cas d'urgence médicale, n'utilisez PAS SmartMedAssist. Contactez immédiatement les services d'urgence (SAMU: 15, Urgences européennes: 112) ou rendez-vous au service d'urgence le plus proche. SmartMedAssist n'est pas conçu pour les situations d'urgence et ne doit jamais retarder l'obtention de soins médicaux urgents.",
      category: "general"
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'general', name: 'Informations générales' },
    { id: 'symptoms', name: 'Analyse de symptômes' },
    { id: 'chatbot', name: 'Chatbot médical' },
    { id: 'images', name: 'Analyse d\'images' },
    { id: 'privacy', name: 'Confidentialité' }
  ];

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFAQs = faqData.filter(faq => {
    // Filter by category
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      return (
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    
    setIsSearching(true);
    setCustomAnswer(null);
    
    // Simulate API call for knowledge base search
    setTimeout(() => {
      // Check if question matches any existing FAQs
      const matchedFAQ = faqData.find(faq => 
        faq.question.toLowerCase().includes(customQuestion.toLowerCase()) ||
        customQuestion.toLowerCase().includes(faq.question.toLowerCase())
      );
      
      if (matchedFAQ) {
        setCustomAnswer(matchedFAQ.answer);
      } else {
        // Generate a generic response
        setCustomAnswer("Je n'ai pas d'information spécifique sur cette question. Je vous recommande de consulter un professionnel de santé pour obtenir des informations précises et personnalisées concernant votre situation.");
      }
      
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Base de connaissances médicales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez des réponses à vos questions médicales ou posez une question personnalisée.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Custom question section */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Posez votre question
            </h2>
            
            <form onSubmit={handleCustomQuestionSubmit} className="space-y-4">
              <div>
                <label htmlFor="custom-question" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre question:
                </label>
                <input
                  type="text"
                  id="custom-question"
                  placeholder="Ex: Quels sont les symptômes de la grippe?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={!customQuestion.trim() || isSearching}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    !customQuestion.trim() || isSearching
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors'
                  }`}
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin inline-block h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Recherche en cours...
                    </>
                  ) : (
                    'Rechercher'
                  )}
                </button>
              </div>
            </form>
            
            {customAnswer && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Réponse:</h3>
                <p className="text-blue-900">{customAnswer}</p>
              </div>
            )}
          </div>
          
          {/* FAQ sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Catégories</h2>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Recherche</h2>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* FAQ content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Questions fréquentes
              </h2>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucune question ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <button className="flex-shrink-0 text-gray-500">
                          {expandedId === faq.id ? (
                            <Minus className="h-5 w-5" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      
                      {expandedId === faq.id && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;