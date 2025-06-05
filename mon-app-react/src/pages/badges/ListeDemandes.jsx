import React, { useEffect, useState } from 'react';
import DemandeBadgeForm from './DemandeBadgeForm';
import DepotBadgeForm from './DepotBadgeForm';
import RecuperationBadgeForm from './RecuperationBadgeForm';

const types = [
  { value: '', label: 'Tous les types' },
  { value: 'BADGE', label: 'Badge' },
  { value: 'DEPOT', label: 'Dépôt de badge' },
  { value: 'RECUPERATION', label: 'Récupération de badge' },
];

const ListeDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreType, setFiltreType] = useState('');
  const [typeDemande, setTypeDemande] = useState('');
  const [showDepotForm, setShowDepotForm] = useState(false);
  const [showRecupForm, setShowRecupForm] = useState(false);

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/demandes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Erreur API: ' + response.status);
      const data = await response.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      setDemandes([]);
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const demandeBadgeEnCours = demandes.find(
    d => d.type === 'BADGE' && (
      d.statut === 'DEMANDE_INITIALE' ||
      d.statut === 'EN_ATTENTE_FORMULAIRE' ||
      d.statut === 'VALIDATION_ADMIN' ||
      d.statut === 'FORMULAIRE_A_REMPLIR'
    )
  );

  const handleDemandeSimple = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8081/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: typeDemande }),
      });
      await fetchDemandes();
    } catch (error) {
      alert("Erreur lors de la création de la demande.");
    }
  };

  const handleDepotSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      await fetch('http://localhost:8081/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          type: 'DEPOT',
          utilisateurId: user.id,
          formulaire: JSON.stringify(formData),
        }),
      });
      await fetchDemandes();
      setShowDepotForm(false);
      setShowRecupForm(false);
      setTypeDemande('DEPOT');
    } catch (error) {
      console.error('Erreur lors de la création de la demande de dépôt:', error);
      alert("Erreur lors de la création de la demande de dépôt.");
    }
  };

  const handleRecupSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      await fetch('http://localhost:8081/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          type: 'RECUPERATION',
          utilisateurId: user.id,
          formulaire: JSON.stringify(formData),
        }),
      });
      await fetchDemandes();
      setShowRecupForm(false);
      setTypeDemande('RECUPERATION');
    } catch (error) {
      console.error('Erreur lors de la création de la demande de récupération:', error);
      alert("Erreur lors de la création de la demande de récupération.");
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || localStorage.getItem('role');

  const demandesFiltrees = filtreType
    ? demandes.filter(d => d.type === filtreType)
    : demandes;

  if (loading) return <p>Chargement des demandes...</p>;

  return (
    <div style={{ display: 'flex', gap: 40 }}>
      <div style={{ flex: 2 }}>
        <h2>Liste des demandes</h2>
        <div style={{ marginBottom: 20 }}>
          <label>Filtrer par type : </label>
          <select value={filtreType} onChange={e => setFiltreType(e.target.value)}>
            {types.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {demandesFiltrees.length === 0 ? (
          <p>Aucune demande trouvée.</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Type</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {demandesFiltrees.map(demande => (
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>{demande.nomUtilisateur || ''}</td>
                  <td>{demande.prenomUtilisateur || ''}</td>
                  <td>{demande.type}</td>
                  <td>{demande.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 8, minWidth: 350 }}>
        <h3>Nouvelle demande</h3>
        {role !== 'SUPERADMIN' && (
          <>
            {typeDemande === '' && (
              <div>
                <label>Type de demande : </label>
                <select value={typeDemande} onChange={e => setTypeDemande(e.target.value)}>
                  <option value="">-- Choisir --</option>
                  <option value="BADGE">Demande de badge</option>
                  <option value="DEPOT">Dépôt de badge</option>
                  <option value="RECUPERATION">Récupération de badge</option>
                </select>
              </div>
            )}
            {typeDemande === 'BADGE' && (
              !demandeBadgeEnCours ? (
                <button onClick={handleDemandeSimple}>Faire une demande de badge</button>
              ) : (
                <DemandeBadgeForm typeDemande="BADGE" demandeId={demandeBadgeEnCours.id} />
              )
            )}
            {typeDemande === 'DEPOT' && (
              showDepotForm ? (
                <DepotBadgeForm onSubmit={handleDepotSubmit} />
              ) : (
                <button onClick={() => setShowDepotForm(true)}>Faire une demande de dépôt</button>
              )
            )}
            {typeDemande === 'RECUPERATION' && (
              showRecupForm ? (
                <RecuperationBadgeForm onSubmit={handleRecupSubmit} />
              ) : (
                <button onClick={() => setShowRecupForm(true)}>Faire une demande de récupération</button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListeDemandes;
