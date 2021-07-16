import styles from './QRCodeModal.module.scss';
import Modal from '../../../../components/Modal';

function QRCodeModal({
  qrcode, onClose, isOpen, loadingStatus, modalContainerClasses
}) {
  const content = <div className = {styles.content}>
    <img src = {qrcode} alt = "qrcode"/>
  </div>;

  return (
    <Modal
      isOpen = {isOpen}
      onClose = {onClose}
      children = {content}
      loadingStatus = {loadingStatus}
      modalContainerClasses = {modalContainerClasses}
    />
  );
}

export default QRCodeModal;
