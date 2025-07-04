from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib
import os
import numpy as np
import pandas as pd

# Initialisation de l'application FastAPI
app = FastAPI(title="Symptom Analysis API")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines (à restreindre en production)
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes HTTP
    allow_headers=["*"],  # Autorise tous les en-têtes
)

# Chargement des modèles
models_dir = os.path.abspath('../models')
try:
    logreg = joblib.load(os.path.join(models_dir, 'logreg_model.joblib'))
    rf = joblib.load(os.path.join(models_dir, 'rf_model.joblib'))
    le = joblib.load(os.path.join(models_dir, 'label_encoder.joblib'))
    print("Tous les modèles ont été chargés avec succès.")
except FileNotFoundError as e:
    print(f"Erreur : {e}")
    raise RuntimeError("Un ou plusieurs fichiers de modèle sont introuvables. Vérifiez le répertoire 'models/'.")
except Exception as e:
    print(f"Erreur inattendue lors du chargement des modèles : {e}")
    raise RuntimeError("Une erreur inattendue s'est produite lors du chargement des modèles.")

# Schéma pour la requête
class SymptomsRequest(BaseModel):
    symptoms: List[int]

# Schéma pour la réponse
class DiseasePrediction(BaseModel):
    disease: str
    probability: float

@app.post("/predict", response_model=List[DiseasePrediction])
def predict(req: SymptomsRequest):
    """
    Prend une liste d'IDs de symptômes et retourne une liste de maladies avec leurs probabilités.
    """
    # Créer un vecteur de longueur fixe (18) avec des valeurs par défaut de 0
    X = [0] * 18
    for symptom_id in req.symptoms:
        if 1 <= symptom_id <= 18:  # Vérifiez que l'ID du symptôme est valide
            X[symptom_id - 1] = 1  # Marquer les symptômes présents

    # Convertir en DataFrame Pandas avec les noms de colonnes
    feature_names = [f"symptom_{i+1}" for i in range(18)]  # Noms des colonnes utilisés lors de l'entraînement
    X_df = pd.DataFrame([X], columns=feature_names)

    try:
        # Prédictions des probabilités avec les deux modèles
        p1 = logreg.predict_proba(X_df)[0]
        p2 = rf.predict_proba(X_df)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la prédiction : {str(e)}")

    # Moyenne des probabilités des deux modèles
    avg = (p1 + p2) / 2

    # Conversion des probabilités en prédictions
    predictions = [
        DiseasePrediction(
            disease=le.inverse_transform([i])[0],
            probability=round(float(prob * 100), 2)  # Convertir en pourcentage
        )
        for i, prob in enumerate(avg)
    ]

    # Tri des prédictions par probabilité décroissante
    predictions = sorted(predictions, key=lambda x: x.probability, reverse=True)

    return predictions