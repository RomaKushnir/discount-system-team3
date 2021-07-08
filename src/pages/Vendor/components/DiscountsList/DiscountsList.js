import React, { useState } from 'react';
import styles from './DiscountsList.module.scss';
import DiscountCard from '../../../../components/discountCard/DiscountCard';
import OutlineButton from '../../../../components/OutlineButton/OutlineButton';

// var idx = idx + 1;
// var countCards = countCards + 1;

function DiscountsList({ discountsList }) {
  const [idx, setIdx] = useState(0);
  const [countCards, setCountCards] = useState(3);
  const resultArr = discountsList.slice(idx, countCards);
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
      {resultArr.map(
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
      }
    </div>
    <div className={styles.blockButtonCenter}><OutlineButton btnText="SHOW MORE" onClick={onAddCards}/></div>
    </>
  );
}

export default DiscountsList;

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
