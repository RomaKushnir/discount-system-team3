import styles from './DiscountList.module.scss';
import DiscountListItem from '../DiscountListItem';

function DiscountList({
  discounts, onCardClick
}) {
  const discountsList = discounts?.length > 0
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
