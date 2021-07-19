import { useMemo } from 'react';
import style from './VendorInfo.module.scss';
import SelectField from '../../../../components/SelectField';
import combineLocation from '../../../../utilities/combineLocation';

function VendorInfo({
  vendor
}) {
  const {
    title, locations, imageUrl, email
  } = vendor;

  const locationOptionsMemoized = useMemo(
    () => locations.map((location) => combineLocation(location)), [locations]
  );

  return (
    <>
      { vendor && <div className={style.container}>
      <div className={style.image}>
        <img className={style.roundImg} src={imageUrl} alt={'vendor'} />
      </div>
      <div className={style.details}>
        <h2>{title}</h2>
        <p><a href={`mailto:${email}`}>{email}</a></p>
        <SelectField
          value = {locationOptionsMemoized[0]}
          options = {locationOptionsMemoized}
          label = "Locations"
          isClearable = {false}
          className = {style.locationsSelect}
        />
      </div>
      </div>
      }
  </>
  );
}

export default VendorInfo;
