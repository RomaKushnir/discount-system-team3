import styles from './DiscountTag.module.scss';

function DiscountTag({
  percentage,
  flatAmount,
  className
}) {
  return (
    <div className = {`${styles.discountWrapper} ${className}`}>
      {percentage === 0 || !percentage
        ? <div className={`${styles.discount} ${styles.amount}`}>
          - {flatAmount}$
          </div>
        : <div className = {`${styles.discount} ${styles.percent}`}>
          - {percentage}%
          </div>}
    </div>
  );
}

export default DiscountTag;
