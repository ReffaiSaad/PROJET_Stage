import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface Symptom {
  id: number;
  name: string;
}

interface Consultation {
  id: string;
  user_id: string;
  symptoms: number[];
  predictions: { disease: string; probability: number }[];
  timestamp: string;
}

interface VirtualConsultation {
  id: string;
  user_id: string;
  message: string;
  timestamp: string;
}

const symptomsList: Symptom[] = [
  { id: 1, name: 'Fièvre' }, { id: 2, name: 'Toux' }, { id: 3, name: 'Fatigue' },
  { id: 4, name: 'Maux de tête' }, { id: 5, name: 'Nausées' }, { id: 6, name: 'Vomissements' },
  { id: 7, name: 'Douleurs musculaires' }, { id: 8, name: 'Maux de gorge' }, { id: 9, name: 'Diarrhée' },
  { id: 10, name: 'Difficultés respiratoires' }, { id: 11, name: 'Perte d\'appétit' }, { id: 12, name: 'Douleur abdominale' },
  { id: 13, name: 'Congestion nasale' }, { id: 14, name: 'Éruption cutanée' }, { id: 15, name: 'Frissons' },
  { id: 16, name: 'Vertiges' }, { id: 17, name: 'Vision floue' }, { id: 18, name: 'Douleur thoracique' },
];

function getSymptomNames(ids: number[]): string[] {
  return symptomsList.filter(s => ids.includes(s.id)).map(s => s.name);
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

const HistoryPage: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [virtualConsultations, setVirtualConsultations] = useState<VirtualConsultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'symptom' | 'virtual'>('symptom');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return setIsLoading(false);
      try {
        const q1 = query(collection(db, 'history'), where('user_id', '==', userId));
        const snapshot1 = await getDocs(q1);
        const data1 = snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Consultation[];
        setConsultations(data1);

        const q2 = query(collection(db, 'virtual_consultations'), where('user_id', '==', userId));
        const snapshot2 = await getDocs(q2);
        const data2 = snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VirtualConsultation[];
        setVirtualConsultations(data2);
      } catch (err) {
        console.error('Erreur de chargement :', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  const filteredConsultations = consultations.filter((c) =>
    c.predictions.some((p) =>
      p.disease.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredVirtuals = virtualConsultations.filter((v) =>
    v.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">🗂️ Historique</h1>
          <p className="text-gray-600">Consultez vos analyses de symptômes ou vos consultations virtuelles.</p>
        </div>

        {/* Onglets */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setSelectedTab('symptom')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTab === 'symptom' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Analyse de symptômes
          </button>
          <button
            onClick={() => setSelectedTab('virtual')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTab === 'virtual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Consultation virtuelle
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={selectedTab === 'symptom' ? "Rechercher une maladie..." : "Rechercher un message..."}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : selectedTab === 'symptom' ? (
              filteredConsultations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Aucune analyse trouvée.</div>
              ) : (
                <div className="space-y-4">
                  {filteredConsultations.map((consultation) => (
                    <motion.div
                      key={consultation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        Consultation du {formatDate(consultation.timestamp)}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium mt-2">Symptômes :</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {getSymptomNames(consultation.symptoms).map((symptom, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {symptom}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 font-medium mt-2">Résultats :</p>
                      <ul className="mt-1 space-y-1">
                        {consultation.predictions.map((pred, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            🧪 {pred.disease} — <span className="font-semibold">{pred.probability.toFixed(1)}%</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              filteredVirtuals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Aucune consultation virtuelle trouvée.</div>
              ) : (
                <div className="space-y-4">
                  {filteredVirtuals.map((v) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        Discussion du {formatDate(v.timestamp)}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">Message : {v.message || '...'}</p>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
