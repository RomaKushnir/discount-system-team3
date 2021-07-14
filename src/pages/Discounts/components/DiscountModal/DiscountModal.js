import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import styles from './DiscountModal.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';
import CreateDiscount from '../CreateDiscount';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';
import isAdmin from '../../../../utilities/isAdmin';
import SelectField from '../../../../components/SelectField';
import DiscountTag from '../../../../components/DiscountTag';

function DiscountModal({
  discount, onClose, isOpen, onDeleteDiscount, favouriteDiscounts
}) {
  const [isLike, setIsLike] = useState(false);
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const onFavouriteClick = (e, id) => {
    e.stopPropagation();
    if (isLike) {
      favouriteDiscounts.filter((el) => el !== id);
      setIsLike(false);
    } else {
      favouriteDiscounts.push(id);
      setIsLike(true);
    }
  };

  // clean up edit modal state
  useEffect(() => () => {
    if (isEditDiscountOpen) setIsEditDiscountOpen(false);
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const deleteDiscountStatus = useSelector((state) => state.discountsReducer.deleteDiscountStatus);
  const locationsList = discount ? discount.locations.map((location) => {
    const option = {
      value: `${location.countryCode}, ${location.city}, ${location.addressLine}`,
      label: `${location.countryCode}, ${location.city}, ${location.addressLine}`
    };
    return option;
  }) : null;

  const onEditClick = () => {
    setIsEditDiscountOpen(true);
  };
  const onActivateClick = () => {
    console.log('activate');
  };
  const onDelete = useCallback(() => {
    setConfirmModalOpen(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setConfirmModalOpen(false);
  }, []);
  const onYesClick = () => {
    onDeleteDiscount(discount.id);
    setConfirmModalOpen(false);
  };
  const onLocationChange = () => {
    console.log('change location');
  };

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
  const adminBtns = isAdmin(user) ? adminBtnsLayout : null;
  const content = discount ? <div className = {styles.modalContent}>
    <div className = {`${styles.row} ${styles.info}`}>
      <div className = {styles.modalCategory}>
        <CategoryRoundedIcon/><p>{discount.category.title}</p>
      </div>
      <div className = {styles.vendor}>
        <StorefrontRoundedIcon/><p>{discount.vendor.title}</p>
      </div>
    </div>
    <div className = {styles.modalImg}><img src={discount.imageUrl}/></div>
    <div className = {styles.modalHeader}>
      <div className = {styles.modalTitle}>{discount.title}</div>
      <div className = {styles.like} onClick = {(e) => onFavouriteClick(e, discount.id)}>
        {isLike ? <FavoriteRoundedIcon color = "error" /> : <FavoriteBorderRoundedIcon />}
      </div>
    </div>
    <div className = {styles.modalDescr}>{discount.description}</div>
    <div className = {styles.row}>
      <div className = {styles.modalLocation}>
        <SelectField
          initialValue = "Location"
          options = {locationsList}
          label = "Location"
          onChange = {onLocationChange}
          isClearable = {false}
          value = {locationsList[0]}
        />
      </div>
      <div className = {styles.dates}>
        <div className = {styles.startDate}>From:
          <span className = {styles.dateValue}> {getMonthAndDay(discount.startDate)}</span>
        </div>
        <div className = {styles.expDate}>To:
          <span className = {styles.dateValue}> {getMonthAndDay(discount.expirationDate)}</span>
        </div>
      </div>
    </div>
    <div className = {`${styles.row} ${styles.tag}`}>
      <DiscountTag
        percentage = {discount.percentage}
        flatAmount = {discount.flatAmount}
      />
    </div>
    {/* <div className = {styles.row}>
      <div className = {styles.count}>Available {discount.quantity} promotional codes</div>
    </div> */}
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
      children = {!isEditDiscountOpen
        ? content
        : <CreateDiscount discount={discount} onModalClose={onClose}/>}
    >
    </Modal>
    <Modal isOpen={confirmModalOpen} onClose={onCloseModal}>
        <DeleteConfirmation
          onYesClick = {onYesClick}
          status = {deleteDiscountStatus}
          itemTitle = "discount"
          onNoClick = {() => setConfirmModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default DiscountModal;
