import styles from './ItemActionButton.module.scss';

function ItemActionButton({
  title,
  type = 'normal',
  isDisabled = false,
  className = '',
  onActionClick
}) {
  return (
    <button
      type="button"
      className={`${styles['action-btn']} ${styles[type]} ${className}`}
      disabled={isDisabled}
      onClick={onActionClick}
    >
      {title}
    </button>
  );
}

export default ItemActionButton;
