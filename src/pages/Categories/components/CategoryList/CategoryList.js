import React from 'react';
import styles from './CategoryList.module.scss';
import CategoryItem from '../CategoryItem';

function CategoryList({ categories }) {
  return (
        <div>
      {categories.length
        ? categories.map(
          (category) => <CategoryItem category={category} key={category.id}/>
        )
        : <p className={styles.noContentPlaceholder}>There are no categories yet!</p>
      }
    </div>
  );
}

export default CategoryList;
