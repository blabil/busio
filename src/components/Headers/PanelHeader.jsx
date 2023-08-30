import React from 'react';
import { NavigatePanelButton } from '..';

const div = ({ label, path, children }) => {
  return (
    <div className="flex items-center justify-center gap-3 mx-2 my-2">
        <h1 className='font-serif block uppercase text-blueGray-600 text-md font-bold'>{label}</h1>
        {children}
        {path ? (
        <NavigatePanelButton path={path}/>
      ) : null}
    </div>
  );
};

export default div;