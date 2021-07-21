import DiscountCard from '../discountCard';
import styles from './DiscountListItem.module.scss';

function DiscountListItem({
  discount, onClick
}) {
  return (
    <li onClick = {(e) => onClick(e, discount.id)}>
      <DiscountCard
        discount = {discount}
        className = {styles.discountsCard}
      />
    </li>
  );
}

export default DiscountListItem;
