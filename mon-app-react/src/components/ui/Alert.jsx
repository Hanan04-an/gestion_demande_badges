import React from 'react';

const Alert = ({ type, message }) => {
  const alertClasses = {
    success: 'alert alert-success',
    danger: 'alert alert-danger',
    info: 'alert alert-info'
  };

  return (
    <div className={alertClasses[type]} role="alert">
      {message}
    </div>
  );
};

export default Alert;