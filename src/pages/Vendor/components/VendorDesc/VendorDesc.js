import React from 'react';
import style from './VendorDesc.module.scss';

function VendorInfo({ description, className }) {
  return (
    <>
      { description && <div className={`${style.container} ${className}`}>{description}</div>
      }
    </>
  );
}

export default VendorInfo;
