import React from 'react';

const h1 = ({ value }) => {
  return (
    <span className="bg-yellow-100 text-yellow-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">{value}</span>
  );
};

export default h1;