// 4. Create a SignUpPending page to show after employee submits registration

import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPending = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-info text-center">
            <h4>Inscription en attente d'approbation</h4>
            <p>
              Votre demande d'inscription a été soumise avec succès. 
              Un administrateur va examiner votre demande.
              Vous recevrez un email pour créer votre mot de passe une fois votre demande approuvée.
            </p>
            <Link to="/login" className="btn btn-primary">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPending;