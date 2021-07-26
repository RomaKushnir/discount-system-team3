import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import {
  useCallback, useState, useEffect, useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import styles from './DiscountModal.module.scss';
import ItemActionButton from '../ItemActionButton';
import getMonthAndDay from '../../utilities/getMonthAndDay';
import CreateDiscount from '../../pages/Discounts/components/CreateDiscount';
import GoogleMap from '../GoogleMap';
import DeleteConfirmation from '../DeleteConfirmation';
import isAdmin from '../../utilities/isAdmin';
import SelectField from '../SelectField';
import DiscountTag from '../DiscountTag';
import Vocabulary from '../../translations/vocabulary';
import * as actions from '../../store/actions';

function DiscountModal({
  discount, onClose, isOpen, onDeleteDiscount, loadingStatus, modalContainerClasses = '', doNotShowAdminButtons
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allLocationsOption = useMemo(() => ({
    value: null, label: t(Vocabulary.ALL_LOCATIONS)
  }), [t]);

  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [selectedMapLocation, setSelectedMapLocation] = useState(allLocationsOption);
  const [mapZoom, setMapZoom] = useState(null);
  const user = useSelector((state) => state.userReducer.user);
  const favourites = useSelector((state) => state.discountsReducer.favourites);
  const [isLike, setIsLike] = useState(null);

  const onFavouriteClick = useCallback((e, id) => {
    e.stopPropagation();
    const params = {
      discountId: id,
      userId: user.id
    };
    if (isLike) {
      dispatch(actions.discountsActions.deleteDiscountsFromFavourites(params));
    } else {
      dispatch(actions.discountsActions.addDiscountsToFavourites(params));
    }
    setIsLike(!isLike);
  }, [dispatch, user, isLike]);

  // clean up edit modal state
  useEffect(() => () => {
    if (isEditDiscountOpen) setIsEditDiscountOpen(false);
  });

  useEffect(() => {
    if (discount) setIsLike(Boolean(favourites.find((el) => el.id === discount.id)));
  }, [discount, favourites]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const deleteDiscountStatus = useSelector((state) => state.discountsReducer.deleteDiscountStatus);
  const userDiscounts = useSelector((state) => state.discountsReducer.discountsByUser);
  const locationsList = useMemo(() => {
    if (discount) {
      const mappedLocations = discount.locations.map((location) => ({
        value: { lat: location.latitude, lng: location.longitude },
        label: `${location.countryCode}, ${location.city}, ${location.addressLine}`
      }));
      mappedLocations.unshift(allLocationsOption);
      return mappedLocations;
    }
    return null;
  }, [discount, allLocationsOption]);

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
    if (selected.value !== null) setMapZoom(13);
    else setMapZoom(null);
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
  const adminBtns = isAdmin(user) && !doNotShowAdminButtons ? adminBtnsLayout : null;

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
        selectedLocation={selectedMapLocation.value}
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
    <div className = {`${styles.row} ${styles.flexWrap}`}>
      <div className = {styles.modalLocation}>
        <SelectField
          initialValue = {locationsList[0].value}
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
