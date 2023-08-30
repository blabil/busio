import React from 'react';

const Div = ({children}) => {
  return (
    <div className="flex items-center justify-center mx-4">
        {children}
    </div>
  );
};

export default Div;