import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Vendor.module.scss';
import * as actions from '../../store/actions';
// import DiscountCard from '../../components/discountCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import VendorInfo from './components/VendorInfo/VendorInfo';
import VendorDesc from './components/VendorDesc/VendorDesc';
import DiscountsList from './components/DiscountsList/ListDiscounts';
import discountsList from '../../mockData/discountsList';

function Vendor() {
  const dispatch = useDispatch();
  console.log('Before Use Effect');
  const { id } = useParams();// id value from url
  useEffect(() => {
    console.log('Use Effect');
    dispatch(actions.vendorActions.getVendorById(id));
    console.log('Work');
    console.log(id);
  }, [dispatch, id]);
  const vendor = useSelector((state) => state.vendorReducer.vendor);
  console.log(vendor);
  return (
    <div className={styles.vendorPage}>
    <Header />
    <div className={styles.blockVendor}>
    { vendor && vendor.description
      ? <Fragment> <VendorInfo
      vendor = {vendor}
    />
    <VendorDesc description = {vendor.description} />
    </Fragment>
      : <p>Vendor is not defined</p>
    }
    </div>
    <div>
    <h2 className={styles.headers}>Active</h2>
    <div className={styles.activeDiscounts}>
    <DiscountsList discountsList={discountsList}/>
    </div>
    </div>
    <div>
    <h2 className={styles.headers}>Archieve</h2>
    <div className={styles.activeDiscounts}>
    <DiscountsList discountsList={discountsList}/>
    </div>
    </div>
    <div className={styles.footer}><Footer /></div>
    </div>
  );
}

export default Vendor;
