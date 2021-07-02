import React from 'react';
import styles from './CategoryTag.module.scss';

function CategoryTag({ categ }) {
  return (
        <div className={styles.blockTags}>
        {
              categ.tags.map(
                (tag) => <p className={styles.tag}>{tag}</p>
              )
        }
        </div>
  );
}

export default CategoryTag;
