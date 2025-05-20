import React from 'react';
import '../../../styles/ProfileEmployee.css';

const ProfileEmployee = () => {
  return (
    <section className="content">
      <h2>SUIVI DE MA DEMANDE</h2>
      <p>
        Si vous n'avez pas encore soumis de demande de badge, veuillez cliquer sur le bouton ci-dessous
        pour lancer la procédure.
      </p>
      <button className="demander-btn">Demander un badge</button>
    </section>
  );
};

export default ProfileEmployee;
