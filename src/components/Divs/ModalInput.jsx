import React from 'react';

const Div = ({children, grid, label}) => {
  return (
    <div className="relative w-3/4">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor={grid}
              >
                {label}
              </label>
              {children}
            </div>
  );
};

export default Div;