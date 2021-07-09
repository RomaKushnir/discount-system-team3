import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './DeleteConfirmation.module.scss';
import ItemActionButton from '../ItemActionButton';

function DeleteConfirmation({
  onYesClick, onNoClick, status, itemTitle
}) {
  return (
    <div className = {styles.container}>
      <div className = {styles.question}>Are you sure you want to delete this {itemTitle}?</div>
      {status.loading === false && status.error
        && <div className = {styles.errorMessage}>
          {status.error.message}
      </div>
      }
      <div className = {styles.buttonsContainer}>
        <ItemActionButton
          title = "Yes"
          onActionClick = {onYesClick}
          type = "delete"
          className={styles.deleteBtn}
          name = "delete"
        />
        <ItemActionButton
          title = "No"
          onActionClick = {onNoClick}
          type = "normal"
          className={styles.normalBtn}
          name = "doNotDelete"
        />
      </div>
      {status.loading === true
        && <div className = {styles.loadingContainer}>
          <CircularProgress />
      </div>}
    </div>
  );
}

export default DeleteConfirmation;
