import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from '../../../../components/Modal';
import styles from './DiscountModal.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';
import CreateDiscount from '../CreateDiscount';
import GoogleMap from '../../../../components/GoogleMap';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';
import isAdmin from '../../../../utilities/isAdmin';
import SelectField from '../../../../components/SelectField';
import DiscountTag from '../../../../components/DiscountTag';
import Vocabulary from '../../../../translations/vocabulary';
import * as actions from '../../../../store/actions';

function DiscountModal({
  discount, onClose, isOpen, onDeleteDiscount, favouriteDiscounts, loadingStatus, modalContainerClasses = ''
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(5);
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
  const userDiscounts = useSelector((state) => state.discountsReducer.discountsByUser);
  const locationsList = discount ? discount.locations.map((location) => {
    const option = {
      value: { lat: location.latitude, lng: location.longitude },
      label: `${location.countryCode}, ${location.city}, ${location.addressLine}`
    };
    return option;
  }) : null;

  const [isActivateDisabled, setIsActivateDisabled] = useState(!!userDiscounts?.find((el) => el.id === discount?.id));

  const onEditClick = useCallback(() => {
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    setIsEditDiscountOpen(true);
  }, [dispatch]);

  const onEditModalClose = () => {
    setIsEditDiscountOpen(false);
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
  };
  const onActivateClick = () => {
    dispatch(actions.discountsActions.activateDiscount({ discountId: discount.id, userId: user.id }));
    setIsActivateDisabled(true);
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
  const onLocationChange = (selected) => {
    setSelectedMapLocation(selected);
    setMapZoom(10);
  };

  const tagsList = discount?.tags.map((item) => (<li key={item.id}>#{item.name}&nbsp;</li>));

  const adminBtnsLayout = <div className = {styles.adminBtns}>
    <ItemActionButton
      title = {t(Vocabulary.EDIT)}
      type = "edit"
      onActionClick = {onEditClick}
      name = "edit"
    />
    <ItemActionButton
      title = {t(Vocabulary.DELETE)}
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
    {isOpen && <div className={styles.mapContainer}>
      <GoogleMap
        locations={discount.locations}
        onLocationChange={onLocationChange}
        selectedLocation={selectedMapLocation ? selectedMapLocation.value : locationsList[0]}
        zoom={mapZoom}
      />
    </div>}
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
          initialValue = {locationsList[0]}
          options = {locationsList}
          label = {t(Vocabulary.LOCATION)}
          onChange = {onLocationChange}
          isClearable = {false}
          value = {selectedMapLocation}
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
    <div className = {styles.row}>
      <ul className = {styles.tags}>
        {tagsList}
      </ul>
    </div>
    <div className = {styles.row}>
      {adminBtns}
      <ItemActionButton
          title = {t(Vocabulary.ACTIVATE)}
          onActionClick = {onActivateClick}
          name = "activate"
          isDisabled = {isActivateDisabled}
          type = {isActivateDisabled ? 'disabled' : 'normal'}
        />
    </div>
  </div> : null;
  return (
    <>
    <Modal
      isOpen = {isOpen}
      loadingStatus = {loadingStatus}
      onClose = {onClose}
      children = {!isEditDiscountOpen
        ? content
        : <CreateDiscount
        discount={discount}
        onModalClose={onEditModalClose}
        /> }
        modalContainerClasses = {modalContainerClasses}
    >
    </Modal>
    <Modal isOpen={confirmModalOpen} onClose={onCloseModal}>
        <DeleteConfirmation
          onYesClick = {onYesClick}
          status = {deleteDiscountStatus}
          itemTitle = {t(Vocabulary.DELETE_DISCOUNT)}
          onNoClick = {() => setConfirmModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default DiscountModal;
