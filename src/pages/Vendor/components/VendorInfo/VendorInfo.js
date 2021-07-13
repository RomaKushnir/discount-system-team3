import React from 'react';
import style from './VendorInfo.module.scss';
import SelectField from '../../../../components/SelectField';
import combineLocation from '../../../../utilities/combineLocation';

function VendorInfo({
  vendor
}) {
  const {
    title, locations, imageUrl, email
  } = vendor;
  const locationOptions = locations.map((location) => combineLocation(location));

  return (
    <>
      { vendor && <div className={style.container}>
      <div className={style.image}>
        <img className={style.roundImg} src={imageUrl} alt={'vendor'} />
      </div>
      <div className={style.details}>
        <h2>{title}</h2>
        <p>{email}</p>
        <SelectField
          initialValue = {locationOptions[0]}
          options = {locationOptions}
          label = "Locations"
          isClearable = {false}
        />
      </div>
      </div>
      }
  </>
  );
}

export default VendorInfo;
