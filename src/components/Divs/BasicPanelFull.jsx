import React from 'react';

const Div = ({children}) => {
  return (
    <div className='flex flex-col w-full mx-2'>
        {children}
    </div>
  );
};

export default Div;