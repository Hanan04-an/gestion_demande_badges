import React from 'react';

const ProfileAdmin = () => {
  return (
    <div className="container mt-5">
      <h2>Bienvenue, Administrateur !</h2>
      <p>Depuis ce tableau de bord, vous pouvez :</p>
      <ul>
        <li>Consulter les demandes de badge</li>
        <li>Vérifier les droits des employés</li>
        <li>Fournir et valider les formulaires</li>
        <li>Transmettre les demandes au SuperAdmin</li>
        <li>Gérer les demandes de dépôt et de récupération</li>
        <li>Notifier les employés et SuperAdmin</li>
      </ul>
    </div>
  );
};

export default ProfileAdmin;
