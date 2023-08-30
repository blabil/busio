import React from 'react';

const Div = ({children, label, htmlFor}) => {
  return (
    <div className="my-2 mx-4 flex justify-center items-center w-full gap-4">
        <div className="text-left w-2/6">
        <label
                      className="uppercase text-blueGray-600 text-center font-bold mb-2"
                      htmlFor={htmlFor}
                    >
                      {label}
                    </label>
        </div>
                    <div className='flex-1 justify-center items-center w-4/6'>
                    {children}
                    </div>
                    
    </div>
  );
};

export default Div;