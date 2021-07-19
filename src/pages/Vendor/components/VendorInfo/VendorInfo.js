import { useMemo } from 'react';
import style from './VendorInfo.module.scss';
import SelectField from '../../../../components/SelectField';
import combineLocation from '../../../../utilities/combineLocation';
import Button from '../../../../components/Button';

function VendorInfo({ vendor, className }) {
  const {
    title, locations, imageUrl, email
  } = vendor;

  const locationOptionsMemoized = useMemo(
    () => locations.map((location) => combineLocation(location)), [locations]
  );

  const vendorSubscribeHandler = () => {

  };

  return (
    <>
      { vendor && <div className={`${style.container} ${className}`}>
        <div className={`${style.infoTop} ${style.gridRow}`}>
          <div className={style.imageWrapper}>
            <img className={style.roundImg} src={imageUrl} alt={'vendor'} />
          </div>
          <div className={style.details}>
            <h2>{title}</h2>
            {email && <p><a href={`mailto:${email}`}>{email}</a></p>}
            {/* {phone && <p>0683342154</p>} */}
          </div>
        </div>
        <div className={`${style.infoBottom} ${style.gridRow}`}>
          <div className={style.subscribeContainer}>
            <Button
              btnText="Subscribe"
              onClick={vendorSubscribeHandler}
              className={style.subscribeBtn}
            />
          </div>
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
