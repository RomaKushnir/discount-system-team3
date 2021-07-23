import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions';
import styles from './Favourites.module.scss';
import PageWrapper from '../../components/PageWrapper';
import DiscountModal from '../../components/DiscountModal';
import DiscountList from '../../components/DiscountList';

function Favourites() {
  const dispatch = useDispatch();

  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
  const getDiscountsStatus = useSelector((state) => state.discountsReducer.getDiscountsStatus);
  const user = useSelector((state) => state.userReducer.user);
  const favourites = useSelector((state) => state.discountsReducer.favourites);
  const discountById = useSelector((state) => state.discountsReducer.discountById);
  const getDiscountByIdStatus = useSelector((state) => state.discountsReducer.getDiscountByIdStatus);

  useEffect(() => {
    dispatch(actions.discountsActions.getFavourites(user.id));
  }, [dispatch, user.id]);

  const onCardClick = useCallback((e, id) => {
    dispatch(actions.discountsActions.getDiscountById(id));
    setIsDiscountModalShown(true);
  }, [dispatch]);

  const onFavouriteClick = useCallback((e, id) => {
    e.stopPropagation();
    const params = {
      discountId: id,
      userId: user.id
    };
    const isLike = favourites.find((el) => el.id === id);
    if (isLike) {
      dispatch(actions.discountsActions.deleteDiscountsFromFavourites(params));
    } else {
      dispatch(actions.discountsActions.addDiscountsToFavourites(params));
    }
  }, [dispatch, favourites, user.id]);

  const onDiscountModalClose = () => {
    setIsDiscountModalShown(false);
  };

  const onDeleteDiscount = useCallback((id) => {
    dispatch(actions.discountsActions.clearDeleteDiscountStatus());
    dispatch(actions.discountsActions.deleteDiscount(id));
    onDiscountModalClose();
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
        <h2 className = {styles.title}>Favourite discounts</h2>
        <div className = {styles.discountsContainer}>
          {getDiscountsStatus.loading === true
            && <div className = {styles.loadingContainer}>
            <CircularProgress />
          </div>}
          {getDiscountsStatus.loading === false
            && <>
            <DiscountList
              discounts = {favourites}
              onCardClick = {onCardClick}
              favouriteDiscounts = {favourites}
              onFavouriteClick = {onFavouriteClick}
            />
            <DiscountModal
              key= {discountById?.id}
              discount = {discountById}
              isOpen = {isDiscountModalShown}
              onClose = {onDiscountModalClose}
              onDeleteDiscount = {onDeleteDiscount}
              favouriteDiscounts = {favourites}
              loadingStatus = {getDiscountByIdStatus.loading}
              modalContainerClasses = {styles.modalMinSize}
            />
            </>
          }
          </div>
        </div>
    </PageWrapper>
  );
}

export default Favourites;
