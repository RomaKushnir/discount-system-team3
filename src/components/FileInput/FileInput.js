import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FileInput.module.scss';
import ItemActionButton from '../ItemActionButton';
import Vocabulary from '../../translations/vocabulary';

function FileInput({
  name,
  fileChangeHandler,
  image,
  className,
  error
}) {
  const { t } = useTranslation();
  const fileInput = useRef('');
  const imageUrl = !image || typeof image === 'string' ? image : URL.createObjectURL(image);

  const onFileChange = (file) => {
    fileChangeHandler(file);
  };

  return (
    <>
      <div className={`${styles.imageBlock} ${className}`}>
        {!!image && <div className={styles.imagePreviewWrap}>
          <img src={imageUrl} />
        </div>}
        <div className={styles.imageInputWrap}>
          {!!image && <ItemActionButton
            title={t(Vocabulary.CLEAR)}
            onActionClick={() => onFileChange(null)}
            className={styles.clearBtn}
          />}
          {!image && <label htmlFor="image">
            {t(Vocabulary.UPLOAD_IMAGE)}
          </label>}
          <input
            ref={fileInput}
            onChange={() => onFileChange(fileInput.current.files[0])}
            type="file"
            name={name}
            id="image"
            accept="image/*"
            hidden
          />
      </div>
    </div>
    <div className = {styles.error}>{error}</div>
  </>
  );
}

export default FileInput;
