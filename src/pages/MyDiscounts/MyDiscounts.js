import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import styles from './MyDiscounts.module.scss';
import PageWrapper from '../../components/PageWrapper';
import * as actions from '../../store/actions';
import DiscountRowsBlock from './components/DiscountRowsBlock';
import QRCodeModal from './components/QRCodeModal/QRCodeModal';

function MyDiscounts() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.user);
  const qrCode = useSelector((state) => state.userReducer.qrCode);
  const getQRCodeStatus = useSelector((state) => state.userReducer.getQRCodeStatus);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountsByUser(currentUser.id));
  }, [currentUser, dispatch]);

  const discounts = useSelector((state) => state.discountsReducer.discountsByUser);
  const activeDiscounts = discounts.filter((discount) => new Date(discount.expirationDate) >= new Date());
  const historyDiscounts = discounts.filter((discount) => new Date(discount.expirationDate) < new Date());

  const onQRCodeClick = useCallback((id) => {
    dispatch(actions.userActions.getQRCode({
      discountId: id,
      userId: currentUser.id
    }));
    setIsQrModalOpen(true);
  }, [dispatch, currentUser.id]);

  const onQrModalClose = useCallback(() => {
    setIsQrModalOpen(false);
  }, []);

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
        <h2 className = {styles.title}>Active</h2>
          <DiscountRowsBlock
            discounts = {activeDiscounts}
            onQRCodeClick = {onQRCodeClick}
          />
        <h2 className = {styles.title}>History</h2>
        <DiscountRowsBlock
          discounts = {historyDiscounts}
          onQRCodeClick = {onQRCodeClick}
        />
        <QRCodeModal
          qrcode = {qrCode}
          isOpen = {isQrModalOpen}
          onClose = {onQrModalClose}
          loadingStatus = {getQRCodeStatus?.loading}
          modalContainerClasses = {styles.qrModal}
        />
      </div>
    </PageWrapper>
  );
}

export default MyDiscounts;
