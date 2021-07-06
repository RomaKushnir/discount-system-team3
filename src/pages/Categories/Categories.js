import React, {
  useState,
  useCallback,
  useEffect,
  Fragment
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Categories.module.scss';
import * as actions from '../../store/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import AddCategoryModal from './components/AddCategory';
import AddNewItemButton from '../../components/AddNewItemButton';
import CategoriesList from './components/CategoriesList';
// import categoriesList from '../../mockData/categoriesList';

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [addCategory, setCategory] = useState(null); // temporary while we don't have categories list
  const categories = useSelector((state) => state.categoryReducer.categories);
  // const categories = useSelector(getCategoriesList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.categoryActions.getCategories());
  }, [dispatch]);
  const onDelete = useCallback((id) => {
    dispatch(actions.categoryActions.clearDeleteCategoryStatus());
    dispatch(actions.categoryActions.deleteCategory(id));
  }, [dispatch]);
  const onModalOpen = useCallback((e, id) => {
    setIsOpen(true);

    if (e.target.name === 'edit') {
      const selectedCategory = categories.find((el) => el.id === id);

      setCategory(selectedCategory);

      // setCategory({
      //   imageUrl: 'https://picsum.photos/200?random=8',
      //   title: 'Food',
      //   id: 5
      // }); // temporary while we don't have list of categories
    } else {
      setCategory({
        imageUrl: '',
        title: '',
        id: ''
      });
    }
  }, [categories]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>
      <div className={styles.row}>
        <AddNewItemButton
          btnTitle="Add new category"
          onAddNewItem={onModalOpen}
          name = "add"
        />
      </div>
        <div className={styles.row}>
        { categories.length
          ? <Fragment>
          <CategoriesList categories={categories} onDelete = {onDelete} onEdit={onModalOpen}/>
          </Fragment>
          : <p>Categories is not defined</p>
        }
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <AddCategoryModal
            onSave={closeModal}
            selectedCategory = {addCategory}
          />
      </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default Categories;
