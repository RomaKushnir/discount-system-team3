import { React } from 'react';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import styles from './CategoryList.module.scss';
import CategoryItem from '../CategoryItem';
import CategoryTag from '../CategoryTags';

function CategoryList({
  categories, arrTags, onDelete, onEdit
}) {
  return (
        <div>
      {categories.length
        ? categories.map(
          (category) => <Accordion>
          <AccordionSummary>
          <CategoryItem category={category} key={category.id} onDelete = {onDelete} onEdit={onEdit}/>
          </AccordionSummary>
          <AccordionDetails>
          {arrTags.length
            ? arrTags.filter(
              (e) => e.id === category.id
            ).map(
              (categ) => <CategoryTag categ={categ} />
            )
            : <p>There are no categories yet!</p>
          }
          </AccordionDetails>
          </Accordion>
        )
        : <p className={styles.noContentPlaceholder}>There are no categories yet!</p>
      }
    </div>
  );
}

/*
{categories.length
        ? categories.map(
          (category) => <Accordion>
          <AccordionSummary>
          <CategoryItem category={category} key={category.id}/>
          </AccordionSummary>
          <AccordionDetails>
          {arrTags.map(
            (categ) => <p>{categ.tags}</p>
          )}
          </AccordionDetails>
          </Accordion>
        )
        : <p className={styles.noContentPlaceholder}>There are no categories yet!</p>
      }
 */

export default CategoryList;
