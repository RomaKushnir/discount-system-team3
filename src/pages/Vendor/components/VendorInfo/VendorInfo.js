import React from 'react';
import style from './VendorInfo.module.scss';

function VendorInfo({
  vendor
}) {
  console.log(vendor);
  const {
    title, location, imageUrl, email
  } = vendor;
  const { countryCode, city, addressLine } = location;
  return (
    <div>
      { vendor && <div className={style.container}>
      <div className={style.image}>
        <img className={style.roundImg} src={imageUrl} alt={'vendor'} />
      </div>
      <div className={style.details}>
        <h2>{title}</h2>
        <p>{email}</p>
        <p>{countryCode}, {city}, {addressLine}</p>
      </div>
      </div>
      }
  </div>
  );
}

export default VendorInfo;
