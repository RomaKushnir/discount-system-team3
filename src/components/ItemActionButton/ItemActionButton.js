import styles from './ItemActionButton.module.scss';

function ItemActionButton({
  title,
  className = 'edit',
  isDisabled = false,
  onActionClick
}) {
  return (
    <button
      type="button"
      className={`${styles['action-btn']} ${styles[className]}`}
      disabled={isDisabled}
      onClick={onActionClick}
    >
      {title}
    </button>
  );
}

export default ItemActionButton;
