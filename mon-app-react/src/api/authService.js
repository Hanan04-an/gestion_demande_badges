import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// MODIFICATION IMPORTANTE: Désactiver complètement withCredentials
axios.defaults.withCredentials = false;

// Configuration de l'intercepteur Axios pour les requêtes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response && error.response.status === 401) {
      authService.logout();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);
 
export const authService = {
  // Login avec solution temporaire CORS
  login: async (credentials) => {
    try {
      console.log(`Tentative de connexion à ${API_URL}/auth/login avec:`, credentials);
      
      // IMPORTANT: Spécifier explicitement withCredentials: false pour cette requête
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: false  // Cette option est la clé pour contourner l'erreur CORS
      });
      
      console.log('Réponse login réussie:', response.data);
      
      if (response.data.token) {
        // Stocker le token et informations de base
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('nom', response.data.nom);
        
        // Stocker l'objet utilisateur complet
        const userData = {
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          role: response.data.role,
          departement: response.data.departement || null
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Configurer Axios pour inclure le token dans les futures requêtes
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response;
    } catch (error) {
      console.error('Erreur de login:', error);
      
      // Si c'est toujours un problème CORS, essayons fetch comme dernier recours
      if (error.message && (error.message.includes('CORS') || error.message.includes('credentials'))) {
        console.log("Tentative alternative avec fetch API...");
        try {
          const fetchResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(credentials),
            mode: 'cors',
            credentials: 'omit'  // Important: 'omit' pour contourner les problèmes CORS
          });
          
          if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
          }
          
          const data = await fetchResponse.json();
          console.log('Réponse fetch réussie:', data);
          
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('nom', data.nom);
            
            const userData = {
              id: data.id,
              nom: data.nom,
              prenom: data.prenom,
              email: data.email,
              role: data.role,
              departement: data.departement || null
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          }
          
          return { data };
        } catch (fetchError) {
          console.error('Erreur fetch:', fetchError);
          throw fetchError;
        }
      }
      
      throw error;
    }
  },
  
  // Autres méthodes inchangées
  signup: async (userData) => {
    try {
      return await axios.post(`${API_URL}/auth/signup`, userData, { withCredentials: false });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

   deleteUtilisateur: async (userId) => {
  try {
    return await axios.delete(`/api/utilisateurs/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\’utilisateur:', error);
    throw error;
  }
},


  getDepartments: async () => {
    try {
      return await axios.get(`${API_URL}/departments`, { withCredentials: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des départements:', error);
      throw error;
    }
  },
  
  getPendingRegistrations: async () => {
    try {
      return await axios.get(`${API_URL}/auth/pending-registrations`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: false 
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions en attente:', error);
      throw error;
    }
  },
  
  approveEmployee: async (employeeId) => {
    try {
      return await axios.post(`${API_URL}/auth/approve/${employeeId}`, {}, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: false 
      });
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      throw error;
    }
  },
  
  rejectEmployee: async (employeeId, reason) => {
    try {
      return await axios.post(`${API_URL}/auth/reject/${employeeId}`, { reason }, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: false 
      });
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      throw error;
    }
  },
  
  createPassword: async (token, password) => {
    try {
      return await axios.post(`${API_URL}/auth/create-password/${token}`, 
        { newPassword: password }, 
        { withCredentials: false }
      );
    } catch (error) {
      console.error('Erreur lors de la création du mot de passe:', error);
      throw error;
    }
  },
  
 getUtilisateursVisibles: async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token manquant dans le localStorage.');
    }

    return await axios.get(`${API_URL}/utilisateurs/visible`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs visibles:', error.response?.data || error.message);
    throw error;
  }
},


  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nom');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  },
  
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
  
  getRole: () => {
    return localStorage.getItem('role');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      const role = localStorage.getItem('role');
      const nom = localStorage.getItem('nom');
      
      if (role && nom) {
        return { role, nom };
      }
      return null;
    }
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }
  
};

export default authService;