import styles from './Pagination.module.scss';
import OutlineButton from '../OutlineButton';

function Pagination({
  btnTitle,
  onShowMoreClick
}) {
  return (
    <div className={styles.paginationWrapper}>
      <OutlineButton
        btnText={btnTitle}
        onClick={onShowMoreClick}
        />
    </div>
  );
}

export default Pagination;
