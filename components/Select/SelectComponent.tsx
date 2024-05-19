'use client';

import React from 'react';
import Select from 'react-select';

const SelectComponent = ({ options, value, onChange, isMulti, className }) => {
  const handleChange = (selectedOption) => {
    const newValue = isMulti
      ? selectedOption.map(option => option.value)
      : selectedOption.value;
    onChange(newValue);
  };

  // Convert enum to options array
  const selectOptions = Object.keys(options).map(key => ({
    value: key, // Use the enum key as the value
    label: options[key]
  }));

  return (
    <Select
      value={isMulti
        ? selectOptions.filter(option => value.includes(option.value))
        : selectOptions.find(option => option.value === value)}
      onChange={handleChange}
      options={selectOptions}
      isMulti={isMulti}
      className={className}
    />
  );
};

export default SelectComponent;
