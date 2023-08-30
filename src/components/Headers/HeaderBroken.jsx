import React from 'react';

const h1 = ({ value }) => {
  return (
    <span className="bg-red-100 text-red-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{value}</span>
  );
};

export default h1;