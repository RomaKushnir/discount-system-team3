import React from 'react';
import styles from './CategoryTag.module.scss';

function CategoryTag({ tag }) {
  return (
        <div className={styles.blockTags}>
        {
              <p className={styles.tag}>{tag}</p>
        }
        </div>
  );
}

export default CategoryTag;
