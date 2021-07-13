import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DiscountsList.module.scss';
import DiscountCard from '../../../../components/discountCard/DiscountCard';
import Pagination from '../../../../components/Pagination';
import * as actions from '../../../../store/actions';
import DiscountModal from '../../../Discounts/components/DiscountModal';

const DiscountsList = ({ discountsList, vendorId, activeButton }) => {
  const dispatch = useDispatch();
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  // mock data for favourite discounts
  const favourite = [];

  const vendorDiscountsParams = useSelector((state) => state.discountsReducer.vendorDiscountsParams);

  const onShowMoreClick = () => {
    if (vendorDiscountsParams.pageNumber < vendorDiscountsParams.totalPages) {
      dispatch(actions.discountsActions.getVendorDiscounts({
        vendorId,
        pageNumber: vendorDiscountsParams.pageNumber += 1,
        size: 6,
        showMore: true,
        active: activeButton
      }));
    }
  };

  const onCardClick = useCallback((id) => {
    setIsDiscountModalShown(true);
    const discount = discountsList.find((el) => el.id === id);
    setSelectedDiscount(discount);
  }, [discountsList]);

  const onDiscountModalClose = () => {
    setIsDiscountModalShown(false);
  };

  return (
    <>
    <div className={styles.row}>
      {discountsList && discountsList.map(
        (discount) => <div onClick = {() => onCardClick(discount.id)} key = {discount.id}>
          <DiscountCard discount = {discount}/>
      </div>
      )}
    </div>
    <DiscountModal
      discount = {selectedDiscount}
      isOpen = {isDiscountModalShown}
      onClose = {onDiscountModalClose}
      favouriteDiscounts = {favourite}
    />
    <div className={styles.blockButtonCenter}>
      {vendorDiscountsParams.pageNumber + 1 < vendorDiscountsParams.totalPages
      && <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />}</div>
    </>
  );
};

export default DiscountsList;
