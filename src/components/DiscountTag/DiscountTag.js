import styles from './DiscountTag.module.scss';

const CENTER_PERCENT = 50;

function DiscountTag({
  percentage,
  flatAmount
}) {
  return (
    <div className = {styles.discountWrapper}>
    Discount
      {percentage === 0 || !percentage
        ? <div className={`${styles.discount} ${styles.amount}`}>
          - {flatAmount}$
          </div>
        : <div className=
            {`${styles.discount} ${styles.percent} ${percentage > CENTER_PERCENT ? styles.hot : null}`}
          >
          - {percentage}%
          </div>}
    </div>
  );
}

export default DiscountTag;
