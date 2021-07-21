import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import styles from './Vendor.module.scss';
import * as actions from '../../store/actions';
import PageWrapper from '../../components/PageWrapper';
import VendorInfo from './components/VendorInfo/VendorInfo';
import VendorDesc from './components/VendorDesc/VendorDesc';
import DiscountsList from './components/DiscountsList/DiscountsList';
import Vocabulary from '../../translations/vocabulary';

function Vendor() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [activeButton, setActiveButton] = useState(true);
  const [archiveButton, setArchiveButton] = useState(false);
  useEffect(() => {
    dispatch(actions.vendorActions.getVendorById(id));
    dispatch(actions.vendorActions.getSubscribedVendors());
    dispatch(actions.discountsActions.getVendorDiscounts({
      vendorId: id,
      pageNumber: 0,
      size: 6,
      showMore: false,
      active: true
    }));
  }, [dispatch, id]);
  const vendor = useSelector((state) => state.vendorReducer.vendor);
  const vendorDiscounts = useSelector((state) => state.discountsReducer.vendorDiscounts);
  const getVendorDiscountsStatus = useSelector((state) => state.discountsReducer.getVendorDiscountsStatus);

  const onActiveClick = () => {
    setActiveButton(true);
    setArchiveButton(false);
    dispatch(actions.discountsActions.getVendorDiscounts({
      vendorId: id,
      pageNumber: 0,
      size: 6,
      showMore: false,
      active: true
    }));
  };

  const onArchiveClick = () => {
    setArchiveButton(true);
    setActiveButton(false);
    dispatch(actions.discountsActions.getVendorDiscounts({
      vendorId: id,
      pageNumber: 0,
      size: 6,
      showMore: false,
      active: false
    }));
  };

  const activeButtonClass = activeButton ? 'active' : '';
  const archiveButtonClass = archiveButton ? 'active' : '';

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
        <div className={styles.blockVendor}>
          { vendor && vendor.description
            ? <Fragment>
              <VendorInfo vendor = {vendor} className={styles.vendorInfo} />
              <VendorDesc description = {vendor.description} className={styles.vendorDescription} />
            </Fragment>
            : <p>Vendor is not defined</p>
          }
        </div>
        <div>
          <div className = {styles.buttonsContainer}>
            <button onClick = {onActiveClick} className = {styles[activeButtonClass]}>{t(Vocabulary.ACTIVE)}</button>
            <button onClick = {onArchiveClick} className = {styles[archiveButtonClass]}>{t(Vocabulary.ARCHIVE)}</button>
          </div>
          <div className={styles.activeDiscounts}>
            {getVendorDiscountsStatus.loading === true
              && <div className = {styles.loadingContainer}>
              <CircularProgress />
            </div>}
            {getVendorDiscountsStatus.loading === false
              && <DiscountsList discountsList={vendorDiscounts} vendorId = {id} activeButton = {activeButton}/>
            }
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Vendor;
