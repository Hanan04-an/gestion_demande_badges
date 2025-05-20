import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import logo from '../../imgs/logoRAM.png';

const CreatePasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      await authService.createPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du mot de passe');
    }
  };

  const handleCancel = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  if (success) {
    return (
      <div className="password-container">
        <div className="success-message">
          <h4>Mot de passe créé avec succès !</h4>
          <p>Vous allez être redirigé vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="password-container">
      {/* Header Navigation */}
      <div className="header-nav">
        <div className="logo">
         <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Société</a></li>
            <li><a href="#">Actualités</a></li>
            <li><a href="#">Références</a></li>
            <li><a href="#">contact</a></li>
          </ul>
        </nav>
      </div>

      {/* Password Creation Form */}
      <div className="password-form-container">
        <div className="password-form">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Mot de pass:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirme Mot de pass:"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn-submit"
              >
                Valide
              </button>
            </div>
          </form>
          
          <div className="signup-link">
            <p>
              si vous n'avez pas pas un compte, <a href="/signup">sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordPage;