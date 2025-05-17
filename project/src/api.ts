// src/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // ou ton vrai backend

export const sendHistory = async (userId: string, operation: string) => {
  await axios.post(`${API_URL}/historique/`, {
    user_id: userId,
    operation: operation,
  });
};
