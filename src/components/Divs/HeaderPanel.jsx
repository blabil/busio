import React from 'react';

const Div = ({children}) => {
  return (
    <div className="flex justify-center gap-3 flex-col w-72 my-4">
        {children}
    </div>
  );
};

export default Div;