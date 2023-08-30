import React from 'react';

const Div = ({children, label}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 p-4 w-3/4'>
      <div className='flex justify-center items-center w-full'>
        <h1 className='text-xl font-bold'>{label}</h1>
      </div>
    <div className="flex justify-center items-center w-full">
        {children}
    </div>
    </div>
  );
};

export default Div;