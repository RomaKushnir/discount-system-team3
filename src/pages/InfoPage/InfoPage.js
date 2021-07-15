import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './InfoPage.module.scss';
import * as actions from '../../store/actions';

function InfoPage() {
  const dispatch = useDispatch();
  const { userId, discountId } = useParams();

  console.log(userId, discountId);

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountInfo({ userId, discountId }));
    // eslint-disable-next-line
  }, []);

  const discountInfo = useSelector((state) => state.discountsReducer.discountInfo);
  const getDiscountInfoStatus = useSelector((state) => state.discountsReducer.getDiscountInfoStatus);

  console.log(discountInfo);

  return (
    <div className = {styles.container}>
      <div className={styles.logo}>Discount<span className={styles.logoItem}>App</span></div>
      <main className={styles.contentWrapper}>
        {getDiscountInfoStatus.loading === true
          && <div className = {styles.loadingContainer}>
          <CircularProgress />
        </div>}
        {discountInfo && <div>
          <img className={styles.roundImg} src={discountInfo.imageUrl} alt={'vendor'} width="90" height="90"/>
        </div>}
      </main>
    </div>
  );
}

export default InfoPage;
