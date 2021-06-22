import styles from './ActiveDiscount.module.scss';
import DiscountCard from '../../../../components/discountCard/DiscountCard';

function ActiveDiscountsList({ discountsList }) {
  return (
    <div>
      {discountsList.length
        ? discountsList.map(
          (discountCard) => <DiscountCard
          discount={discountCard}
          key={discountCard.id}
          title={discountCard.title}
          category={discountCard.categoryId[discountCard.id]}
          company={discountCard.vendorId[discountCard.id]}
          description={discountCard.shortDescription}
          discount={discountCard.percentage}
          />
        )
        : <p className={styles.noContentPlaceholder}>There are no vendors yet!</p>
      }
    </div>
  );
}

export default ActiveDiscountsList;
