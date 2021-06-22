import React from 'react';
import style from './VendorDesc.module.scss';

function VendorInfo({ description }) {
  return (
        <div className={style.borderCard}><p className={style.textDesc}>{description}</p></div>
  );
}

export default VendorInfo;
