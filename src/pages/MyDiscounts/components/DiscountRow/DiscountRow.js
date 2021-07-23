import Button from '../../../../components/Button';
import styles from './DiscountRow.module.scss';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';
import DiscountTag from '../../../../components/DiscountTag';

function DiscountRow({ discount, onQRCodeClick }) {
  const currentDate = new Date();
  const discountDate = new Date(discount.expirationDate);
  return (
    <div className = {styles.discountContainer}>
      <div className = {styles.img}><img alt = {discount.title} src = {discount.imageUrl}/></div>
      <div className = {styles.vendor}>{discount.vendor.title}</div>
      <div className = {styles.category}>{discount.category.title}</div>
      <div className = {styles.title}>{discount.title}</div>
      {discountDate < currentDate
        ? <div className = {styles.button}>
            <Button
              btnText = "QR code"
              name = "qrcode"
              onClick = {() => onQRCodeClick(discount.id)}
              isDisabled = {true}
            /> Expired
          </div>
        : <div className = {styles.button}>
            <Button
              btnText = "QR code"
              name = "qrcode"
              onClick = {() => onQRCodeClick(discount.id)}
            />
          </div>}
      <div className = {styles.expDate}>{getMonthAndDay(discount.expirationDate)}</div>
      <div className = {styles.tag}>
        <DiscountTag
          flatAmount = {discount.flatAmount}
          percentage = {discount.percentage}
        />
      </div>
    </div>
  );
}

export default DiscountRow;
