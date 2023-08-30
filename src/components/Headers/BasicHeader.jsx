import React from 'react';

const div = ({ label, value }) => {
  return (
    <div className="flex items-center gap-4 mx-4">
        <h1 className='font-serif block uppercase text-blueGray-600 text-md font-bold'>{label}</h1>
        {value ? (<h1 className='font-serif block uppercase text-blueGray-600 text-md font-bold underline'>{value}</h1>
) : (null)}
    </div>
  );
};

export default div;