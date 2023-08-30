import React from 'react';

const Div = ({children}) => {
  return (
    <div className="flex justify-around w-full mb-16">
        {children}
    </div>
  );
};

export default Div;