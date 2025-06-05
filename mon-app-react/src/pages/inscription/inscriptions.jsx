// src/pages/inscription/inscriptions.jsx
import React, { useEffect, useState } from 'react';
import { authService } from '../../api/authService';

const InscriptionPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const response = await authService.getPendingRegistrations();
      setPendingUsers(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des inscriptions.");
    }
  };

  const handleApprove = async (id) => {
    try {
      await authService.approveEmployee(id);
      fetchPending();
    } catch {
      setError("Erreur lors de l'approbation.");
    }
  };

  const handleReject = async () => {
    try {
      await authService.rejectEmployee(selectedUser.id, rejectReason);
      setSelectedUser(null);
      setRejectReason('');
      fetchPending();
    } catch {
      setError("Erreur lors du rejet.");
    }
  };

  return (
    <div className="inscription-page">
      <h2>Inscriptions en attente</h2>

      {error && <div className="error-message">{error}</div>}

      {pendingUsers.length === 0 ? (
        <p>Aucune inscription en attente.</p>
      ) : (
        <div className="list-container">
          {pendingUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.nom} {user.prenom}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Département:</strong> {user.nomDepartement || 'N/A'}</p>
              <p><strong>Position:</strong> {user.position}</p>

              <div className="actions">
                <button onClick={() => handleApprove(user.id)} className="btn-approve">Approuver</button>
                <button onClick={() => setSelectedUser(user)} className="btn-reject">Rejeter</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection modal */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Rejeter l'inscription de {selectedUser.nom}</h3>
            <textarea
              placeholder="Raison du rejet"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
            <div className="modal-actions">
              <button onClick={() => setSelectedUser(null)} className="btn-cancel">Annuler</button>
              <button onClick={handleReject} className="btn-confirm" disabled={!rejectReason}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InscriptionPage;
