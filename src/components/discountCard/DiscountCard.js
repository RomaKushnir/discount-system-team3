import style from './DiscountCard.module.scss';
import DiscountTag from '../DiscountTag';

function DiscountCard({
  title,
  category,
  company,
  img = 'https://picsum.photos/200/300',
  description,
  discount,
  flatAmount,
  className = ''
}) {
  return (
  <div className={`${style.borderCard} ${className}`}>
    <div className={style.col1}>
      <img className={style.roundImg} src={img} alt={'vendor'} width="90" height="90"/>
    </div>
    <div className={style.col2}>
      <div className={style.row}><h2>{title}</h2></div>
      <div className={style.row}>
        <div className={style.col3}><p>{category}</p></div>
        <div className={style.col3}><p>{company}</p></div>
      </div>
      <div className={`${style.row} ${style.descrTag}`}>
        <p className={style.description}>{description}</p>
        <DiscountTag
          percentage = {discount}
          flatAmount = {flatAmount}
        />
      </div>
    </div>
  </div>
  );
}

export default DiscountCard;
