import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Categories.module.scss';
import * as actions from '../../store/actions';
import PageWrapper from '../../components/PageWrapper';
import Modal from '../../components/Modal';
import AddCategoryModal from './components/AddCategory';
import AddNewItemButton from '../../components/AddNewItemButton';
import CategoriesList from './components/CategoriesList';
import Vocabulary from '../../translations/vocabulary';

function Categories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addCategory, setCategory] = useState(null); // temporary while we don't have categories list
  const categories = useSelector((state) => state.categoryReducer.categories);
  const createCategoryModalStatus = useSelector((state) => state.categoryReducer.createCategoryModalStatus);
  useEffect(() => {
    dispatch(actions.categoryActions.getCategories());
  }, [dispatch]);
  const onDelete = useCallback((id) => {
    dispatch(actions.categoryActions.clearDeleteCategoryStatus());
    dispatch(actions.categoryActions.deleteCategory(id));
  }, [dispatch]);
  const onModalOpen = useCallback((e, id) => {
    dispatch(actions.categoryActions.clearAddCategoryStatus());
    dispatch(actions.categoryActions.clearAddTagsToCategoryStatus());
    dispatch(actions.categoryActions.clearDeleteTagsFromCategoryStatus());
    dispatch(actions.categoryActions.createCategoryModalStatus(true));

    if (e.target.name === 'edit') {
      const selectedCategory = categories.find((el) => el.id === id);
      setCategory(selectedCategory);
    } else {
      setCategory({
        title: '',
        id: ''
      });
    }
  }, [categories, dispatch]);

  const closeModal = useCallback(() => {
    dispatch(actions.categoryActions.createCategoryModalStatus(false));
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
      <div className={styles.row}>
        <AddNewItemButton
          btnTitle={t(Vocabulary.ADD_NEW_CATEGORY)}
          onAddNewItem={onModalOpen}
          name = "add"
        />
      </div>
        <div className={styles.row}>
          <CategoriesList categories={categories} onDelete = {onDelete} onEdit={onModalOpen}/>
        </div>
        <Modal isOpen={createCategoryModalStatus} onClose={closeModal}>
          <AddCategoryModal
            // onSave={closeModal}
            selectedCategory = {addCategory}
          />
      </Modal>
      </div>
      </PageWrapper>
  );
}

export default Categories;
