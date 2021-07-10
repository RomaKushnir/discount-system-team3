import { useState } from 'react';
import styles from './DiscountList.module.scss';
import DiscountListItem from '../DiscountListItem';

function DiscountList({ discounts, onCardClick, favouriteDiscounts }) {
  const [isLike, setIsLike] = useState(false);
  const onFavouriteClick = (e, id) => {
    e.stopPropagation();
    if (isLike) {
      favouriteDiscounts.filter((el) => el !== id);
      setIsLike(false);
    } else {
      favouriteDiscounts.push(id);
      setIsLike(true);
    }
  };

  const discountsList = discounts?.length > 0
    ? discounts.map((discount) => <DiscountListItem
        discount = {discount}
        key = {discount.id}
        onClick = {onCardClick}
        isLike = {Boolean(favouriteDiscounts.find((el) => el === discount.id))}
        onFavouriteClick = {onFavouriteClick}
      />)
    : <p className = {styles.noContent}>There are no discounts</p>;
  return (
    <ul className = {styles.discountsList}>{discountsList}</ul>
  );
}

export default DiscountList;
