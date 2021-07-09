import DiscountCard from '../../../../components/discountCard';
import styles from './DiscountListItem.module.scss';

function DiscountListItem({
  discount, onClick, isLike, onFavouriteClick
}) {
  return (
    <li onClick = {(e) => onClick(e, discount.id)}>
      <DiscountCard
        discount = {discount}
        className = {styles.discountsCard}
        isLike = {isLike}
        onFavouriteClick = {onFavouriteClick}
      />
    </li>
  );
}

export default DiscountListItem;
