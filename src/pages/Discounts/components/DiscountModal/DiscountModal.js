<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
>>>>>>> a98147f (feat: implement delete discount redux flow)
import Modal from '../../../../components/Modal';
import styles from './DiscountModal.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';
<<<<<<< HEAD
import CreateDiscount from '../CreateDiscount';
=======
import DeleteConfirmation from '../../../../components/DeleteConfirmation';
>>>>>>> a98147f (feat: implement delete discount redux flow)

// title, vendor, description long, location, from, to, persentage, count
function DiscountModal({
  discount, isAdmin = true, onClose, isOpen, onDeleteDiscount
}) {
<<<<<<< HEAD
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);

  // clean up edit modal state
  useEffect(() => () => {
    if (isEditDiscountOpen) setIsEditDiscountOpen(false);
  });

=======
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const deleteDiscountStatus = useSelector((state) => state.discountsReducer.deleteDiscountStatus);
>>>>>>> a98147f (feat: implement delete discount redux flow)
  const onEditClick = () => {
    setIsEditDiscountOpen(true);
  };
  const onActivateClick = () => {
    console.log('activate');
  };
  const onDelete = useCallback(() => {
    setConfirmModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setConfirmModalOpen(false);
  }, []);

  const adminBtnsLayout = <div className = {styles.adminBtns}>
    <ItemActionButton
      title = "Edit"
      type = "edit"
      onActionClick = {onEditClick}
      name = "edit"
    />
    <ItemActionButton
      title = "Delete"
      type = "delete"
      onActionClick = {onDelete}
      name = "delete"
    />
  </div>;
  const adminBtns = isAdmin ? adminBtnsLayout : null;
  const content = discount ? <div className = {styles.modalContent}>
    <div className = {styles.modalHeader}>
      <div className = {styles.modalTitle}>{discount.title}</div>
      <div className = {styles.vendorName}>{discount.vendor.title}</div>
    </div>
    <div className = {styles.modalImg}><img src={discount.imageUrl}/></div>
    <div className = {styles.modalDescr}>{discount.description}</div>
    <div className = {styles.row}>
      <div className = {styles.modalLocation}></div>
      <div className = {styles.dates}>
        <div className = {styles.startDate}>From: {getMonthAndDay(discount.startDate)}</div>
        <div className = {styles.expDate}>To: {getMonthAndDay(discount.expirationDate)}</div>
      </div>
    </div>
    <div className = {styles.row}>
      <div className = {styles.discountWrapper}>
        Discount <div className={styles.discount}>{discount.percentage}%</div>
      </div>
    </div>
    <div className = {styles.row}>
      <div className = {styles.count}>Available {discount.quantity} promotional codes</div>
    </div>
    <div className = {styles.row}>
      {adminBtns}
      <ItemActionButton
          title = "Activate"
          onActionClick = {onActivateClick}
          name = "activate"
        />
    </div>
  </div> : null;
  return (
    <>
    <Modal
      isOpen = {isOpen}
      onClose = {onClose}
<<<<<<< HEAD
      children = {!isEditDiscountOpen
        ? content
        : <CreateDiscount discount={discount} onModalClose={onClose}/>}
    >
    </Modal>
=======
      children = {content}
    />
    <Modal isOpen={confirmModalOpen} onClose={closeModal}>
        <DeleteConfirmation
          onYesClick ={() => onDeleteDiscount(discount.id)}
          status = {deleteDiscountStatus}
          itemTitle = "discount"
        />
      </Modal>
    </>
>>>>>>> a98147f (feat: implement delete discount redux flow)
  );
}

export default DiscountModal;
