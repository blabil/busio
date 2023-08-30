import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button data-modal-hide="popup-modal" className="text-white bg-sky-400 hover:bg-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={onClick}>Dodaj</button>
  );
};

export default Button;