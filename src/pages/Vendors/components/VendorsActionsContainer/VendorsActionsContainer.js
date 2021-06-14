import styles from './VendorsActionsContainer.module.scss';
import AddNewItemButton from '../../../../components/AddNewItemButton';
import SelectField from '../../../../components/SelectField';
import sortList from '../../../../mockData/sortList';// mock data to render select list

function VendorsActionsContainer({
  addNewItem,
  onSortFilter
}) {
  return (
    <div className={styles['vendors-actions-block']}>
      <AddNewItemButton
        btnTitle="Add new vendor"
        onAddNewItem={addNewItem}
      />
      <SelectField
        initialValue={[sortList[0]]}
        options={sortList}
        onChange={onSortFilter}
        />
    </div>
  );
}

export default VendorsActionsContainer;
