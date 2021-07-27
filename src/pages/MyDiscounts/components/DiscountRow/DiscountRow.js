import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import Button from '../../../../components/Button';
import styles from './DiscountRow.module.scss';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';
import DiscountTag from '../../../../components/DiscountTag';
import noImg from '../../../../assets/images/noImg.png';

function DiscountRow({ discount, onQRCodeClick }) {
  const currentDate = new Date();
  const discountDate = new Date(discount.expirationDate);
  return (
    <div className = {styles.discountContainer}>
      <div className = {styles.img}>
        <img alt = {discount.title} src = {discount.imageUrl || noImg}/>
      </div>
      <div className = {styles.vendor}><StorefrontRoundedIcon/>{discount.vendor.title}</div>
      <div className = {styles.category}><CategoryRoundedIcon/>{discount.category.title}</div>
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
