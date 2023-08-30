import React from 'react';
import { IoMdOpen  } from 'react-icons/io';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}><IoMdOpen className="w-4 h-4 flex items-center jusitfy-center"/></button>
  );
};

export default Button;