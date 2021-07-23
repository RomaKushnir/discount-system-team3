import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import style from './VendorInfo.module.scss';
import SelectField from '../../../../components/SelectField';
import combineLocation from '../../../../utilities/combineLocation';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import Vocabulary from '../../../../translations/vocabulary';

function VendorInfo({ vendor, className }) {
  const {
    title, locations, imageUrl, email, phoneNumber
  } = vendor;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const subscribedVendors = useSelector((state) => state.vendorReducer.subscribedVendors);
  const vendorSubscribeStatus = useSelector((state) => state.vendorReducer.vendorSubscribeStatus);
  const vendorUnsubscribeStatus = useSelector((state) => state.vendorReducer.vendorUnsubscribeStatus);

  const isSubscribed = useMemo(
    () => subscribedVendors.some((id) => vendor.id === id), [subscribedVendors, vendor.id]
  );

  const locationOptionsMemoized = useMemo(
    () => locations.map((location) => combineLocation(location)), [locations]
  );

  const onVendorSubscribe = (id) => {
    dispatch(actions.vendorActions.vendorSubscribe(id));
  };

  const onVendorUnsubscribe = (id) => {
    dispatch(actions.vendorActions.vendorUnsubscribe(id));
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
            {phoneNumber && <p>{phoneNumber}</p>}
          </div>
        </div>
        <div className={`${style.infoBottom} ${style.gridRow}`}>
          <div className={style.subscribeContainer}>
            {isSubscribed
              ? <Button
                  btnText={t(Vocabulary.UNSUBSCRIBE)}
                  onClick={() => onVendorUnsubscribe(vendor.id)}
                  className={style.unsubscribeBtn}
                  isDisabled={vendorUnsubscribeStatus.loading}
                />
              : <Button
                  btnText={t(Vocabulary.SUBSCRIBE)}
                  onClick={() => onVendorSubscribe(vendor.id)}
                  isDisabled={vendorSubscribeStatus.loading}
                />
            }
          </div>
          <SelectField
            value = {locationOptionsMemoized[0]}
            options = {locationOptionsMemoized}
            label = {t(Vocabulary.LOCATIONS)}
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
