import styles from './DiscountList.module.scss';
import DiscountListItem from '../DiscountListItem';

function DiscountList({ discounts, onCardClick }) {
  console.log(discounts);
  const discountsList = discounts?.length
    ? discounts.map((discount) => <DiscountListItem
        discount = {discount}
        key = {discount.id}
        onClick = {onCardClick}
      />)
    : <p className = {styles.noContent}>There are no discounts</p>;
  return (
    <ul className = {styles.discountsList}>{discountsList}</ul>
  );
}

export default DiscountList;
