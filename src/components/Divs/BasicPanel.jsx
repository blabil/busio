import React from 'react';

const Div = ({children}) => {
  return (
    <div className='flex flex-col w-2/4 mx-2'>
        {children}
    </div>
  );
};

export default Div;