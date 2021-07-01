import { React } from 'react';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import styles from './CategoryList.module.scss';
import CategoryItem from '../CategoryItem';
// import categoriesList from '../../../../mockData/categoriesList';

function CategoryList({ categories, arrTags }) {
  return (
        <div>
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
    </div>
  );
}

export default CategoryList;
