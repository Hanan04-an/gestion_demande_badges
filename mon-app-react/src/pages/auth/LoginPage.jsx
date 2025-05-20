import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import '../../styles/auth.css';
import logo from '../../imgs/logoRAM.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("Tentative de login avec :", { email, password }); // Debug

      const response = await authService.login({ email, password });
      console.log("Réponse login:", response.data); // Debug

      // authService.login gère déjà le localStorage

      // Redirection basée sur le rôle
      const role = response.data.role;
      if (role === 'EMPLOYEE') {
        navigate('/employee/profile');
      } else if (role === 'ADMIN') {
        navigate('/admin/profile');
      } else if (role === 'SUPERADMIN') {
        navigate('/superadmin/profile');
      } else {
        // En cas de rôle inconnu, rester sur la page de login
        console.warn("Rôle inconnu:", role);
        setError('Rôle utilisateur non reconnu');
      }
    } catch (err) {
      console.error("Erreur complète :", err);
      console.error("Réponse backend :", err.response?.data);
      
      // Message d'erreur plus détaillé
      let errorMessage = 'Échec de la connexion';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Email ou mot de passe incorrect';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header-nav">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">Société</a></li>
            <li><a href="/news">Actualités</a></li>
            <li><a href="/references">Références</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="login-form-container">
        <div className="login-form">
          <h2 className="login-title">LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Valider'}
              </button>
            </div>
          </form>

          <div className="signup-link">
            <p>Si vous n'avez pas de compte, <a href="/signup">sign up</a></p>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          {/* Bouton de debug - À supprimer en production */}
          {process.env.NODE_ENV === 'development' && (
            <button 
              onClick={() => {
                console.log("LocalStorage:", {
                  token: localStorage.getItem('token'),
                  user: JSON.parse(localStorage.getItem('user')),
                  role: localStorage.getItem('role'),
                  nom: localStorage.getItem('nom')
                });
              }}
              style={{marginTop: '20px', padding: '5px', fontSize: '12px'}}
            >
              Debug localStorage
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;