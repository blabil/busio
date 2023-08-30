import React from 'react';

const Href = ({ path, label }) => {
  return (
    <div className='flex items-center justify-center'>
    <a href={path} className="font-serif block uppercase text-blueGray-600 text-md font-bold border-b-2 border-dotted border-sky-400 hover:text-teal-500 hover:border-green-400">{label}</a>
    </div>
  );
};

export default Href;