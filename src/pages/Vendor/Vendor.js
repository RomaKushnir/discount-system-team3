import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Vendor.module.scss';
import * as actions from '../../store/actions';
// import DiscountCard from '../../components/discountCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import VendorInfo from './components/VendorInfo/VendorInfo';
import VendorDesc from './components/VendorDesc/VendorDesc';
import ActiveDiscountsList from './components/ActiveDiscounts/ActiveDiscounts';
import discountsList from '../../mockData/discountsList';

function Vendor() {
  const dispatch = useDispatch();
  console.log('Before Use Effect');
  const id = 22; // temporary
  useEffect(() => {
    console.log('Use Effect');
    dispatch(actions.vendorActions.getVendorById(id));
    console.log('Work');
  }, [dispatch]);
  const vendor = useSelector((state) => state.vendorReducer.vendor);
  console.log(vendor);
  return (
    <div className={styles.container}>
    <Header />
    <div className={styles.blockVendor}>
    <VendorInfo
      title = "Dodo"
      img = "https://picsum.photos/200/300"
      location = "Moscow"
      address1 = "Sumska 256"
      address2 = "Pushkinska 34"
      category1 = "Food"
      category2 = "Pizza"
      category3 = "Fast-Food"
      // vendor = {vendor}
    />
    <VendorDesc description = "Dodo Pizza is a Russian pizza delivery franchise founded in 2011 by Fyodor Ovchinnikov. The corporation is headquartered in Syktyvkar and Moscow."/>
    {/* <VendorDesc description = {vendor.description} /> */}
    </div>
    <div>
    <h2 className={styles.headers}>Active</h2>
    <div className={styles.activeDiscounts}>
    <ActiveDiscountsList discountsList={discountsList}/>
    {/* <div className={styles.blockButtonCenter}><button className={styles.buttonShowMore}>Show More</button></div> */}
    </div>
    </div>
    <div>
    <h2 className={styles.headers}>Archieve</h2>
    <div className={styles.activeDiscounts}>
    <ActiveDiscountsList discountsList={discountsList}/>
    {/* <div className={styles.blockButtonCenter}><button className={styles.buttonShowMore}>Show More</button></div> */}
    </div>
    </div>
    <div className={styles.footer}><Footer /></div>
    </div>
  );
}

export default Vendor;

/* <DiscountCard
      title = "Discount on Carbonara"
      category = "Food"
      company = "Dodo"
      description = "The pizza is delicious"
      discount = "10%"
    />
    <DiscountCard
      title = "Discount on Carbonara"
      category = "Food"
      company = "Dodo"
      description = "The pizza is delicious"
      discount = "10%"
    />
    <DiscountCard
      title = "Discount on Carbonara"
      category = "Food"
      company = "Dodo"
      description = "The pizza is delicious"
      discount = "10%"
    />
*/
