import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './DeleteConfirmation.module.scss';
import Button from '../Button';

function DeleteConfirmation({ onYesClick, status, itemTitle }) {
  return (
    <div className = {styles.container}>
      <div className = {styles.question}>Are you sure you want to delete this {itemTitle}?</div>
      {status.loading === false && status.error
        && <div className = {styles.errorMessage}>
          {status.error.message}
      </div>
      }
        <Button
          btnText = "Yes"
          onClick = {onYesClick}
          type = "submit"
        />
      {status.loading === true
        && <div className = {styles.loadingContainer}>
          <CircularProgress />
      </div>}
    </div>
  );
}

export default DeleteConfirmation;
