import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import styles from './DeleteConfirmation.module.scss';
import ItemActionButton from '../ItemActionButton';
import Vocabulary from '../../translations/vocabulary';

function DeleteConfirmation({
  onYesClick, onNoClick, status, itemTitle
}) {
  const { t } = useTranslation();
  return (
    <div className = {styles.container}>
      <div className = {styles.question}>{`${t(Vocabulary.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS)} ${itemTitle}?`}</div>
      {status.loading === false && status.error
        && <div className = {styles.errorMessage}>
          {status.error.message}
      </div>
      }
      <div className = {styles.buttonsContainer}>
        <ItemActionButton
          title = {t(Vocabulary.YES)}
          onActionClick = {onYesClick}
          type = "delete"
          className={styles.deleteBtn}
          name = "delete"
        />
        <ItemActionButton
          title = {t(Vocabulary.NO)}
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
