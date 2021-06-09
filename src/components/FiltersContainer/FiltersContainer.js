import React from 'react';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';

const options = [
  { id: 1, value: 'one', label: 'One' },
  { id: 2, value: 'two', label: 'Two' },
  { id: 3, value: 'three', label: 'Threeeeeeeeeeeeeeeeeeeee' }
];

const initialValue = options[2];

function FiltersContainer() {
  const onChange = (selectedOption) => {
    console.log(selectedOption);
  };

  return (
    <div className = {styles.container}>
      <Button />
      <SelectField
        initialValue = {initialValue}
        options = {options}
        label = 'Count'
        onChange = {onChange}
      />
    </div>
  );
}

export default FiltersContainer;
