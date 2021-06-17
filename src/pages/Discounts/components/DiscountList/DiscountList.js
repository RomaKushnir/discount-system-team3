import styles from './DiscountList.module.scss';
import DiscountCard from '../../../../components/discountCard';
import categoriesList from '../../../../mockData/categoriesList';
import vendorsList from '../../../../mockData/vendorsList';

function DiscountList({ discounts }) {
  return (
    <>
    {discounts.length
      ? discounts.map((discount) => <DiscountCard
          title = {discount.title}
          category = {categoriesList[discount.categoryId].label}
          company = {vendorsList[discount.vendorId].label}
          description = {discount.description}
          discount = {discount.percentage}
          className = {styles.discountsCard}
        />)
      : <p className = {styles.noContent}>There are no discounts</p>}
    </>
  );
}

export default DiscountList;
