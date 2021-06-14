import React from 'react';
import style from './customStyles.module.scss';

function DiscountCard({
  title,
  category,
  company,
  img = 'https://picsum.photos/200/300',
  description,
  discount
}) {
  return (
        <div className={style.borderCard}>
        <div className={style.col1}>
          <img src={img} alt={'vendor'} width="90" height="90"/>
        </div>
        <div className={style.col2}>
          <div className={style.row}><h2>{title}</h2></div>
        <div className={style.row}>
          <div className={style.col3}><p>{category}</p></div>
          <div className={style.col3}><p>{company}</p></div>
        </div>
        <div className={style.row}>
          <p className={style.description}>{description}</p>
        </div>
        <div className={style.row}>
          <p className={style.disc}>{discount}</p>
        </div>
        </div>
        </div>
  );
}

export default DiscountCard;
