import Modal from '../../../../components/Modal';
import styles from './DiscountModal.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import getMonthAndDay from '../../../../utilities/getMonthAndDay';

// title, vendor, description long, location, from, to, persentage, count
function DiscountModal({
  discount, isAdmin = true, onClose, isOpen
}) {
  const onEditClick = () => {
    console.log('edit');
  };
  const onDeleteClick = () => {
    console.log('delete');
  };
  const onActivateClick = () => {
    console.log('activate');
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
      onActionClick = {onDeleteClick}
      name = "delete"
    />
  </div>;
  const adminBtns = isAdmin ? adminBtnsLayout : null;
  const content = discount ? <div className = {styles.modalContent}>
    <div className = {styles.modalHeader}>
      <div className = {styles.modalTitle}>{discount.title}</div>
      <div className = {styles.vendorName}>{discount.vendor.title}</div>
    </div>
    <div className = {styles.modalImg}><img src="https://picsum.photos/200/300"/></div>
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
    <Modal
      isOpen = {isOpen}
      onClose = {onClose}
      children = {content}
    />
  );
}

export default DiscountModal;
