import React from 'react';

const ProfileSuperAdmin = () => {
  return (
    <div className="container mt-5">
      <h2>Bienvenue, SuperAdmin !</h2>
      <p>Depuis ce tableau de bord, vous pouvez :</p>
      <ul>
        <li>Valider les demandes envoyées par les admins</li>
        <li>Proposer des rendez-vous</li>
        <li>Gérer les modifications de rendez-vous</li>
        <li>Envoyer des notifications de confirmation</li>
        <li>Confirmer la récupération de badge</li>
        <li>Suivre toutes les étapes du cycle de vie d’un badge</li>
      </ul>
    </div>
  );
};

export default ProfileSuperAdmin;
