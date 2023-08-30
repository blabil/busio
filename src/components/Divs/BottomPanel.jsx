import React from 'react';

const Div = ({children}) => {
  return (
    <div className="flex-1 flex-col items-center mx-8 mb-6 shadow-lg rounded-lg bg-white border-0">
        {children}
    </div>
  );
};

export default Div;