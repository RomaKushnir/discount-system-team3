import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './InfoPage.module.scss';
import * as actions from '../../store/actions';
import getMonthAndDay from '../../utilities/getMonthAndDay';

function InfoPage() {
  const dispatch = useDispatch();
  const { userId, discountId } = useParams();

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountInfo({ userId, discountId }));
    // eslint-disable-next-line
  }, []);

  const discountInfo = useSelector((state) => state.discountsReducer.discountInfo);
  const getDiscountInfoStatus = useSelector((state) => state.discountsReducer.getDiscountInfoStatus);

  return (
    <div className = {styles.container}>
      <div className={styles.logo}>Discount<span className={styles.logoItem}>App</span></div>
      <main className={styles.contentWrapper}>
        {getDiscountInfoStatus.loading === true
          && <div className = {styles.loadingContainer}>
          <CircularProgress />
        </div>}
        {discountInfo && <div>
          <div className = {styles.userInfo}>
            <img className={styles.image} src = {discountInfo.imageUrl}
            alt={'vendor'} width="90" height="90"/>
            <p>{discountInfo.firstName}, &nbsp; {discountInfo.firstName}</p>
          </div>
          <div className = {styles.discountInfo}>
            <h3>{discountInfo.discountTitle}</h3>
            {discountInfo.promocode && <h3>{discountInfo.promocode}</h3>}
            <p>From: {getMonthAndDay(discountInfo.discountStartDate)}</p>
            <p>To: {getMonthAndDay(discountInfo.discountExpirationDate)}</p>
          </div>
          <div className = {styles.vendorInfo}>
            <p>{discountInfo.vendorTitle}</p>
            <p><a href={`mailto:${discountInfo.vendorEmail}`}>{discountInfo.vendorEmail}</a> </p>
          </div>
        </div>}
      </main>
    </div>
  );
}

export default InfoPage;
