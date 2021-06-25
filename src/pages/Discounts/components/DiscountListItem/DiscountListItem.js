import DiscountCard from "../../../../components/discountCard";
import styles from './DiscountListItem.module.scss';

function DiscountListItem({ discount, onClick }) {
  return (
    <li onClick = {(e) => onClick(e, discount.id)}>
      <DiscountCard
        title = {discount.title}
        category = {discount.category.title}
        company = {discount.vendor.title}
        description = {discount.description}
        discount = {discount.percentage}
        className = {styles.discountsCard}
      />
    </li>
  );
}

export default DiscountListItem;
