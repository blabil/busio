import React from 'react';

const Div = ({children}) => {
  return (
    <div className='flex flex-col mx-2 w-full'>
        {children}
    </div>
  );
};

export default Div;