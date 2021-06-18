import styles from './DiscountList.module.scss';
import DiscountCard from '../../../../components/discountCard';
import categoriesList from '../../../../mockData/categoriesList';
import vendorsList from '../../../../mockData/vendorsList';

function DiscountList({ discounts }) {
  const discountsList = discounts.length
    ? discounts.map((discount) => <li key={discount.id}>
        <DiscountCard
          title = {discount.title}
          category = {categoriesList[discount.categoryId].label}
          company = {vendorsList[discount.vendorId].label}
          description = {discount.description}
          discount = {discount.percentage}
          className = {styles.discountsCard}
        />
      </li>)
    : <p className = {styles.noContent}>There are no discounts</p>;
  return (
    <ul className = {styles.discountsList}>{discountsList}</ul>
  );
}

export default DiscountList;
