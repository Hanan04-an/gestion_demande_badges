import React from 'react';
import { Link } from 'react-router-dom';

const SignUpSuccess = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-success text-center">
            <h4>Inscription réussie !</h4>
            <p>
              Un email a été envoyé à votre adresse avec un lien pour 
              créer votre mot de passe.
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

export default SignUpSuccess;