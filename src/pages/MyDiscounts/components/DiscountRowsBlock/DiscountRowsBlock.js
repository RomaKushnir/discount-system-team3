import styles from './DiscountRowsBlock.module.scss';
import DiscountRow from '../DiscountRow';

function DiscountRowsBlock({ discounts, onQRCodeClick }) {
  const discountsList = discounts.map((discount) => <li className = {styles.discountRow} key = {discount.id}>
    <DiscountRow
      discount = {discount}
      onQRCodeClick = {onQRCodeClick}
    />
      </li>);

  return (
    <ul>{discountsList}</ul>
  );
}

export default DiscountRowsBlock;
