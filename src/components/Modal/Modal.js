import React from 'react';
import ReactDOM from 'react-dom';
import { Close } from '@material-ui/icons';
import styles from './Modal.module.scss';

function Modal({ isOpen, onClose, children }) {
  const onContentClick = (e) => {
    e.stopPropagation();
  };

  const showModal = isOpen ? 'showModal' : '';

  if (!isOpen) return null;
  return ReactDOM.createPortal(
     <div className={`${styles.overlay} ${styles[showModal]}`} onClick = {onClose}>
       <div className = {styles.contentContainer} onClick = {onContentClick}>
         <div className = {styles.closeButtonContainer}>
          <Close
            className = {styles.closeButton}
            onClick={onClose}
          />
         </div>
        <div className = {styles.content}>{children}</div>
       </div>
     </div>, document.getElementById('modal-root')
  );
}

export default Modal;
