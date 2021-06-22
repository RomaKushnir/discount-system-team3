import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Vendor.module.scss';
import DiscountCard from '../../components/discountCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import VendorInfo from './components/VendorInfo/VendorInfo';
import VendorDesc from './components/VendorDesc/VendorDesc';
import ActiveDiscountsList from './components/ActiveDiscounts/ActiveDiscounts';
import discountsList from '../../mockData/discountsList';

function Vendor() {
  const { id } = useParams();// id value from url
  console.log('vendor id:', id);
  return (
    <div className={styles.container}>
    
    <div className={styles.blockVendor}>
    <VendorInfo
      name = "Dodo"
      img = "https://picsum.photos/200/300"
      location = "Moscow"
      address1 = "Sumska 256"
      address2 = "Pushkinska 34"
      category1 = "Food"
      category2 = "Pizza"
      category3 = "Fast-Food"
    />
    <VendorDesc description = "Dodo Pizza is a Russian pizza delivery franchise founded in 2011 by Fyodor Ovchinnikov. The corporation is headquartered in Syktyvkar and Moscow."/>
    </div>
    <div>
    <h2 className={styles.headers}>Active</h2>
    <div className={styles.activeDiscounts}>
    <ActiveDiscountsList discountsList={discountsList}/>
    </div>
    </div>
    <div>
    <h2 className={styles.headers}>Archieve</h2>
    <div className={styles.activeDiscounts}>
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
    <DiscountCard
      title = "Discount on Carbonara"
      category = "Food"
      company = "Dodo"
      description = "The pizza is delicious"
      discount = "10%"
    />
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
