import React from 'react';
import { Link } from "react-router-dom";
import { IoMdOpen  } from 'react-icons/io';

const Button = ({ path, onClick }) => {
  return (
    <Link className="flex items-center justify-center" to={path}>
    <button onClick={onClick}><IoMdOpen className="w-4 h-4 flex items-center jusitfy-center"/></button>
    </Link>
  );
};

export default Button;