import React from 'react';

const Div = ({children}) => {
  return (
    <div className="flex justify-between mx-8 mb-6 shadow-lg rounded-lg bg-white border-0">
        {children}
    </div>
  );
};

export default Div;