import React from 'react';
import style from './VendorDesc.module.scss';

function VendorInfo({ description }) {
  return (
    <>
      { description && <div className={style.container}>{description}</div>
      }
    </>
  );
}

export default VendorInfo;
