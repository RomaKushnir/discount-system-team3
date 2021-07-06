import React from 'react';
import styles from './CategoryTag.module.scss';

function CategoryTagsList({ tag }) {
  return (
        <div className={styles.blockTags}>
        {
              <p className={styles.tag}>{tag}</p>
        }
        </div>
  );
}

export default CategoryTagsList;
