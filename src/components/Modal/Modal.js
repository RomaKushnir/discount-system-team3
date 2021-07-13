import ReactDOM from 'react-dom';
import { Close } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Modal.module.scss';

function Modal({
  isOpen,
  loadingStatus = false,
  onClose,
  isOverlayTransparent = false,
  children
}) {
  const onContentClick = (e) => {
    e.stopPropagation();
  };

  const showModal = isOpen ? 'showModal' : '';

  if (!isOpen) return null;
  return ReactDOM.createPortal(
     <div
      className={`${styles.overlay} ${isOverlayTransparent ? styles.transparent : ''} ${styles[showModal]}`}
      onClick = {onClose}
     >
       <div className = {styles.contentContainer} onClick = {onContentClick}>
         <div className = {styles.closeButtonContainer}>
          <Close
            className = {styles.closeButton}
            onClick={onClose}
          />
         </div>
         {loadingStatus === true
          && <div className = {styles.loadingContainer}>
              <CircularProgress />
            </div>}
          {loadingStatus === false
          && <div className = {styles.content}>{children}</div>}
       </div>
     </div>, document.getElementById('modal-root')
  );
}

export default Modal;
