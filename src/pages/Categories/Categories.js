import React, { useState, useCallback } from 'react';
import styles from './Categories.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import AddCategoryModal from './components/AddCategory';
import AddNewItemButton from '../../components/AddNewItemButton';

function Categories() {
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(null); // temporary while we don't have categories list

  const onModalOpen = useCallback((e, id) => {
    setIsOpen(true);

    console.log(id);

    if (e.target.name === 'edit') {
      // const selectedCategory = categories.find((el) => el.id === id);

      // setCategory(selectedCategory);

      setCategory({
        imageUrl: 'https://picsum.photos/200?random=8',
        title: 'Food',
        id: 5
      }); // temporary while we don't have list of categories
    } else {
      setCategory({
        imageUrl: '',
        title: '',
        id: ''
      });
    }
  // }, [dispatch, categories]);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>
        <AddNewItemButton
          btnTitle="Add new category"
          onAddNewItem={onModalOpen}
          name = "add"
        />
        <Modal isOpen={isOpen} onClose={closeModal}>
          <AddCategoryModal
            onSave={closeModal}
            selectedCategory = {category}
          />
      </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default Categories;
