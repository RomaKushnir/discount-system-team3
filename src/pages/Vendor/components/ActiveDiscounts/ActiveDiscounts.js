import React, { useState } from 'react';
import styles from './ActiveDiscount.module.scss';
import DiscountCard from '../../../../components/discountCard/DiscountCard';

// var idx = idx + 1;
// var countCards = countCards + 1;

function ActiveDiscountsList({ discountsList }) {
  const [idx, setIdx] = useState(0);
  const [countCards, setCountCards] = useState(3);
  function onAddCards() {
    if (discountsList.length > countCards) {
      setIdx((prevCount) => prevCount + 3);
      setCountCards((prevCount) => prevCount + 3);
    } else {
      setIdx((prevCount) => prevCount - 3);
      setCountCards((prevCount) => prevCount - 3);
    }
    console.log(idx, countCards);
  }
  // console.log(idx, countCards);
  return (
    <>
    <div className={styles.row}>
      {discountsList.slice(idx, countCards).map(
        (discountCard) => <div><DiscountCard
          discount={discountCard}
          key={discountCard.id}
          title={discountCard.title}
          category={discountCard.categoryId[discountCard.id]}
          company={discountCard.vendorId[discountCard.id]}
          description={discountCard.shortDescription}
          discount={discountCard.percentage}
          /></div>
      )
      }
    </div>
    <div className={styles.blockButtonCenter}><button className={styles.buttonShowMore} onClick={onAddCards}>Show More</button></div>
    </>
  );
}

export default ActiveDiscountsList;

/*
discountsList.map(
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
*/
