import { React } from 'react';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import styles from './CategoryList.module.scss';
import CategoryItem from '../CategoryItem';
import CategoryTag from '../CategoryTag';

function CategoriesList({
  categories, onDelete, onEdit
}) {
  return (
        <div className={styles.categoriesList}>
      {categories.length
        ? categories.map(
          (category) => <Accordion key={category.id}>
            <AccordionSummary>
              <CategoryItem category={category} onDelete = {onDelete} onEdit={onEdit}/>
            </AccordionSummary>
              <AccordionDetails>
                <div className={styles.accordionDetails}>
                  {category.tags.length
                    ? category.tags.map(
                      (tag) => <CategoryTag key={tag.id} tag={tag.name} />
                    )
                    : <p>There are no tags yet!</p>
                  }
                </div>
              </AccordionDetails>
          </Accordion>
        )
        : <p className={styles.noContentPlaceholder}>There are no categories yet!</p>
      }
    </div>
  );
}

export default CategoriesList;
