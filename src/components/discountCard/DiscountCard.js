import React from 'react';
import style from './customStyles.module.scss';
// import logo from './logo.png';

function DiscountCard({
  title,
  category,
  company,
  img = 'https://picsum.photos/200/300',
  description,
  discount
}) { // export default нужен для того, чтобы экспортировать в другом файле
  return (
        <div className={style.borderCard}>
        <div className={style.col1}>
          <img src={img} alt={'vendor'} width="90" height="90"/>
        </div>
          <div className={style.col2}>
          <div className={style.row}> <h2>{title}</h2> </div>
        <div className={style.row}>
          <p className={style.col3}>{category}</p>
          <p className={style.col3}>{company}</p>
        </div>
          <div className={style.row}> <p className={style.description}>{description}</p> </div>
          <div className={style.row}> <p className={style.disc}>{discount}</p> </div>
        </div>
        </div>
  );
}

export default DiscountCard;
