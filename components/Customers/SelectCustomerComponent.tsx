'use client';
import React from 'react';
import Select from 'react-select';

const CustomerSelectComponent = ({ options, value, onChange, isMulti, className }) => {
  const handleChange = (selectedOption) => {
    const newValue = isMulti
      ? selectedOption.map(option => option.id)
      : selectedOption.id;
    onChange(newValue);
  };



  // Convert JSON object to options array
  const selectOptions = options?.content?.map(person => ({
    id: person.id,
    label: person.fullName,
    value: person.id
  }));

  return (
    <Select
      value={isMulti
        ? selectOptions?.filter(option => value.includes(option.id))
        : selectOptions?.find(option => option.id === value)}
      onChange={handleChange}
      options={selectOptions}
      isMulti={isMulti}
      className={className}
    />
  );
};

export default CustomerSelectComponent;
