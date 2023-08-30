import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <button className="text-sm bg-sky-400 text-white rounded-lg px-4 py-2 mr-2 hover:bg-teal-500 focus:sky-200" onClick={onClick}>{label}</button>
  );
};

export default Button;