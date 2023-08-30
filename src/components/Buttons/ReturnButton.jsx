import React from 'react';
import { Link } from "react-router-dom";

const Button = ({ onClick, path }) => {
  return (
    <Link to={path}>
    <button className="text-sm bg-sky-400 text-white rounded-lg px-4 py-2 mr-2 hover:bg-teal-500 focus:sky-200" onClick={onClick}>Powrót</button>
    </Link>
  );
};

export default Button;