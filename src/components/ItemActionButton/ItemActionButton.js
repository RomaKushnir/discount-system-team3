import styles from './ItemActionButton.module.scss';

function ItemActionButton({
  title,
  type = 'normal',
  isDisabled = false,
  className = '',
  onActionClick,
  name
}) {
  return (
    <button
      type="button"
      className={`${styles.actionBtn} ${styles[type]} ${className}`}
      disabled={isDisabled}
      onClick={onActionClick}
      name = {name}
    >
      {title}
    </button>
  );
}

export default ItemActionButton;
