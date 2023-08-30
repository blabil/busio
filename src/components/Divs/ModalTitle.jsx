import React from 'react';

const Div = ({children, label}) => {
  return (
    <div className="flex items-center flex-col gap-3 h-1/6">
            <h3 className=" mt-2 text-lg font-normal text-gray-500 dark:text-gray-400 uppercase">
              {label}
            </h3>    
            {children}
    </div>
  );
};

export default Div;