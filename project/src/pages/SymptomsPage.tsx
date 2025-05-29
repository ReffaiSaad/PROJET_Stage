import React, { useState, useEffect } from 'react';
import { Activity, Check, AlertCircle } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../../firebase'; // Importez la configuration Firebase

interface Symptom {
  id: number;
  name: string;
  category: string;
}

interface Result {
  disease: string;
  probability: number;
  description?: string;
  recommendations?: string[];
  severity?: 'low' | 'medium' | 'high';
}

const SymptomsPage: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [results, setResults] = useState<Result[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Stocker l'ID de l'utilisateur connecté

  const symptoms: Symptom[] = [
    { id: 1, name: 'Fièvre', category: 'Général' },
    { id: 2, name: 'Toux', category: 'Respiratoire' },
    { id: 3, name: 'Fatigue', category: 'Général' },
    { id: 4, name: 'Maux de tête', category: 'Neurologique' },
    { id: 5, name: 'Nausées', category: 'Digestif' },
    { id: 6, name: 'Vomissements', category: 'Digestif' },
    { id: 7, name: 'Douleurs musculaires', category: 'Musculaire' },
    { id: 8, name: 'Maux de gorge', category: 'Respiratoire' },
    { id: 9, name: 'Diarrhée', category: 'Digestif' },
    { id: 10, name: 'Difficultés respiratoires', category: 'Respiratoire' },
    { id: 11, name: 'Perte d\'appétit', category: 'Digestif' },
    { id: 12, name: 'Douleur abdominale', category: 'Digestif' },
    { id: 13, name: 'Congestion nasale', category: 'Respiratoire' },
    { id: 14, name: 'Éruption cutanée', category: 'Dermatologique' },
    { id: 15, name: 'Frissons', category: 'Général' },
    { id: 16, name: 'Vertiges', category: 'Neurologique' },
    { id: 17, name: 'Vision floue', category: 'Neurologique' },
    { id: 18, name: 'Douleur thoracique', category: 'Cardiovasculaire' },
  ];

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    console.log("Initialisation de l'écouteur Firebase Auth...");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.uid);
        setUserId(user.uid); // Récupérer l'ID de l'utilisateur connecté
      } else {
        console.log("Aucun utilisateur connecté.");
        setUserId(null); // Aucun utilisateur connecté
      }
    });

    return () => {
      console.log("Nettoyage de l'écouteur Firebase Auth...");
      unsubscribe();
    };
  }, []);

  const toggleSymptom = (id: number) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id)
        ? prev.filter((symptomId) => symptomId !== id)
        : [...prev, id]
    );

    // Réinitialiser les résultats si les symptômes changent
    if (results) {
      setResults(null);
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      alert('Veuillez sélectionner au moins un symptôme.');
      return;
    }

    if (!userId) {
      alert('Vous devez être connecté pour effectuer une analyse.');
      return;
    }

    setIsLoading(true);
    console.log("Début de l'analyse des symptômes...");
    console.log("Symptômes sélectionnés :", selectedSymptoms);
    console.log("Utilisateur connecté :", userId);

    try {
      const response = await fetch('http://127.0.0.1:8500/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms, // Liste des IDs des symptômes
          user_id: userId, // Utiliser l'ID de l'utilisateur connecté
        }),
      });

      console.log("Réponse de l'API reçue :", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur retournée par l'API :", errorData);
        throw new Error(errorData.detail || 'Erreur inconnue');
      }

      const data: Result[] = await response.json();
      console.log("Données retournées par l'API :", data);
      setResults(data);

      // Enregistrer les résultats dans Firestore
      console.log("Enregistrement des résultats dans Firestore...");
      const historyRef = collection(db, "history");
      await addDoc(historyRef, {
        user_id: userId,
        symptoms: selectedSymptoms,
        predictions: data,
        timestamp: new Date().toISOString(),
      });
      console.log("Résultats enregistrés avec succès dans Firestore.");
    } catch (error: any) {
      console.error("Erreur lors de l'analyse des symptômes :", error);
      alert(`Une erreur est survenue lors de l'analyse : ${error.message}`);
    } finally {
      setIsLoading(false);
      console.log("Fin de l'analyse des symptômes.");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analyse de symptômes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sélectionnez les symptômes que vous ressentez pour obtenir une analyse préliminaire et des recommandations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sélection des symptômes */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-700">
              <Activity className="mr-2 h-5 w-5" />
              Sélectionnez vos symptômes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 flex-shrink-0 mr-2 rounded-full border ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedSymptoms.includes(symptom.id) && (
                        <Check className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <span>{symptom.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0 || isLoading}
                className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                  selectedSymptoms.length === 0 || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyse en cours...
                  </>
                ) : (
                  <>Analyser mes symptômes</>
                )}
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="lg:w-1/3 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-blue-700">Résultats de l'analyse</h2>
            {results ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getSeverityColor(result.severity || 'low')}`}
                  >
                    <h3 className="font-semibold">{result.disease}</h3>
                    <p className="text-sm text-gray-600">
                      Probabilité : {result.probability}%
                    </p>
                    {result.description && (
                      <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun résultat disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsPage;