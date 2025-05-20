import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import logo from '../../imgs/logoRAM.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    position: '',
    email: '',
    departementId: ''
  });

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Chargement des départements au montage du composant
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        console.log('Chargement des départements...');
        setLoading(true);
        
        const response = await authService.getDepartments();
        console.log('Départements reçus:', response.data);
        
        if (response && response.data && Array.isArray(response.data)) {
          // Adapter les départements
          // D'après les logs, les départements ont 'nomDepartement' mais pas 'id'
          // Analyse des propriétés disponibles dans le premier département
          if (response.data.length > 0) {
            const firstDept = response.data[0];
            console.log('Premier département reçu:', firstDept);
            
            // Recherche d'une propriété qui pourrait servir d'ID
            const possibleIdProps = Object.keys(firstDept).filter(key => 
              key.toLowerCase().includes('id') || 
              key.toLowerCase() === 'code' ||
              key.toLowerCase() === 'key'
            );
            
            console.log('Propriétés potentielles pour ID:', possibleIdProps);
            
            if (possibleIdProps.length > 0) {
              // Utiliser la première propriété trouvée comme ID
              const idProp = possibleIdProps[0];
              console.log(`Utilisation de la propriété '${idProp}' comme ID`);
              
              // Adapter tous les départements
              const adaptedDepartments = response.data.map((dept, index) => ({
                ...dept,
                // Créer une propriété 'id' basée sur la propriété trouvée, ou utiliser l'index comme fallback
                id: dept[idProp] || (index + 1).toString()
              }));
              
              console.log('Départements adaptés:', adaptedDepartments);
              setDepartments(adaptedDepartments);
            } else {
              // Aucune propriété d'ID trouvée, utiliser l'index comme ID
              console.log('Aucune propriété d\'ID trouvée, utilisation de l\'index comme ID');
              
              const indexBasedDepartments = response.data.map((dept, index) => ({
                ...dept,
                id: (index + 1).toString()
              }));
              
              console.log('Départements avec ID basé sur l\'index:', indexBasedDepartments);
              setDepartments(indexBasedDepartments);
            }
          } else {
            setError('Aucun département récupéré');
          }
        } else {
          setError('Format de données de départements invalide');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des départements', error);
        setError('Impossible de charger les départements');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      // Clone les données du formulaire
      const dataToSubmit = { ...formData };
      
      // Convertir departementId en nombre
      if (dataToSubmit.departementId) {
        const deptId = parseInt(dataToSubmit.departementId, 10);
        
        if (!isNaN(deptId)) {
          dataToSubmit.departementId = deptId;
        } else {
          setError('ID de département invalide');
          setLoading(false);
          return;
        }
      } else {
        setError('Veuillez sélectionner un département');
        setLoading(false);
        return;
      }
      
      console.log('Données à envoyer:', dataToSubmit);
      
      // Soumettre le formulaire
      const response = await authService.signup(dataToSubmit);
      console.log('Réponse du serveur:', response);
      
      // Rediriger vers la page de confirmation
      navigate('/signup-pending');
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      
      if (err.response) {
        console.error('Détails de l\'erreur:', err.response.data);
        setError(err.response.data.message || `Erreur ${err.response.status}: Échec de l'inscription`);
      } else if (err.request) {
        setError('Aucune réponse du serveur. Vérifiez votre connexion.');
      } else {
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      nom: '',
      prenom: '',
      position: '',
      email: '',
      departementId: ''
    });
    setError('');
  };

  // Fonction pour déboguer la structure d'un objet
  const displayObjectProperties = (obj) => {
    if (!obj) return "undefined";
    return Object.keys(obj).map(key => `${key}: ${typeof obj[key] === 'object' ? '[Object]' : obj[key]}`).join(', ');
  };

  return (
    <div className="signup-container">
      <div className="header-nav">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="#">Société</a></li>
            <li><a href="#">Actualités</a></li>
            <li><a href="#">Références</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="signup-form-container">
        <div className="signup-form">
          <h2 className="signup-title">INSCRIPTION</h2>
          
          {/* Affichage des erreurs */}
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <select
                className="form-select"
                name="departementId"
                value={formData.departementId}
                onChange={handleChange}
                required
              >
                <option key="default-dept" value="">Sélectionnez un département</option>
                
                {departments && departments.length > 0 ? (
                  // Affichage des départements avec l'ID adapté
                  departments.map((dept) => (
                    <option 
                      key={`dept-${dept.id}`} 
                      value={dept.id}
                    >
                      {dept.nomDepartement || `Département ${dept.id}`}
                    </option>
                  ))
                ) : (
                  <option key="no-depts" value="" disabled>
                    {loading ? "Chargement des départements..." : "Aucun département disponible"}
                  </option>
                )}
              </select>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Soumission en cours...' : 'Soumettre'}
              </button>
            </div>
          </form>
          
          <div className="login-link">
            <p>
              Si vous avez déjà un compte, <a href="/login">connectez-vous</a>
            </p>
          </div>
          
          {/* Section de débogage - à supprimer en production */}
          <div style={{ marginTop: '20px', fontSize: '12px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <h4>Informations de débogage</h4>
            <p><strong>Nombre de départements:</strong> {departments.length}</p>
            {departments.length > 0 && (
              <>
                <p><strong>Premier département:</strong> {displayObjectProperties(departments[0])}</p>
                <p><strong>Propriétés disponibles:</strong> {departments[0] ? Object.keys(departments[0]).join(', ') : 'aucune'}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;